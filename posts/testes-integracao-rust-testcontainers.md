---
pt-BR:
  layout: post
  date: 2026-03-30 00:00:00
  main-class: dev
  color: "#637a91"
  tags:
    - rust
    - testing
    - testcontainers
    - postgresql
    - redis
  title: Como Escrever Testes de Integração para APIs Rust com Testcontainers
  description: Aprenda a escrever testes de integração confiáveis para APIs Rust usando Testcontainers, PostgreSQL e Redis com isolamento completo
  body: |

    Testes unitários verificam código isoladamente, mas testes de integração
    verificam se seu código funciona com dependências reais. Testcontainers
    inicia containers Docker reais para seus testes, eliminando mocks
    instáveis e capturando problemas de integração reais.


    Testar com bancos de dados reais captura problemas que mocks não
    detectam: sintaxe SQL, constraints, transações e gerenciamento de
    conexões. Neste artigo, vou compartilhar como implementei testes de
    integração em uma aplicação de pagamentos que estou construindo em Rust.


    ## Por Que Testcontainers?


    Testcontainers resolve um problema fundamental no desenvolvimento: como
    testar código que depende de serviços externos (bancos de dados, caches,
    filas de mensagens) sem criar ambientes complexos ou usar mocks que não
    refletem o comportamento real.


    **Benefícios principais:**


    - **Ambiente real**: Testa contra PostgreSQL, Redis, Kafka, etc. reais

    - **Isolamento**: Cada teste tem seus próprios containers

    - **Cleanup automático**: Containers são destruídos após os testes

    - **Paralelização**: Testes podem rodar em paralelo com segurança

    - **CI/CD friendly**: Funciona em qualquer ambiente com Docker


    ---


    ## Configuração do Projeto


    Primeiro, adicione as dependências necessárias ao seu `Cargo.toml`. Este
    exemplo é baseado em uma API de pagamentos que estou desenvolvendo:


    ```toml
    [package]
    name = "payment-api"
    version = "0.1.0"
    edition = "2021"

    [dependencies]
    # Web framework
    axum = "0.7"
    tokio = { version = "1", features = ["full"] }

    # Database
    sqlx = { version = "0.7", features = ["runtime-tokio", "postgres", "uuid", "chrono"] }

    # Redis
    redis = { version = "0.24", features = ["tokio-comp"] }

    # Serialization
    serde = { version = "1", features = ["derive"] }
    serde_json = "1"
    uuid = { version = "1", features = ["v4", "serde"] }
    chrono = { version = "0.4", features = ["serde"] }

    [dev-dependencies]
    # Testcontainers
    testcontainers = "0.15"
    testcontainers-modules = { version = "0.3", features = ["postgres", "redis"] }

    # Test utilities
    reqwest = { version = "0.11", features = ["json"] }
    tokio-test = "0.4"
    ```


    ---


    ## Configuração Básica de Containers


    Crie um módulo `common` para compartilhar utilitários de teste:


    ```rust
    // tests/common/mod.rs
    // Utilitários compartilhados e configuração de containers

    use testcontainers::{clients::Cli, Container, RunnableImage};
    use testcontainers_modules::postgres::Postgres;
    use testcontainers_modules::redis::Redis;
    use sqlx::PgPool;
    use std::sync::OnceLock;

    // Cliente Docker singleton (reutilizado entre testes)
    static DOCKER: OnceLock<Cli> = OnceLock::new();

    fn docker() -> &'static Cli {
        DOCKER.get_or_init(|| Cli::default())
    }

    /// Container PostgreSQL para testes
    pub struct TestPostgres<'a> {
        _container: Container<'a, Postgres>,
        pub pool: PgPool,
        pub url: String,
    }

    impl<'a> TestPostgres<'a> {
        /// Inicia um container PostgreSQL e retorna o pool de conexões
        pub async fn new() -> Self {
            let docker = docker();

            // Inicia o container PostgreSQL
            let container = docker.run(Postgres::default());

            // Obtém informações de conexão
            let port = container.get_host_port_ipv4(5432);
            let url = format!(
                "postgres://postgres:postgres@localhost:{}/postgres",
                port
            );

            // Cria pool de conexões
            let pool = PgPool::connect(&url)
                .await
                .expect("Falha ao conectar ao PostgreSQL");

            // Executa migrations
            sqlx::migrate!("./migrations")
                .run(&pool)
                .await
                .expect("Falha ao executar migrations");

            Self {
                _container: container,
                pool,
                url,
            }
        }

        /// Limpa o banco de dados entre testes
        pub async fn cleanup(&self) {
            // Trunca todas as tabelas (mais rápido que derrubar o container)
            sqlx::query("TRUNCATE users, posts, comments RESTART IDENTITY CASCADE")
                .execute(&self.pool)
                .await
                .expect("Falha ao truncar tabelas");
        }
    }

    /// Container Redis para testes
    pub struct TestRedis<'a> {
        _container: Container<'a, Redis>,
        pub client: redis::Client,
        pub url: String,
    }

    impl<'a> TestRedis<'a> {
        pub async fn new() -> Self {
            let docker = docker();

            let container = docker.run(Redis::default());
            let port = container.get_host_port_ipv4(6379);
            let url = format!("redis://localhost:{}", port);

            let client = redis::Client::open(url.as_str())
                .expect("Falha ao criar cliente Redis");

            Self {
                _container: container,
                client,
                url,
            }
        }

        /// Obtém conexão assíncrona
        pub async fn connection(&self) -> redis::aio::MultiplexedConnection {
            self.client
                .get_multiplexed_async_connection()
                .await
                .expect("Falha ao obter conexão Redis")
        }

        /// Limpa todos os dados
        pub async fn cleanup(&self) {
            let mut conn = self.connection().await;
            redis::cmd("FLUSHALL")
                .query_async::<()>(&mut conn)
                .await
                .expect("Falha ao limpar Redis");
        }
    }
    ```


    ---


    ## Testando Operações de Banco de Dados


    Agora vamos testar um repositório de usuários com PostgreSQL real:


    ```rust
    // tests/user_repository_test.rs
    // Testes de integração para repositório de usuários

    mod common;

    use myapi::repository::UserRepository;
    use myapi::models::CreateUser;
    use uuid::Uuid;

    #[tokio::test]
    async fn test_create_user() {
        // Arrange: Inicia container PostgreSQL
        let postgres = common::TestPostgres::new().await;
        let repo = UserRepository::new(postgres.pool.clone());

        // Act: Cria um usuário
        let create_user = CreateUser {
            email: "[email protected]".to_string(),
            username: "testusuario".to_string(),
            password_hash: "hashed".to_string(),
        };

        let user = repo.create(create_user).await.expect("Falha ao criar usuário");

        // Assert: Usuário foi criado com dados corretos
        assert_eq!(user.email, "[email protected]");
        assert_eq!(user.username, "testusuario");
        assert!(user.id != Uuid::nil());
    }

    #[tokio::test]
    async fn test_find_user_by_email() {
        let postgres = common::TestPostgres::new().await;
        let repo = UserRepository::new(postgres.pool.clone());

        // Cria usuário primeiro
        let create_user = CreateUser {
            email: "[email protected]".to_string(),
            username: "buscausuario".to_string(),
            password_hash: "hashed".to_string(),
        };
        repo.create(create_user).await.unwrap();

        // Busca por email
        let found = repo.find_by_email("[email protected]").await.unwrap();

        assert!(found.is_some());
        assert_eq!(found.unwrap().email, "[email protected]");
    }

    #[tokio::test]
    async fn test_user_email_uniqueness() {
        let postgres = common::TestPostgres::new().await;
        let repo = UserRepository::new(postgres.pool.clone());

        // Cria primeiro usuário
        let create_user = CreateUser {
            email: "[email protected]".to_string(),
            username: "usuario1".to_string(),
            password_hash: "hashed".to_string(),
        };
        repo.create(create_user).await.unwrap();

        // Tenta criar email duplicado
        let duplicate = CreateUser {
            email: "[email protected]".to_string(),
            username: "usuario2".to_string(),
            password_hash: "hashed".to_string(),
        };
        let result = repo.create(duplicate).await;

        // Deve falhar com violação de constraint unique
        assert!(result.is_err());
    }

    #[tokio::test]
    async fn test_transaction_rollback() {
        let postgres = common::TestPostgres::new().await;
        let pool = postgres.pool.clone();

        // Inicia transação
        let mut tx = pool.begin().await.unwrap();

        // Insere usuário dentro da transação
        sqlx::query!(
            "INSERT INTO users (id, email, username, password_hash) VALUES ($1, $2, $3, $4)",
            Uuid::new_v4(),
            "[email protected]",
            "rollbackuser",
            "hashed"
        )
        .execute(&mut *tx)
        .await
        .unwrap();

        // Faz rollback da transação
        tx.rollback().await.unwrap();

        // Verifica que o usuário não foi persistido
        let count: (i64,) = sqlx::query_as("SELECT COUNT(*) FROM users WHERE email = $1")
            .bind("[email protected]")
            .fetch_one(&pool)
            .await
            .unwrap();

        assert_eq!(count.0, 0);
    }
    ```


    ---


    ## Testando Endpoints da API


    Teste a API completa com banco de dados real:


    ```rust
    // tests/api_test.rs
    // Testes end-to-end da API com banco de dados real

    mod common;

    use axum::{Router, routing::get, routing::post};
    use myapi::{routes, AppState};
    use reqwest::StatusCode;

    /// Inicia o servidor da API com banco de teste
    async fn spawn_app(postgres: &common::TestPostgres<'_>) -> String {
        // Constrói aplicação com banco de teste
        let state = AppState {
            db: postgres.pool.clone(),
        };

        let app = Router::new()
            .nest("/api", routes::api_routes())
            .with_state(state);

        // Bind em porta aleatória
        let listener = tokio::net::TcpListener::bind("127.0.0.1:0")
            .await
            .unwrap();
        let addr = listener.local_addr().unwrap();

        // Executa servidor em background
        tokio::spawn(async move {
            axum::serve(listener, app).await.unwrap();
        });

        format!("http://{}", addr)
    }

    #[tokio::test]
    async fn test_create_user_endpoint() {
        let postgres = common::TestPostgres::new().await;
        let base_url = spawn_app(&postgres).await;
        let client = reqwest::Client::new();

        // Cria usuário via API
        let response = client
            .post(&format!("{}/api/users", base_url))
            .json(&serde_json::json!({
                "email": "[email protected]",
                "username": "apiuser",
                "password": "secretpassword123"
            }))
            .send()
            .await
            .unwrap();

        assert_eq!(response.status(), StatusCode::CREATED);

        let user: serde_json::Value = response.json().await.unwrap();
        assert_eq!(user["email"], "[email protected]");
        assert!(user["id"].is_string());
    }

    #[tokio::test]
    async fn test_get_user_endpoint() {
        let postgres = common::TestPostgres::new().await;
        let base_url = spawn_app(&postgres).await;
        let client = reqwest::Client::new();

        // Primeiro cria um usuário
        let create_response = client
            .post(&format!("{}/api/users", base_url))
            .json(&serde_json::json!({
                "email": "[email protected]",
                "username": "getuser",
                "password": "password123"
            }))
            .send()
            .await
            .unwrap();

        let created: serde_json::Value = create_response.json().await.unwrap();
        let user_id = created["id"].as_str().unwrap();

        // Busca o usuário
        let get_response = client
            .get(&format!("{}/api/users/{}", base_url, user_id))
            .send()
            .await
            .unwrap();

        assert_eq!(get_response.status(), StatusCode::OK);

        let user: serde_json::Value = get_response.json().await.unwrap();
        assert_eq!(user["email"], "[email protected]");
    }

    #[tokio::test]
    async fn test_user_not_found() {
        let postgres = common::TestPostgres::new().await;
        let base_url = spawn_app(&postgres).await;
        let client = reqwest::Client::new();

        let response = client
            .get(&format!("{}/api/users/{}", base_url, uuid::Uuid::new_v4()))
            .send()
            .await
            .unwrap();

        assert_eq!(response.status(), StatusCode::NOT_FOUND);
    }
    ```


    ---


    ## Testando com Cache Redis


    Redis é comumente usado para caching. Vamos testar o comportamento do
    cache:


    ```rust
    // tests/cache_test.rs
    // Testando comportamento de cache com Redis

    mod common;

    use myapi::cache::UserCache;
    use myapi::models::User;
    use uuid::Uuid;
    use chrono::Utc;

    #[tokio::test]
    async fn test_cache_hit() {
        let redis = common::TestRedis::new().await;
        let cache = UserCache::new(redis.client.clone());

        let user = User {
            id: Uuid::new_v4(),
            email: "[email protected]".to_string(),
            username: "cacheduser".to_string(),
            created_at: Utc::now(),
        };

        // Define cache
        cache.set(&user).await.unwrap();

        // Busca do cache
        let cached = cache.get(user.id).await.unwrap();

        assert!(cached.is_some());
        assert_eq!(cached.unwrap().email, user.email);
    }

    #[tokio::test]
    async fn test_cache_miss() {
        let redis = common::TestRedis::new().await;
        let cache = UserCache::new(redis.client.clone());

        let result = cache.get(Uuid::new_v4()).await.unwrap();

        assert!(result.is_none());
    }

    #[tokio::test]
    async fn test_cache_expiration() {
        let redis = common::TestRedis::new().await;
        let cache = UserCache::with_ttl(redis.client.clone(), 1); // TTL de 1 segundo

        let user = User {
            id: Uuid::new_v4(),
            email: "[email protected]".to_string(),
            username: "expiringuser".to_string(),
            created_at: Utc::now(),
        };

        cache.set(&user).await.unwrap();

        // Verifica que está em cache
        assert!(cache.get(user.id).await.unwrap().is_some());

        // Aguarda expiração
        tokio::time::sleep(std::time::Duration::from_secs(2)).await;

        // Deve ter expirado
        assert!(cache.get(user.id).await.unwrap().is_none());
    }

    #[tokio::test]
    async fn test_cache_invalidation() {
        let redis = common::TestRedis::new().await;
        let cache = UserCache::new(redis.client.clone());

        let user = User {
            id: Uuid::new_v4(),
            email: "[email protected]".to_string(),
            username: "invalidateuser".to_string(),
            created_at: Utc::now(),
        };

        cache.set(&user).await.unwrap();
        cache.invalidate(user.id).await.unwrap();

        let result = cache.get(user.id).await.unwrap();
        assert!(result.is_none());
    }
    ```


    ---


    ## Execução de Testes em Paralelo


    Um dos desafios ao rodar testes em paralelo é garantir isolamento. Aqui
    estão algumas estratégias:


    ```rust
    // tests/parallel_test.rs
    // Isolamento de testes para execução paralela

    mod common;

    use common::TestPostgres;
    use sqlx::PgPool;

    /// Usa transações para isolamento
    async fn with_transaction<F, Fut, R>(pool: &PgPool, f: F) -> R
    where
        F: FnOnce(&mut sqlx::Transaction<'_, sqlx::Postgres>) -> Fut,
        Fut: std::future::Future<Output = R>,
    {
        // Inicia transação
        let mut tx = pool.begin().await.unwrap();

        // Executa o teste dentro da transação
        let result = f(&mut tx).await;

        // Rollback - mudanças não persistem
        tx.rollback().await.unwrap();

        result
    }

    #[tokio::test]
    async fn test_parallel_1() {
        let postgres = TestPostgres::new().await;

        // Usa isolamento por transação
        with_transaction(&postgres.pool, |tx| async move {
            sqlx::query!(
                "INSERT INTO users (id, email, username, password_hash) VALUES ($1, $2, $3, $4)",
                uuid::Uuid::new_v4(),
                "[email protected]",
                "parallel1",
                "hash"
            )
            .execute(&mut **tx)
            .await
            .unwrap();

            // Asserções do teste aqui
        }).await;
    }

    #[tokio::test]
    async fn test_parallel_2() {
        let postgres = TestPostgres::new().await;

        with_transaction(&postgres.pool, |tx| async move {
            sqlx::query!(
                "INSERT INTO users (id, email, username, password_hash) VALUES ($1, $2, $3, $4)",
                uuid::Uuid::new_v4(),
                "[email protected]",
                "parallel2",
                "hash"
            )
            .execute(&mut **tx)
            .await
            .unwrap();

            // Asserções do teste aqui
        }).await;
    }
    ```


    **Estratégias de isolamento:**


    1. **Transações**: Cada teste roda dentro de uma transação que é revertida
    ao final

    2. **Containers dedicados**: Cada teste inicia seu próprio container (mais
    lento)

    3. **Schemas separados**: Cada teste usa um schema PostgreSQL diferente

    4. **Cleanup explícito**: Truncar tabelas entre testes


    ---


    ## Configuração Customizada de Containers


    Você pode personalizar os containers conforme suas necessidades:


    ```rust
    // tests/common/custom_containers.rs
    // Configurações customizadas de containers

    use testcontainers::{RunnableImage};
    use testcontainers_modules::postgres::Postgres;

    /// PostgreSQL com configuração específica
    pub fn postgres_with_config() -> RunnableImage<Postgres> {
        let postgres = Postgres::default();

        RunnableImage::from(postgres)
            .with_env_var(("POSTGRES_PASSWORD", "testpass"))
            .with_env_var(("POSTGRES_DB", "testdb"))
            .with_env_var(("POSTGRES_USER", "testuser"))
            // Desabilita fsync para testes mais rápidos
            .with_env_var(("POSTGRES_HOST_AUTH_METHOD", "trust"))
    }

    /// PostgreSQL com extensões
    pub fn postgres_with_extensions() -> RunnableImage<Postgres> {
        let postgres = Postgres::default()
            .with_db_name("testdb")
            .with_user("test")
            .with_password("test");

        RunnableImage::from(postgres)
    }

    /// Aguarda container estar pronto com health check customizado
    pub async fn wait_for_postgres(port: u16) {
        let url = format!("postgres://postgres:postgres@localhost:{}/postgres", port);

        // Retenta até a conexão ter sucesso
        for _ in 0..30 {
            if sqlx::PgPool::connect(&url).await.is_ok() {
                return;
            }
            tokio::time::sleep(std::time::Duration::from_millis(100)).await;
        }

        panic!("PostgreSQL não ficou pronto a tempo");
    }
    ```


    ---


    ## Testando com Múltiplos Containers


    Testes que requerem múltiplos serviços (banco de dados + cache):


    ```rust
    // tests/integration_test.rs
    // Testes que requerem múltiplos serviços

    mod common;

    use common::{TestPostgres, TestRedis};

    /// Teste de integração completo com banco de dados e cache
    #[tokio::test]
    async fn test_full_workflow() {
        // Inicia ambos os containers
        let postgres = TestPostgres::new().await;
        let redis = TestRedis::new().await;

        // Constrói estado da aplicação com ambas as conexões
        let state = myapi::AppState {
            db: postgres.pool.clone(),
            cache: redis.client.clone(),
        };

        // Testa o workflow completo
        let user_service = myapi::services::UserService::new(state);

        // Cria usuário (escreve no DB)
        let user = user_service
            .create_user("[email protected]", "integrationuser", "password")
            .await
            .unwrap();

        // Busca usuário (deve cachear no Redis)
        let fetched1 = user_service.get_user(user.id).await.unwrap().unwrap();
        assert_eq!(fetched1.email, "[email protected]");

        // Busca novamente (deve usar cache)
        let fetched2 = user_service.get_user(user.id).await.unwrap().unwrap();
        assert_eq!(fetched2.id, user.id);

        // Verifica que cache foi populado
        let mut redis_conn = redis.connection().await;
        let cached: Option<String> = redis::cmd("GET")
            .arg(format!("user:{}", user.id))
            .query_async(&mut redis_conn)
            .await
            .unwrap();
        assert!(cached.is_some());
    }
    ```


    ---


    ## Fixtures de Teste


    Para testes complexos, é útil ter dados de teste reutilizáveis:


    ```rust
    // tests/fixtures.rs
    // Dados de teste reutilizáveis

    use myapi::models::{User, Post};
    use sqlx::PgPool;
    use uuid::Uuid;
    use chrono::Utc;

    pub struct TestFixtures {
        pub users: Vec<User>,
        pub posts: Vec<Post>,
    }

    impl TestFixtures {
        /// Popula banco de dados com dados de teste
        pub async fn seed(pool: &PgPool) -> Self {
            let mut users = Vec::new();
            let mut posts = Vec::new();

            // Cria usuários
            for i in 0..5 {
                let user = sqlx::query_as!(
                    User,
                    r#"
                    INSERT INTO users (id, email, username, password_hash, created_at)
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING id, email, username, created_at
                    "#,
                    Uuid::new_v4(),
                    format!("user{}@example.com", i),
                    format!("user{}", i),
                    "hashed",
                    Utc::now()
                )
                .fetch_one(pool)
                .await
                .unwrap();

                users.push(user);
            }

            // Cria posts para cada usuário
            for user in &users {
                for j in 0..3 {
                    let post = sqlx::query_as!(
                        Post,
                        r#"
                        INSERT INTO posts (id, author_id, title, content, created_at)
                        VALUES ($1, $2, $3, $4, $5)
                        RETURNING id, author_id, title, content, created_at
                        "#,
                        Uuid::new_v4(),
                        user.id,
                        format!("Post {} by {}", j, user.username),
                        format!("Conteúdo do post {}", j),
                        Utc::now()
                    )
                    .fetch_one(pool)
                    .await
                    .unwrap();

                    posts.push(post);
                }
            }

            Self { users, posts }
        }
    }

    #[tokio::test]
    async fn test_with_fixtures() {
        let postgres = common::TestPostgres::new().await;
        let fixtures = TestFixtures::seed(&postgres.pool).await;

        // Usa dados das fixtures nos testes
        assert_eq!(fixtures.users.len(), 5);
        assert_eq!(fixtures.posts.len(), 15);

        // Testa queries contra dados populados
        let user_posts: Vec<Post> = sqlx::query_as!(
            Post,
            "SELECT id, author_id, title, content, created_at FROM posts WHERE author_id = $1",
            fixtures.users[0].id
        )
        .fetch_all(&postgres.pool)
        .await
        .unwrap();

        assert_eq!(user_posts.len(), 3);
    }
    ```


    ---


    ## Melhores Práticas


    | Prática | Motivo |
    |---------|--------|
    | Use containers reais | Captura problemas reais de integração |
    | Isole testes | Previne interferência entre testes |
    | Limpe entre testes | Estado inicial consistente |
    | Reutilize cliente Docker | Startup de containers mais rápido |
    | Execute migrations nos testes | Testa mudanças de schema |
    | Use fixtures para dados complexos | Testes consistentes e legíveis |


    ---


    ## Executando os Testes


    Para rodar todos os testes de integração:


    ```bash
    # Roda todos os testes
    cargo test

    # Roda testes específicos
    cargo test test_create_user

    # Roda com saída detalhada
    cargo test -- --nocapture

    # Roda testes em paralelo (padrão)
    cargo test -- --test-threads=4
    ```


    ---


    ## Dicas de Performance


    1. **Reutilize o cliente Docker**: Use `OnceLock` ou `lazy_static` para
    singleton

    2. **Minimize migrations**: Execute apenas as migrations necessárias

    3. **Use transações para cleanup**: Mais rápido que truncar tabelas

    4. **Cache imagens Docker**: CI/CD deve cachear imagens para startup mais
    rápido

    5. **Paralelização inteligente**: Deixe cada teste ter seu próprio
    container


    ---


    ## Troubleshooting


    **Erro: "Cannot connect to Docker daemon"**


    ```bash
    # Verifique se Docker está rodando
    docker ps

    # No Linux, adicione seu usuário ao grupo docker
    sudo usermod -aG docker $USER
    ```


    **Erro: "Port already in use"**


    Testcontainers usa portas aleatórias automaticamente. Se ver este erro,
    pode ser um container antigo:


    ```bash
    # Limpa containers antigos
    docker ps -a | grep testcontainers | awk '{print $1}' | xargs docker rm -f
    ```


    **Testes lentos**


    Se seus testes estão lentos, considere:


    - Reutilizar containers entre testes relacionados

    - Usar transações em vez de truncar tabelas

    - Cachear imagens Docker localmente

    - Desabilitar fsync no PostgreSQL para testes


    ---


    ## Conclusão


    Testcontainers transforma testes de integração em Rust de uma tarefa
    complexa em algo simples e confiável. Usando containers Docker reais, você
    elimina a necessidade de mocks complexos e captura problemas que só
    aparecem em ambientes reais.


    A configuração inicial pode parecer trabalhosa, mas o retorno em confiança
    e manutenibilidade do código vale a pena. Seus testes se tornam
    documentação viva de como sua aplicação interage com serviços externos.


    Comece implementando testes para suas operações de banco de dados mais
    críticas e, gradualmente, expanda para cobrir toda sua API. Com o tempo,
    você terá uma suite de testes robusta que te dá confiança para refatorar e
    adicionar novas features.


    ---


    **Recursos adicionais:**


    - [Documentação Testcontainers Rust](https://github.com/testcontainers/testcontainers-rs)

    - [SQLx Book](https://github.com/launchbadge/sqlx)

    - [Axum Examples](https://github.com/tokio-rs/axum/tree/main/examples)

    - [Redis.rs Documentation](https://docs.rs/redis/)
en:
  layout: post
  date: 2026-03-30 00:00:00
  main-class: dev
  color: "#637a91"
  tags:
    - rust
    - testing
    - testcontainers
    - postgresql
    - redis
  title: How to Write Integration Tests for Rust APIs with Testcontainers
  description: Learn to write reliable integration tests for Rust APIs using Testcontainers, PostgreSQL and Redis with complete isolation
  body: >

    Unit tests verify code in isolation, but integration tests verify your
    code works with real dependencies. Testcontainers spins up real Docker
    containers for your tests, eliminating flaky mocks and catching real
    integration issues.


    Testing against real databases catches issues that mocks miss: SQL syntax,
    constraints, transactions, and connection handling.


    ## Why Testcontainers?


    Testcontainers solves a fundamental problem in development: how to test
    code that depends on external services (databases, caches, message queues)
    without creating complex environments or using mocks that don't reflect
    real behavior.


    **Key benefits:**


    - **Real environment**: Test against actual PostgreSQL, Redis, Kafka, etc.

    - **Isolation**: Each test gets its own containers

    - **Automatic cleanup**: Containers are destroyed after tests

    - **Parallelization**: Tests can run in parallel safely

    - **CI/CD friendly**: Works in any environment with Docker


    ---


    ## Project Setup


    First, add the necessary dependencies to your `Cargo.toml`. This example
    is based on a payment API I'm developing:


    ```toml
    [package]
    name = "payment-api"
    version = "0.1.0"
    edition = "2021"

    [dependencies]
    # Web framework
    axum = "0.7"
    tokio = { version = "1", features = ["full"] }

    # Database
    sqlx = { version = "0.7", features = ["runtime-tokio", "postgres", "uuid", "chrono"] }

    # Redis
    redis = { version = "0.24", features = ["tokio-comp"] }

    # Serialization
    serde = { version = "1", features = ["derive"] }
    serde_json = "1"
    uuid = { version = "1", features = ["v4", "serde"] }
    chrono = { version = "0.4", features = ["serde"] }

    [dev-dependencies]
    # Testcontainers
    testcontainers = "0.15"
    testcontainers-modules = { version = "0.3", features = ["postgres", "redis"] }

    # Test utilities
    reqwest = { version = "0.11", features = ["json"] }
    tokio-test = "0.4"
    ```


    ---


    ## Basic Container Setup


    Create a `common` module to share test utilities:


    ```rust
    // tests/common/mod.rs
    // Shared test utilities and container setup

    use testcontainers::{clients::Cli, Container, RunnableImage};
    use testcontainers_modules::postgres::Postgres;
    use testcontainers_modules::redis::Redis;
    use sqlx::PgPool;
    use std::sync::OnceLock;

    // Docker client singleton (reused across tests)
    static DOCKER: OnceLock<Cli> = OnceLock::new();

    fn docker() -> &'static Cli {
        DOCKER.get_or_init(|| Cli::default())
    }

    /// PostgreSQL container for testing
    pub struct TestPostgres<'a> {
        _container: Container<'a, Postgres>,
        pub pool: PgPool,
        pub url: String,
    }

    impl<'a> TestPostgres<'a> {
        /// Start a PostgreSQL container and return connection pool
        pub async fn new() -> Self {
            let docker = docker();

            // Start PostgreSQL container
            let container = docker.run(Postgres::default());

            // Get connection info
            let port = container.get_host_port_ipv4(5432);
            let url = format!(
                "postgres://postgres:postgres@localhost:{}/postgres",
                port
            );

            // Create connection pool
            let pool = PgPool::connect(&url)
                .await
                .expect("Failed to connect to PostgreSQL");

            // Run migrations
            sqlx::migrate!("./migrations")
                .run(&pool)
                .await
                .expect("Failed to run migrations");

            Self {
                _container: container,
                pool,
                url,
            }
        }

        /// Clean up database between tests
        pub async fn cleanup(&self) {
            // Truncate all tables (faster than dropping container)
            sqlx::query("TRUNCATE users, posts, comments RESTART IDENTITY CASCADE")
                .execute(&self.pool)
                .await
                .expect("Failed to truncate tables");
        }
    }

    /// Redis container for testing
    pub struct TestRedis<'a> {
        _container: Container<'a, Redis>,
        pub client: redis::Client,
        pub url: String,
    }

    impl<'a> TestRedis<'a> {
        pub async fn new() -> Self {
            let docker = docker();

            let container = docker.run(Redis::default());
            let port = container.get_host_port_ipv4(6379);
            let url = format!("redis://localhost:{}", port);

            let client = redis::Client::open(url.as_str())
                .expect("Failed to create Redis client");

            Self {
                _container: container,
                client,
                url,
            }
        }

        /// Get async connection
        pub async fn connection(&self) -> redis::aio::MultiplexedConnection {
            self.client
                .get_multiplexed_async_connection()
                .await
                .expect("Failed to get Redis connection")
        }

        /// Flush all data
        pub async fn cleanup(&self) {
            let mut conn = self.connection().await;
            redis::cmd("FLUSHALL")
                .query_async::<()>(&mut conn)
                .await
                .expect("Failed to flush Redis");
        }
    }
    ```


    ---


    ## Testing Database Operations


    Now let's test a user repository with real PostgreSQL:


    ```rust
    // tests/user_repository_test.rs
    // Integration tests for user repository

    mod common;

    use myapi::repository::UserRepository;
    use myapi::models::CreateUser;
    use uuid::Uuid;

    #[tokio::test]
    async fn test_create_user() {
        // Arrange: Start PostgreSQL container
        let postgres = common::TestPostgres::new().await;
        let repo = UserRepository::new(postgres.pool.clone());

        // Act: Create a user
        let create_user = CreateUser {
            email: "[email protected]".to_string(),
            username: "testuser".to_string(),
            password_hash: "hashed".to_string(),
        };

        let user = repo.create(create_user).await.expect("Failed to create user");

        // Assert: User was created with correct data
        assert_eq!(user.email, "[email protected]");
        assert_eq!(user.username, "testuser");
        assert!(user.id != Uuid::nil());
    }

    #[tokio::test]
    async fn test_find_user_by_email() {
        let postgres = common::TestPostgres::new().await;
        let repo = UserRepository::new(postgres.pool.clone());

        // Create user first
        let create_user = CreateUser {
            email: "[email protected]".to_string(),
            username: "finduser".to_string(),
            password_hash: "hashed".to_string(),
        };
        repo.create(create_user).await.unwrap();

        // Find by email
        let found = repo.find_by_email("[email protected]").await.unwrap();

        assert!(found.is_some());
        assert_eq!(found.unwrap().email, "[email protected]");
    }

    #[tokio::test]
    async fn test_user_email_uniqueness() {
        let postgres = common::TestPostgres::new().await;
        let repo = UserRepository::new(postgres.pool.clone());

        // Create first user
        let create_user = CreateUser {
            email: "[email protected]".to_string(),
            username: "user1".to_string(),
            password_hash: "hashed".to_string(),
        };
        repo.create(create_user).await.unwrap();

        // Try to create duplicate email
        let duplicate = CreateUser {
            email: "[email protected]".to_string(),
            username: "user2".to_string(),
            password_hash: "hashed".to_string(),
        };
        let result = repo.create(duplicate).await;

        // Should fail with unique constraint violation
        assert!(result.is_err());
    }

    #[tokio::test]
    async fn test_transaction_rollback() {
        let postgres = common::TestPostgres::new().await;
        let pool = postgres.pool.clone();

        // Start transaction
        let mut tx = pool.begin().await.unwrap();

        // Insert user within transaction
        sqlx::query!(
            "INSERT INTO users (id, email, username, password_hash) VALUES ($1, $2, $3, $4)",
            Uuid::new_v4(),
            "[email protected]",
            "rollbackuser",
            "hashed"
        )
        .execute(&mut *tx)
        .await
        .unwrap();

        // Rollback transaction
        tx.rollback().await.unwrap();

        // Verify user was not persisted
        let count: (i64,) = sqlx::query_as("SELECT COUNT(*) FROM users WHERE email = $1")
            .bind("[email protected]")
            .fetch_one(&pool)
            .await
            .unwrap();

        assert_eq!(count.0, 0);
    }
    ```


    ---


    ## Testing API Endpoints


    Test the complete API with real database:


    ```rust
    // tests/api_test.rs
    // End-to-end API tests with real database

    mod common;

    use axum::{Router, routing::get, routing::post};
    use myapi::{routes, AppState};
    use reqwest::StatusCode;

    /// Start the API server with test database
    async fn spawn_app(postgres: &common::TestPostgres<'_>) -> String {
        // Build application with test database
        let state = AppState {
            db: postgres.pool.clone(),
        };

        let app = Router::new()
            .nest("/api", routes::api_routes())
            .with_state(state);

        // Bind to random port
        let listener = tokio::net::TcpListener::bind("127.0.0.1:0")
            .await
            .unwrap();
        let addr = listener.local_addr().unwrap();

        // Spawn server in background
        tokio::spawn(async move {
            axum::serve(listener, app).await.unwrap();
        });

        format!("http://{}", addr)
    }

    #[tokio::test]
    async fn test_create_user_endpoint() {
        let postgres = common::TestPostgres::new().await;
        let base_url = spawn_app(&postgres).await;
        let client = reqwest::Client::new();

        // Create user via API
        let response = client
            .post(&format!("{}/api/users", base_url))
            .json(&serde_json::json!({
                "email": "[email protected]",
                "username": "apiuser",
                "password": "secretpassword123"
            }))
            .send()
            .await
            .unwrap();

        assert_eq!(response.status(), StatusCode::CREATED);

        let user: serde_json::Value = response.json().await.unwrap();
        assert_eq!(user["email"], "[email protected]");
        assert!(user["id"].is_string());
    }

    #[tokio::test]
    async fn test_get_user_endpoint() {
        let postgres = common::TestPostgres::new().await;
        let base_url = spawn_app(&postgres).await;
        let client = reqwest::Client::new();

        // First create a user
        let create_response = client
            .post(&format!("{}/api/users", base_url))
            .json(&serde_json::json!({
                "email": "[email protected]",
                "username": "getuser",
                "password": "password123"
            }))
            .send()
            .await
            .unwrap();

        let created: serde_json::Value = create_response.json().await.unwrap();
        let user_id = created["id"].as_str().unwrap();

        // Get the user
        let get_response = client
            .get(&format!("{}/api/users/{}", base_url, user_id))
            .send()
            .await
            .unwrap();

        assert_eq!(get_response.status(), StatusCode::OK);

        let user: serde_json::Value = get_response.json().await.unwrap();
        assert_eq!(user["email"], "[email protected]");
    }

    #[tokio::test]
    async fn test_user_not_found() {
        let postgres = common::TestPostgres::new().await;
        let base_url = spawn_app(&postgres).await;
        let client = reqwest::Client::new();

        let response = client
            .get(&format!("{}/api/users/{}", base_url, uuid::Uuid::new_v4()))
            .send()
            .await
            .unwrap();

        assert_eq!(response.status(), StatusCode::NOT_FOUND);
    }
    ```


    ---


    ## Testing with Redis Cache


    Redis is commonly used for caching. Let's test cache behavior:


    ```rust
    // tests/cache_test.rs
    // Testing cache behavior with Redis

    mod common;

    use myapi::cache::UserCache;
    use myapi::models::User;
    use uuid::Uuid;
    use chrono::Utc;

    #[tokio::test]
    async fn test_cache_hit() {
        let redis = common::TestRedis::new().await;
        let cache = UserCache::new(redis.client.clone());

        let user = User {
            id: Uuid::new_v4(),
            email: "[email protected]".to_string(),
            username: "cacheduser".to_string(),
            created_at: Utc::now(),
        };

        // Set cache
        cache.set(&user).await.unwrap();

        // Get from cache
        let cached = cache.get(user.id).await.unwrap();

        assert!(cached.is_some());
        assert_eq!(cached.unwrap().email, user.email);
    }

    #[tokio::test]
    async fn test_cache_miss() {
        let redis = common::TestRedis::new().await;
        let cache = UserCache::new(redis.client.clone());

        let result = cache.get(Uuid::new_v4()).await.unwrap();

        assert!(result.is_none());
    }

    #[tokio::test]
    async fn test_cache_expiration() {
        let redis = common::TestRedis::new().await;
        let cache = UserCache::with_ttl(redis.client.clone(), 1); // 1 second TTL

        let user = User {
            id: Uuid::new_v4(),
            email: "[email protected]".to_string(),
            username: "expiringuser".to_string(),
            created_at: Utc::now(),
        };

        cache.set(&user).await.unwrap();

        // Verify it's cached
        assert!(cache.get(user.id).await.unwrap().is_some());

        // Wait for expiration
        tokio::time::sleep(std::time::Duration::from_secs(2)).await;

        // Should be expired
        assert!(cache.get(user.id).await.unwrap().is_none());
    }

    #[tokio::test]
    async fn test_cache_invalidation() {
        let redis = common::TestRedis::new().await;
        let cache = UserCache::new(redis.client.clone());

        let user = User {
            id: Uuid::new_v4(),
            email: "[email protected]".to_string(),
            username: "invalidateuser".to_string(),
            created_at: Utc::now(),
        };

        cache.set(&user).await.unwrap();
        cache.invalidate(user.id).await.unwrap();

        let result = cache.get(user.id).await.unwrap();
        assert!(result.is_none());
    }
    ```


    ---


    ## Parallel Test Execution


    One challenge when running tests in parallel is ensuring isolation. Here
    are some strategies:


    ```rust
    // tests/parallel_test.rs
    // Test isolation for parallel execution

    mod common;

    use common::TestPostgres;
    use sqlx::PgPool;

    /// Use transactions for isolation
    async fn with_transaction<F, Fut, R>(pool: &PgPool, f: F) -> R
    where
        F: FnOnce(&mut sqlx::Transaction<'_, sqlx::Postgres>) -> Fut,
        Fut: std::future::Future<Output = R>,
    {
        // Start transaction
        let mut tx = pool.begin().await.unwrap();

        // Run test inside transaction
        let result = f(&mut tx).await;

        // Rollback - changes won't persist
        tx.rollback().await.unwrap();

        result
    }

    #[tokio::test]
    async fn test_parallel_1() {
        let postgres = TestPostgres::new().await;

        // Use transaction isolation
        with_transaction(&postgres.pool, |tx| async move {
            sqlx::query!(
                "INSERT INTO users (id, email, username, password_hash) VALUES ($1, $2, $3, $4)",
                uuid::Uuid::new_v4(),
                "[email protected]",
                "parallel1",
                "hash"
            )
            .execute(&mut **tx)
            .await
            .unwrap();

            // Test assertions here
        }).await;
    }

    #[tokio::test]
    async fn test_parallel_2() {
        let postgres = TestPostgres::new().await;

        with_transaction(&postgres.pool, |tx| async move {
            sqlx::query!(
                "INSERT INTO users (id, email, username, password_hash) VALUES ($1, $2, $3, $4)",
                uuid::Uuid::new_v4(),
                "[email protected]",
                "parallel2",
                "hash"
            )
            .execute(&mut **tx)
            .await
            .unwrap();

            // Test assertions here
        }).await;
    }
    ```


    **Isolation strategies:**


    1. **Transactions**: Each test runs inside a transaction that's rolled
    back at the end

    2. **Dedicated containers**: Each test starts its own container (slower)

    3. **Separate schemas**: Each test uses a different PostgreSQL schema

    4. **Explicit cleanup**: Truncate tables between tests


    ---


    ## Custom Container Configuration


    You can customize containers according to your needs:


    ```rust
    // tests/common/custom_containers.rs
    // Custom container configurations

    use testcontainers::RunnableImage;
    use testcontainers_modules::postgres::Postgres;

    /// PostgreSQL with specific configuration
    pub fn postgres_with_config() -> RunnableImage<Postgres> {
        let postgres = Postgres::default();

        RunnableImage::from(postgres)
            .with_env_var(("POSTGRES_PASSWORD", "testpass"))
            .with_env_var(("POSTGRES_DB", "testdb"))
            .with_env_var(("POSTGRES_USER", "testuser"))
            // Disable fsync for faster tests
            .with_env_var(("POSTGRES_HOST_AUTH_METHOD", "trust"))
    }

    /// PostgreSQL with extensions
    pub fn postgres_with_extensions() -> RunnableImage<Postgres> {
        let postgres = Postgres::default()
            .with_db_name("testdb")
            .with_user("test")
            .with_password("test");

        RunnableImage::from(postgres)
    }

    /// Wait for container to be ready with custom health check
    pub async fn wait_for_postgres(port: u16) {
        let url = format!("postgres://postgres:postgres@localhost:{}/postgres", port);

        // Retry until connection succeeds
        for _ in 0..30 {
            if sqlx::PgPool::connect(&url).await.is_ok() {
                return;
            }
            tokio::time::sleep(std::time::Duration::from_millis(100)).await;
        }

        panic!("PostgreSQL did not become ready in time");
    }
    ```


    ---


    ## Testing with Multiple Containers


    Tests requiring multiple services (database + cache):


    ```rust
    // tests/integration_test.rs
    // Tests requiring multiple services

    mod common;

    use common::{TestPostgres, TestRedis};

    /// Full integration test with database and cache
    #[tokio::test]
    async fn test_full_workflow() {
        // Start both containers
        let postgres = TestPostgres::new().await;
        let redis = TestRedis::new().await;

        // Build app state with both connections
        let state = myapi::AppState {
            db: postgres.pool.clone(),
            cache: redis.client.clone(),
        };

        // Test the full workflow
        let user_service = myapi::services::UserService::new(state);

        // Create user (writes to DB)
        let user = user_service
            .create_user("[email protected]", "integrationuser", "password")
            .await
            .unwrap();

        // Get user (should cache in Redis)
        let fetched1 = user_service.get_user(user.id).await.unwrap().unwrap();
        assert_eq!(fetched1.email, "[email protected]");

        // Get again (should hit cache)
        let fetched2 = user_service.get_user(user.id).await.unwrap().unwrap();
        assert_eq!(fetched2.id, user.id);

        // Verify cache was populated
        let mut redis_conn = redis.connection().await;
        let cached: Option<String> = redis::cmd("GET")
            .arg(format!("user:{}", user.id))
            .query_async(&mut redis_conn)
            .await
            .unwrap();
        assert!(cached.is_some());
    }
    ```


    ---


    ## Test Fixtures


    For complex tests, it's useful to have reusable test data:


    ```rust
    // tests/fixtures.rs
    // Reusable test data

    use myapi::models::{User, Post};
    use sqlx::PgPool;
    use uuid::Uuid;
    use chrono::Utc;

    pub struct TestFixtures {
        pub users: Vec<User>,
        pub posts: Vec<Post>,
    }

    impl TestFixtures {
        /// Seed database with test data
        pub async fn seed(pool: &PgPool) -> Self {
            let mut users = Vec::new();
            let mut posts = Vec::new();

            // Create users
            for i in 0..5 {
                let user = sqlx::query_as!(
                    User,
                    r#"
                    INSERT INTO users (id, email, username, password_hash, created_at)
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING id, email, username, created_at
                    "#,
                    Uuid::new_v4(),
                    format!("user{}@example.com", i),
                    format!("user{}", i),
                    "hashed",
                    Utc::now()
                )
                .fetch_one(pool)
                .await
                .unwrap();

                users.push(user);
            }

            // Create posts for each user
            for user in &users {
                for j in 0..3 {
                    let post = sqlx::query_as!(
                        Post,
                        r#"
                        INSERT INTO posts (id, author_id, title, content, created_at)
                        VALUES ($1, $2, $3, $4, $5)
                        RETURNING id, author_id, title, content, created_at
                        "#,
                        Uuid::new_v4(),
                        user.id,
                        format!("Post {} by {}", j, user.username),
                        format!("Post {} content", j),
                        Utc::now()
                    )
                    .fetch_one(pool)
                    .await
                    .unwrap();

                    posts.push(post);
                }
            }

            Self { users, posts }
        }
    }

    #[tokio::test]
    async fn test_with_fixtures() {
        let postgres = common::TestPostgres::new().await;
        let fixtures = TestFixtures::seed(&postgres.pool).await;

        // Use fixture data in tests
        assert_eq!(fixtures.users.len(), 5);
        assert_eq!(fixtures.posts.len(), 15);

        // Test queries against seeded data
        let user_posts: Vec<Post> = sqlx::query_as!(
            Post,
            "SELECT id, author_id, title, content, created_at FROM posts WHERE author_id = $1",
            fixtures.users[0].id
        )
        .fetch_all(&postgres.pool)
        .await
        .unwrap();

        assert_eq!(user_posts.len(), 3);
    }
    ```


    ---


    ## Best Practices


    | Practice | Reason |
    |---------|--------|
    | Use real containers | Catches real integration issues |
    | Isolate tests | Prevent test interference |
    | Clean up between tests | Consistent starting state |
    | Reuse Docker client | Faster container startup |
    | Run migrations in tests | Test schema changes |
    | Use fixtures for complex data | Consistent, readable tests |


    ---


    ## Running the Tests


    To run all integration tests:


    ```bash
    # Run all tests
    cargo test

    # Run specific tests
    cargo test test_create_user

    # Run with detailed output
    cargo test -- --nocapture

    # Run tests in parallel (default)
    cargo test -- --test-threads=4
    ```


    ---


    ## Performance Tips


    1. **Reuse Docker client**: Use `OnceLock` or `lazy_static` for singleton

    2. **Minimize migrations**: Run only necessary migrations

    3. **Use transactions for cleanup**: Faster than truncating tables

    4. **Cache Docker images**: CI/CD should cache images for faster startup

    5. **Smart parallelization**: Let each test have its own container


    ---


    ## Troubleshooting


    **Error: "Cannot connect to Docker daemon"**


    ```bash
    # Check if Docker is running
    docker ps

    # On Linux, add your user to docker group
    sudo usermod -aG docker $USER
    ```


    **Error: "Port already in use"**


    Testcontainers uses random ports automatically. If you see this error, it
    might be an old container:


    ```bash
    # Clean up old containers
    docker ps -a | grep testcontainers | awk '{print $1}' | xargs docker rm -f
    ```


    **Slow tests**


    If your tests are slow, consider:


    - Reusing containers between related tests

    - Using transactions instead of truncating tables

    - Caching Docker images locally

    - Disabling fsync in PostgreSQL for tests


    ---


    ## Conclusion


    Testcontainers transforms integration testing in Rust from a complex task
    into something simple and reliable. Using real Docker containers, you
    eliminate the need for complex mocks and catch issues that only appear in
    real environments.


    The initial setup may seem laborious, but the return in code confidence
    and maintainability is worth it. Your tests become living documentation of
    how your application interacts with external services.


    Start implementing tests for your most critical database operations and
    gradually expand to cover your entire API. Over time, you'll have a robust
    test suite that gives you confidence to refactor and add new features.


    ---


    **Additional resources:**


    - [Testcontainers Rust Documentation](https://github.com/testcontainers/testcontainers-rs)

    - [SQLx Book](https://github.com/launchbadge/sqlx)

    - [Axum Examples](https://github.com/tokio-rs/axum/tree/main/examples)

    - [Redis.rs Documentation](https://docs.rs/redis/)
---
