---
pt-BR:
  layout: post
  date: 2026-07-05 10:00:00
  image: /assets/img/testcontainers-rust-container-zumbi-vazamento/cover.png
  main-class: dev
  color: "#637a91"
  tags:
    - rust
    - testing
    - testcontainers
    - postgresql
    - docker
  categories:
    - dev
  title: "O Container Zumbi: o Testcontainers Singleton em Rust Vaza (e Ninguém te Avisa)"
  description: "Um container Postgres singleton acelera testes de integração em Rust, mas sem ryuk e com statics que nunca são dropados ele vaza para sempre. O problema, a causa raiz e o fix com a crate dtor."
  body: |
    No [artigo anterior](/pt-BR/posts/testes-integracao-rust-testcontainers), mostrei como escrever testes de integração em Rust usando Testcontainers contra Postgres e Redis reais. Funciona bem, mas tem um detalhe que só apareceu quando levei o padrão "container singleton" para produção: se você não tomar cuidado, cada `cargo test` deixa um container Postgres zumbi rodando na sua máquina, para sempre.

    Não é um bug raro. É uma consequência direta de como `static` funciona em Rust, combinada com o fato de que `testcontainers-rs` — ao contrário das versões Java e Go — não tem um reaper estilo ryuk. Vale entender por quê antes de copiar o padrão de singleton do artigo anterior para o seu projeto.

    ## O padrão que parecia certo

    A ideia é simples: em vez de subir um container novo a cada teste, sobe um container Postgres uma vez por binário de teste e reaproveita para todos, criando um banco de dados isolado por teste dentro dele.

    ```rust
    static CONTAINER: OnceCell<(ContainerAsync<Postgres>, u16)> = OnceCell::const_new();

    async fn container_port() -> u16 {
        let (_container, port) = CONTAINER
            .get_or_init(|| async {
                let container = Postgres::default()
                    .with_tag("16-alpine")
                    .start()
                    .await
                    .expect("postgres container started");
                let port = container
                    .get_host_port_ipv4(5432)
                    .await
                    .expect("postgres port");
                (container, port)
            })
            .await;
        *port
    }
    ```

    Cada teste continua isolado — só que em vez de pagar o boot completo do container (tipicamente de 1 a 3 segundos), ele paga apenas o custo de um `CREATE DATABASE`. Numa suíte com dezenas de testes, a diferença é enorme.

    Só que tem um problema escondido nesse `static`.

    ## `static` nunca é dropado — nem quando o processo termina

    Em Rust, valores armazenados em `static` **nunca chamam seus destrutores**. Isso não depende de como o processo termina — não importa se o `main` retorna normalmente ou se alguém chama `std::process::exit`. É uma garantia da linguagem: destrutores de `static` simplesmente não rodam.

    O `Drop` de `ContainerAsync` existe e faz o trabalho certo — ele chama `docker rm` no container. O problema é que, guardado num `OnceCell` `static`, esse `Drop` nunca é executado. Nada nunca remove o container.

    Em Java e Go, isso não costuma doer porque o Testcontainers roda um container companheiro chamado **ryuk**: um reaper que fica de olho na conexão do processo de teste e remove os recursos órfãos quando ela cai, independente de qualquer `Drop`/`finally`/`defer` ter rodado. `testcontainers-rs` **não implementa ryuk**. Sem isso, e sem `Drop` de `static`, não existe rede de segurança.

    A forma mais direta de confirmar isso é rodar a suíte de testes e contar containers antes e depois:

    ```bash
    docker ps --filter "ancestor=postgres:16-alpine" --format "{{.ID}}" | wc -l
    ```

    Sem correção, esse número só cresce a cada `cargo test`.

    ## O fix: um destructor de verdade, fora do Rust

    Como não dá para confiar em `Drop`, a solução é interceptar o encerramento real do processo — no nível do runtime C, não do Rust. É exatamente para isso que serve a crate [`dtor`](https://docs.rs/dtor) (a parte de destructors que saiu da `ctor` a partir da versão 1.0): ela registra uma função na seção `.fini_array` do binário, que o sistema operacional executa no encerramento do processo, sem depender de nenhuma garantia da linguagem Rust.

    O detalhe importante: dentro desse hook não existe runtime tokio ativo, então não dá para simplesmente chamar o `Drop` assíncrono do `ContainerAsync` de novo (ele usa `tokio::runtime::Handle::current()` internamente e entra em pânico sem um runtime). A saída é guardar só o ID do container como `String` e remover o container via `docker rm -f` diretamente, de forma síncrona:

    ```rust
    static CONTAINER_ID: OnceLock<String> = OnceLock::new();

    // ... dentro do get_or_init do container:
    CONTAINER_ID.set(container.id().to_owned()).expect("set once");

    #[dtor::dtor]
    unsafe fn stop_shared_container() {
        if let Some(id) = CONTAINER_ID.get() {
            let _ = std::process::Command::new("docker")
                .args(["rm", "-f", id])
                .output();
        }
    }
    ```

    A crate exige que a função seja marcada `unsafe fn` — o próprio código antes de `main` não tem as garantias normais do runtime Rust, e a macro avisa isso via deprecation warning se você não marcar. Depois dessa mudança, rodar a suíte inteira e contar containers com `docker ps` mostra zero sobras, em qualquer cenário: sucesso, teste que falha, ou processo interrompido no meio.

    ## Pegadinha extra: o singleton é por binário, não por suíte

    Se você vem de Java ou Go, é fácil assumir que "container singleton" significa um único container para a rodada inteira de `cargo test`. Não é isso que acontece.

    O Cargo compila cada arquivo em `tests/` como um binário de teste separado, e os testes unitários dentro de `src/` (os `#[cfg(test)]` inline) compilam para outro binário totalmente à parte. Um `static` vive no escopo de um processo — então "singleton" aqui quer dizer *um container por binário*, não um container por projeto. Um projeto com testes unitários espalhados pelo `src/` e um `tests/integration.rs` vai, no mínimo, subir dois containers por rodada completa de `cargo test`, não um. Isso é esperado e não é um bug, mas vale saber antes de estranhar ver mais de um container no `docker ps` no meio da suíte.

    ## Banco por teste em vez de transação por teste

    O artigo anterior usa rollback de transação para isolar testes — funciona bem quando cada teste segura uma única conexão. O problema aparece se sua aplicação usa um **pool de conexões de verdade** (`diesel-async` + `deadpool`, por exemplo): o pool entrega conexões arbitrárias, então não existe "a" conexão do teste para dar rollback.

    A alternativa que combina bem com o container singleton: em vez de uma transação, cada teste cria seu próprio banco dentro do container compartilhado.

    ```rust
    let db_name = format!("test_{}", DB_COUNTER.fetch_add(1, Ordering::Relaxed));
    diesel::PgConnection::establish(&admin_url)
        .expect("admin connection")
        .batch_execute(&format!(r#"CREATE DATABASE "{db_name}""#))
        .expect("create test database");

    let url = format!("postgres://postgres:postgres@127.0.0.1:{port}/{db_name}");
    diesel::PgConnection::establish(&url)
        .expect("migration connection")
        .run_pending_migrations(MIGRATIONS)
        .expect("migrations");

    let pool = DbPool::new(&DatabaseSettings { url }).expect("test db pool");
    ```

    O custo de um `CREATE DATABASE` é muito menor que o de subir um container novo, e o isolamento continua total: cada teste tem seu próprio schema, sem estado compartilhado entre eles, sem depender de qual conexão o pool decidiu entregar.

    ## Resultado

    Numa suíte real com 65 testes unitários e 17 de integração, o binário de testes unitários passou a rodar em cerca de 6 segundos e o de integração em cerca de 3 — cada um pagando o boot do container **uma única vez**, não uma vez por teste. E depois de cada rodada, `docker ps` mostra zero containers órfãos.

    O padrão de container singleton do artigo anterior continua sendo o caminho certo. Só que "singleton" em Rust, sem o reaper que outras linguagens têm de graça, exige um destructor explícito de verdade — e vale saber disso antes de descobrir pelo `docker system df` crescendo silenciosamente no seu disco.

    ---

    **Recursos adicionais:**

    - [dtor — documentação](https://docs.rs/dtor)
    - [testcontainers-rs — repositório](https://github.com/testcontainers/testcontainers-rs)
    - [Artigo anterior: Testes de Integração em Rust com Testcontainers](/pt-BR/posts/testes-integracao-rust-testcontainers)
en:
  layout: post
  date: 2026-07-05 10:00:00
  image: /assets/img/testcontainers-rust-container-zumbi-vazamento/cover.png
  main-class: dev
  color: "#637a91"
  tags:
    - rust
    - testing
    - testcontainers
    - postgresql
    - docker
  categories:
    - dev
  title: "The Zombie Container: Your Rust Testcontainers Singleton Is Leaking (and Nobody Tells You)"
  description: "A singleton Postgres container speeds up Rust integration tests, but without ryuk and with statics that never drop, it leaks forever. The problem, the root cause, and the fix using the dtor crate."
  body: |
    In the [previous article](/pt-BR/posts/testes-integracao-rust-testcontainers), I showed how to write integration tests in Rust using Testcontainers against real Postgres and Redis. It works well, but there's a detail that only showed up once I took the "singleton container" pattern into a real production codebase: if you're not careful, every `cargo test` leaves a zombie Postgres container running on your machine, forever.

    It's not a rare bug. It's a direct consequence of how `static` works in Rust, combined with the fact that `testcontainers-rs` — unlike its Java and Go counterparts — has no ryuk-style reaper. Worth understanding before you copy the singleton pattern from the previous article into your own project.

    ## The pattern that looked right

    The idea is simple: instead of booting a fresh container for every test, boot one Postgres container once per test binary and reuse it, giving each test its own isolated database inside it.

    ```rust
    static CONTAINER: OnceCell<(ContainerAsync<Postgres>, u16)> = OnceCell::const_new();

    async fn container_port() -> u16 {
        let (_container, port) = CONTAINER
            .get_or_init(|| async {
                let container = Postgres::default()
                    .with_tag("16-alpine")
                    .start()
                    .await
                    .expect("postgres container started");
                let port = container
                    .get_host_port_ipv4(5432)
                    .await
                    .expect("postgres port");
                (container, port)
            })
            .await;
        *port
    }
    ```

    Each test stays isolated — except instead of paying the full container boot cost (typically 1 to 3 seconds), it only pays for a `CREATE DATABASE`. Across a suite with dozens of tests, the difference is huge.

    There's a hidden problem in that `static`, though.

    ## `static` is never dropped — not even when the process exits

    In Rust, values stored in a `static` **never run their destructors**. This has nothing to do with how the process terminates — it doesn't matter whether `main` returns normally or something calls `std::process::exit`. It's a language guarantee: `static` destructors simply don't run.

    `ContainerAsync`'s `Drop` impl exists and does the right thing — it calls `docker rm` on the container. The problem is that, stashed inside a `static` `OnceCell`, that `Drop` never fires. Nothing ever removes the container.

    In Java and Go, this usually doesn't hurt because Testcontainers runs a companion container called **ryuk**: a reaper that watches the test process's connection and removes orphaned resources when it drops, independent of whether any `Drop`/`finally`/`defer` ran. `testcontainers-rs` **doesn't implement ryuk**. Without it, and without `static` drops, there's no safety net.

    The most direct way to confirm this is to run the test suite and count containers before and after:

    ```bash
    docker ps --filter "ancestor=postgres:16-alpine" --format "{{.ID}}" | wc -l
    ```

    Without a fix, that number only grows with every `cargo test`.

    ## The fix: a real destructor, outside of Rust

    Since `Drop` can't be trusted here, the fix is to hook into the actual process exit — at the C runtime level, not Rust's. That's exactly what the [`dtor`](https://docs.rs/dtor) crate is for (destructor support split out of `ctor` as of version 1.0): it registers a function in the binary's `.fini_array` section, which the OS runs on process exit, independent of any Rust-level guarantee.

    The important catch: there's no active tokio runtime inside that hook, so you can't just call `ContainerAsync`'s async `Drop` again (it uses `tokio::runtime::Handle::current()` internally and panics without a runtime). The way out is to stash only the container ID as a plain `String` and remove the container with a synchronous `docker rm -f`:

    ```rust
    static CONTAINER_ID: OnceLock<String> = OnceLock::new();

    // ... inside the container's get_or_init:
    CONTAINER_ID.set(container.id().to_owned()).expect("set once");

    #[dtor::dtor]
    unsafe fn stop_shared_container() {
        if let Some(id) = CONTAINER_ID.get() {
            let _ = std::process::Command::new("docker")
                .args(["rm", "-f", id])
                .output();
        }
    }
    ```

    The crate requires the function to be marked `unsafe fn` — code running before `main` doesn't have the usual Rust runtime guarantees, and the macro warns you about it via a deprecation lint if you don't. After this change, running the full suite and counting containers with `docker ps` shows zero leftovers, whether the run succeeds, a test fails, or the process gets interrupted mid-run.

    ## Extra gotcha: the singleton is per binary, not per suite

    If you're coming from Java or Go, it's easy to assume "singleton container" means one container for the entire `cargo test` run. That's not what happens.

    Cargo compiles every file under `tests/` as its own separate test binary, and unit tests inside `src/` (the inline `#[cfg(test)]` ones) compile into yet another, entirely separate binary. A `static` lives at process scope — so "singleton" here means *one container per binary*, not one container per project. A project with unit tests scattered across `src/` and a `tests/integration.rs` will boot at least two containers per full `cargo test` run, not one. That's expected, not a bug, but worth knowing before you're confused seeing more than one container in `docker ps` mid-suite.

    ## Per-test database instead of per-test transaction

    The previous article uses transaction rollback to isolate tests — that works well when each test holds onto a single connection. The problem shows up if your application uses a **real connection pool** (`diesel-async` + `deadpool`, for example): the pool hands out arbitrary connections, so there's no single "the" test connection to roll back.

    The alternative that pairs well with a singleton container: instead of a transaction, each test creates its own database inside the shared container.

    ```rust
    let db_name = format!("test_{}", DB_COUNTER.fetch_add(1, Ordering::Relaxed));
    diesel::PgConnection::establish(&admin_url)
        .expect("admin connection")
        .batch_execute(&format!(r#"CREATE DATABASE "{db_name}""#))
        .expect("create test database");

    let url = format!("postgres://postgres:postgres@127.0.0.1:{port}/{db_name}");
    diesel::PgConnection::establish(&url)
        .expect("migration connection")
        .run_pending_migrations(MIGRATIONS)
        .expect("migrations");

    let pool = DbPool::new(&DatabaseSettings { url }).expect("test db pool");
    ```

    A `CREATE DATABASE` costs far less than booting a new container, and isolation stays complete: each test gets its own schema, with no shared state between them and no dependency on which connection the pool happened to hand out.

    ## The payoff

    On a real suite with 65 unit tests and 17 integration tests, the unit test binary went down to about 6 seconds and the integration binary to about 3 — each paying the container boot cost **exactly once**, not once per test. And after every run, `docker ps` shows zero orphaned containers.

    The singleton container pattern from the previous article is still the right call. It's just that "singleton" in Rust, without the reaper other languages get for free, needs an explicit, real destructor — worth knowing before you find out from `docker system df` quietly growing on your disk.

    ---

    **Additional resources:**

    - [dtor — documentation](https://docs.rs/dtor)
    - [testcontainers-rs — repository](https://github.com/testcontainers/testcontainers-rs)
    - [Previous article: Integration Testing in Rust with Testcontainers](/pt-BR/posts/testes-integracao-rust-testcontainers)
---
