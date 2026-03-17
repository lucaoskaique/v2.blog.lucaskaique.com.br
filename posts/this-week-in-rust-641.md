---
pt-BR:
  title: "This Week in Rust 641"
  description: "Traducao em portugues da newsletter This Week in Rust 641"
  body: >-
    <p>Olá e bem-vindo a mais uma edição do <em>This Week in Rust</em>!
    <a href="https://www.rust-lang.org/">Rust</a> é uma linguagem de programação que capacita todos a construir software confiável e eficiente.
    Este é um resumo semanal de seu progresso e comunidade.
    Quer algo mencionado? Marque-nos em
    <a href="https://bsky.app/profile/thisweekinrust.bsky.social">@thisweekinrust.bsky.social</a> no Bluesky ou
    <a href="https://mastodon.social/@thisweekinrust">@ThisWeekinRust</a> no mastodon.social, ou
    <a href="https://github.com/rust-lang/this-week-in-rust">envie-nos um pull request</a>.
    Quer se envolver? <a href="https://github.com/rust-lang/rust/blob/main/CONTRIBUTING.md">Adoramos contribuições</a>.</p>
    <p><em>This Week in Rust</em> é desenvolvido abertamente <a href="https://github.com/rust-lang/this-week-in-rust">no GitHub</a> e os arquivos podem ser visualizados em <a href="https://this-week-in-rust.org/">this-week-in-rust.org</a>.
    Se você encontrar algum erro na edição desta semana, <a href="https://github.com/rust-lang/this-week-in-rust/pulls">por favor envie um PR</a>.</p>
    <p>Quer TWIR na sua caixa de entrada? <a href="https://this-week-in-rust.us11.list-manage.com/subscribe?u=fd84c1c757e02889a9b08d289&id=0ed8b72485">Inscreva-se aqui</a>.</p>
    <h2 id="updates-from-rust-community"><a class="toclink" href="#updates-from-rust-community">Atualizações da Comunidade Rust</a></h2>
    <!--
    
    Dear community contributors:
    Please read README.md for guidance on submissions.
    Each submitted link should be of the form:
    
    * [Title of the linked Page](https://example.com/my_article)
    
    If you add a link to a non-text content please prefix it with `[video]` or `[audio]`:
    
    * [video] [Title of the linked video](https://example.com/my_video_article)
    * [audio] [Title of the linked audio file](https://example.com/my_podcast)
    
    If you don't know which category to use, feel free to submit a PR anyway
    and just ask the editors to select the category.
    
    -->
    
    <h3 id="official"><a class="toclink" href="#official">Oficial</a></h3>
    <ul>
    <li><a href="https://blog.rust-lang.org/2026/03/02/2025-State-Of-Rust-Survey-results/">Resultados da Pesquisa State of Rust 2025</a></li>
    </ul>
    <h3 id="newsletters"><a class="toclink" href="#newsletters">Newsletters</a></h3>
    <ul>
    <li><a href="https://www.theembeddedrustacean.com/p/the-embedded-rustacean-issue-66">The Embedded Rustacean Edição #66</a></li>
    </ul>
    <h3 id="projecttooling-updates"><a class="toclink" href="#projecttooling-updates">Atualizações de Projetos/Ferramentas</a></h3>
    <ul>
    <li><a href="https://pker.xyz/posts/compendium-ebpf">Compendium: Adicionando eBPF para Visibilidade em Nível de Kernel</a></li>
    <li><a href="https://dev-state.com/posts/migrate_danube_etcd_to_raft/">Migração do Danube Messaging do ETCD</a> </li>
    <li><a href="https://github.com/bahdotsh/feedr/releases/tag/v0.4.0">Feedr v0.4.0 - Leitor de feeds RSS baseado em terminal</a></li>
    <li><a href="https://www.reymom.xyz/blog/rust/2026-03-03-exec_dag-official-release">dag_exec: Executor DAG para pipelines pesados em CPU</a></li>
    <li><a href="https://contextgeneric.dev/blog/v0.7.0-release/">Turbine funções Rust com argumentos implícitos usando CGP v0.7.0</a></li>
    <li><a href="https://dev.to/lowjax/i-built-a-tool-that-lets-ai-agents-browse-the-real-internet-and-you-can-watch-them-do-it-2fff">vscreen: navegador de agentes de IA</a></li>
    <li><a href="https://plyx.iz.rs/blog/introducing-ply/">Ply 1.0: Construir aplicativos em Rust não deveria ser tão difícil</a></li>
    </ul>
    <h3 id="observationsthoughts"><a class="toclink" href="#observationsthoughts">Observações/Reflexões</a></h3>
    <ul>
    <li><a href="https://kerkour.com/rust-postgres-everything">Usando Rust e Postgres para tudo: padrões aprendidos ao longo dos anos</a></li>
    <li><a href="https://vertexclique.com/blog/kovan-from-prod-to-mr/">Kovan: De Sistemas MVCC de Produção para Recuperação de Memória Wait-Free</a></li>
    <li><a href="https://jacko.io/snooze.html">Nunca pause uma future</a></li>
    <li><a href="https://turbopuffer.com/blog/zero-cost">Abstrações de custo zero do Rust vs. SIMD</a></li>
    <li><a href="https://www.feldera.com/blog/nobody-ever-got-fired-for-using-a-struct">Ninguém nunca foi demitido por usar uma struct</a></li>
    <li><a href="https://notes.8pit.net/notes/iqfs.html">Depurando Problemas de Reprodutibilidade em Software Rust</a></li>
    <li><a href="https://www.reymom.xyz/blog/rust/2026-02-21-backpressure-in-parallel-executor">Projetando Backpressure em um Executor DAG Paralelo</a></li>
    <li><a href="https://www.reymom.xyz/blog/rust/2026-02-24-testing-invariants-atomics">Testando Invariantes de Concorrência em um Executor Paralelo</a></li>
    <li>[audio] <a href="https://netstack.fm/#episode-29">Netstack.FM episódio 29 — Hyper Com Sean McArthur (Ep 2 Remasterizado)</a></li>
    </ul>
    <h3 id="rust-walkthroughs"><a class="toclink" href="#rust-walkthroughs">Tutoriais de Rust</a></h3>
    <ul>
    <li><a href="https://www.sea-ql.org/blog/2026-02-28-sea-orm-sync/">Tutorial: vamos fazer um Pi Spigot retomável com SQLite</a></li>
    <li><a href="https://iggy.apache.org/blogs/2026/02/27/thread-per-core-io_uring/">Jornada de migração do Apache Iggy para arquitetura thread-per-core alimentada por io_uring</a></li>
    <li><a href="https://antithesis.com/blog/2026/rust_formal_methods/">Métodos formais para o lado inseguro da Força</a></li>
    <li><a href="https://gendx.dev/blog/2026/03/02/swiss-marriage-tax.html">Quantificando o imposto de casamento suíço</a></li>
    <li><a href="https://hackeryarn.com/post/fast-python-with-rust/">Python rápido com Rust: uma abordagem orientada a dados</a></li>
    <li>[video] <a href="https://artificialworlds.net/blog/2026/02/27/wasm-game/">Rust: compilando para WASM para fazer um jogo baseado em navegador usando canvas</a></li>
    <li>[video] <a href="https://youtu.be/rgjTPBRae6I">Entrevista com Daniel Almeida, Escrevendo um Driver de Kernel GPU Linux em Rust</a></li>
    </ul>
    <h3 id="miscellaneous"><a class="toclink" href="#miscellaneous">Diversos</a></h3>
    <ul>
    <li><a href="https://tokio.rs/blog/2026-03-03-tokioconf-update">Atualização do TokioConf: O Que Esperar</a></li>
    </ul>
    <h2 id="crate-of-the-week"><a class="toclink" href="#crate-of-the-week">Crate da Semana</a></h2>
    <p>O crate desta semana é <a href="https://github.com/developer0hye/office2pdf">office2pdf</a>, uma biblioteca ou binário autônomo para gerar PDF a partir de arquivos OOXML (docx, xlsx, etc.).</p>
    <p>Obrigado a <a href="https://users.rust-lang.org/t/crate-of-the-week/2704/1562">One</a> pela sugestão!</p>
    <p><a href="https://users.rust-lang.org/t/crate-of-the-week/2704">Por favor, envie suas sugestões e votos para a próxima semana</a>!</p>
    <h2 id="calls-for-testing"><a class="toclink" href="#calls-for-testing">Chamadas para Testes</a></h2>
    <p>Um passo importante para a implementação de RFCs é que as pessoas experimentem a implementação e forneçam feedback, especialmente antes da estabilização.</p>
    <p>Se você é um implementador de recursos e gostaria que seu RFC aparecesse nesta lista, adicione uma etiqueta <code>call-for-testing</code> ao seu RFC junto com um comentário fornecendo instruções de teste e/ou orientação sobre qual(is) aspecto(s) do recurso precisa(m) de testes.</p>
    <p><em>Nenhuma chamada para testes foi emitida esta semana por
    <a href="https://github.com/rust-lang/rust/issues?q=state%3Aopen%20label%3Acall-for-testing%20state%3Aopen">Rust</a>,
    <a href="https://github.com/rust-lang/cargo/issues?q=state%3Aopen%20label%3Acall-for-testing%20state%3Aopen">Cargo</a>,
    <a href="https://github.com/rust-lang/rustup/issues?q=state%3Aopen%20label%3Acall-for-testing%20state%3Aopen">Rustup</a> ou
    <a href="https://github.com/rust-lang/rfcs/issues?q=label%3Acall-for-testing%20state%3Aopen">RFCs da linguagem Rust</a>.</em></p>
    <p><a href="https://github.com/rust-lang/this-week-in-rust/issues">Avise-nos</a> se você gostaria que seu recurso fosse rastreado como parte desta lista.</p>
    <h2 id="call-for-participation-projects-and-speakers"><a class="toclink" href="#call-for-participation-projects-and-speakers">Chamada para Participação; projetos e palestrantes</a></h2>
    <h3 id="cfp-projects"><a class="toclink" href="#cfp-projects">CFP - Projetos</a></h3>
    <p>Sempre quis contribuir para projetos de código aberto mas não sabia por onde começar?
    Toda semana destacamos algumas tarefas da comunidade Rust para você escolher e começar!</p>
    <p>Algumas dessas tarefas também podem ter mentores disponíveis, visite a página da tarefa para mais informações.</p>
    <!-- CFPs go here, use this format: * [project name - title of issue](URL to issue) -->
    <!-- * [ - ]() -->
    <p><em>Nenhuma chamada para participação foi enviada esta semana.</em></p>
    <p>Se você é um proprietário de projeto Rust e está procurando por contribuidores, por favor envie tarefas <a href="https://github.com/rust-lang/this-week-in-rust?tab=readme-ov-file#call-for-participation-guidelines">aqui</a> ou através de um <a href="https://github.com/rust-lang/this-week-in-rust">PR para TWiR</a> ou entrando em contato no <a href="https://bsky.app/profile/thisweekinrust.bsky.social">Bluesky</a> ou <a href="https://mastodon.social/@thisweekinrust">Mastodon</a>!</p>
    <h3 id="cfp-events"><a class="toclink" href="#cfp-events">CFP - Eventos</a></h3>
    <p>Você é um palestrante novo ou experiente procurando um lugar para compartilhar algo legal? Esta seção destaca eventos que estão sendo planejados e aceitam submissões para participar como palestrante.</p>
    <!-- CFPs go here, use this format: * [**event name**](URL to CFP)| Date CFP closes in YYYY-MM-DD | city,state,country | Date of event in YYYY-MM-DD -->
    <!-- or if none - *No Calls for papers or presentations were submitted this week.* -->
    
    <ul>
    <li><a href="https://hasgeek.com/rustbangalore/cfp-rust-india-conference-2026/"><strong>Rust India Conference 2026</strong></a> | CFP aberto até 2026-03-14 | Bangalore, IN | 2026-04-18</li>
    <li><a href="https://pretalx.com/oxidize-conference-2026-2025/cfp"><strong>Oxidize Conference</strong></a> | CFP aberto até 2026-03-23 | Berlim, Alemanha | 2026-09-14 - 2026-09-16</li>
    <li><a href="https://sessionize.com/eurorust-2026/"><strong>EuroRust</strong></a> | CFP aberto até 2026-04-27 | Barcelona, Espanha | 2026-10-14 - 2026-10-17</li>
    </ul>
    <p>Se você é um organizador de eventos esperando expandir o alcance do seu evento, por favor envie um link para o site através de um <a href="https://github.com/rust-lang/this-week-in-rust">PR para TWiR</a> ou entrando em contato no <a href="https://bsky.app/profile/thisweekinrust.bsky.social">Bluesky</a> ou <a href="https://mastodon.social/@thisweekinrust">Mastodon</a>!</p>
    <h2 id="updates-from-the-rust-project"><a class="toclink" href="#updates-from-the-rust-project">Atualizações do Projeto Rust</a></h2>
    <p>414 pull requests foram <a href="https://github.com/search?q=is%3Apr+org%3Arust-lang+is%3Amerged+merged%3A2026-02-24..2026-03-03">mesclados na última semana</a></p>
    <h4 id="compiler"><a class="toclink" href="#compiler">Compilador</a></h4>
    <ul>
    <li><a href="https://github.com/rust-lang/rust/pull/153122">melhora as funções de forçamento/promoção em <code>DepKindVTable</code></a></li>
    <li><a href="https://github.com/rust-lang/rust/pull/152864">codegen: Restaura <code>noundef</code> em Args <code>PassMode::Cast</code> na ABI Rust</a></li>
    </ul>
    <h4 id="library"><a class="toclink" href="#library">Biblioteca</a></h4>
    <ul>
    <li><a href="https://github.com/rust-lang/rust/pull/152418"><code>BTreeMap::merge</code> otimizado</a></li>
    <li><a href="https://github.com/rust-lang/rust/pull/153015">torna primitivos atômicos aliases de tipo de <code>Atomic<T></code></a></li>
    <li><a href="https://github.com/rust-lang/rust/pull/152176">caminho rápido neon para <code>str::contains</code></a></li>
    <li><a href="https://github.com/rust-lang/rust/pull/152702">prepara <code>NonNull</code> para tipos de padrão</a></li>
    <li><a href="https://github.com/rust-lang/rust/pull/153157">adiciona novamente <code>#[inline]</code> a <code>Eq::assert_fields_are_eq</code></a></li>
    <li><a href="https://github.com/rust-lang/rust/pull/152304">estabiliza novo tipo <code>RangeToInclusive</code></a></li>
    </ul>
    <h4 id="cargo"><a class="toclink" href="#cargo">Cargo</a></h4>
    <ul>
    <li><a href="https://github.com/rust-lang/cargo/pull/16678">corrige: Injeta uma edição em scripts</a></li>
    <li><a href="https://github.com/rust-lang/cargo/pull/16432">ajuda: exibe página de manual para comandos aninhados</a></li>
    <li><a href="https://github.com/rust-lang/cargo/pull/16674">host-config: corrige pânico ao compilar cruzadamente com host-config</a></li>
    <li><a href="https://github.com/rust-lang/cargo/pull/16653">toml: mostra rust-version necessária em erro de edição instável</a></li>
    <li><a href="https://github.com/rust-lang/cargo/pull/16669">melhora mensagem de erro de busca de workspace pai</a></li>
    </ul>
    <h4 id="clippy"><a class="toclink" href="#clippy">Clippy</a></h4>
    <ul>
    <li><a href="https://github.com/rust-lang/rust-clippy/pull/16628">corrige <code>cmp_owned</code> sugere incorretamente em <code>PathBuf</code></a></li>
    <li><a href="https://github.com/rust-lang/rust-clippy/pull/16647">corrige falso positivo de <code>explicit_counter_loop</code> quando o inicializador não é integral</a></li>
    <li><a href="https://github.com/rust-lang/rust-clippy/pull/16625">corrige falso negativo de <code>suboptimal_flops</code> em atribuições de adição e subtração</a></li>
    <li><a href="https://github.com/rust-lang/rust-clippy/pull/16597">lida com pânicos do core em todos os lints de formato</a></li>
    </ul>
    <h4 id="rust-analyzer"><a class="toclink" href="#rust-analyzer">Rust-Analyzer</a></h4>
    <ul>
    <li><a href="https://github.com/rust-lang/rust-analyzer/pull/21699">detecta E0804 quando conversão de ptr bruto para dyn adiciona auto traits</a></li>
    <li><a href="https://github.com/rust-lang/rust-analyzer/pull/21708">não entra em pânico em notificações LSP inválidas</a></li>
    <li><a href="https://github.com/rust-lang/rust-analyzer/pull/21698">corrige indentação de expr scrutinee para <code>replace_if_let_with_match</code></a></li>
    <li><a href="https://github.com/rust-lang/rust-analyzer/pull/21706">não completa qualificador de variante <code>enum</code> em pat</a></li>
    <li><a href="https://github.com/rust-lang/rust-analyzer/pull/21654">usa <code>ExprIsRead::Yes</code> para rhs de operadores binários</a></li>
    <li><a href="https://github.com/rust-lang/rust-analyzer/pull/21669">implementa <code>Span::SpanParent</code> para proc-macro-srv</a></li>
    </ul>
    <h3 id="rust-compiler-performance-triage"><a class="toclink" href="#rust-compiler-performance-triage">Triagem de Performance do Compilador Rust</a></h3>
    <p>Uma semana positiva com algumas melhorias agradáveis vindas de limpezas do sistema de consultas.</p>
    <p>Triagem feita por <strong>@panstromek</strong>.
    Intervalo de revisão: <a href="https://perf.rust-lang.org/?start=eeb94be79adc9df7a09ad0b2421f16e60e6d932c&end=ddd36bd57051f796850345b76c17e9402e28a9e4&absolute=false&stat=instructions%3Au">eeb94be7..ddd36bd5</a></p>
    <p><strong>Resumo</strong>:</p>
    <table>
    <thead>
    <tr>
    <th align="center">(instructions:u)</th>
    <th align="center">média</th>
    <th align="center">intervalo</th>
    <th align="center">contagem</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td align="center">Regressões ❌ <br /> (primário)</td>
    <td align="center">0.3%</td>
    <td align="center">[0.3%, 0.3%]</td>
    <td align="center">1</td>
    </tr>
    <tr>
    <td align="center">Regressões ❌ <br /> (secundário)</td>
    <td align="center">0.2%</td>
    <td align="center">[0.0%, 0.3%]</td>
    <td align="center">3</td>
    </tr>
    <tr>
    <td align="center">Melhorias ✅ <br /> (primário)</td>
    <td align="center">-0.8%</td>
    <td align="center">[-2.1%, -0.1%]</td>
    <td align="center">141</td>
    </tr>
    <tr>
    <td align="center">Melhorias ✅ <br /> (secundário)</td>
    <td align="center">-1.1%</td>
    <td align="center">[-6.6%, -0.1%]</td>
    <td align="center">90</td>
    </tr>
    <tr>
    <td align="center">Todos ❌✅ (primário)</td>
    <td align="center">-0.8%</td>
    <td align="center">[-2.1%, 0.3%]</td>
    <td align="center">142</td>
    </tr>
    </tbody>
    </table>
    <p>2 Regressões, 5 Melhorias, 5 Mistos; 4 deles em rollups
    30 comparações de artefatos feitas no total</p>
    <p><a href="https://github.com/rust-lang/rustc-perf/blob/06a788cbc715e02d77e998eefe5ad6d20bf95855/triage/2026/2026-03-02.md">Relatório completo aqui</a></p>
    <h3 id="approved-rfcs"><a class="toclink" href="#approved-rfcs"><a href="https://github.com/rust-lang/rfcs/commits/master">RFCs Aprovados</a></a></h3>
    <p>Mudanças no Rust seguem o <a href="https://github.com/rust-lang/rfcs#rust-rfcs">processo RFC (request for comments) do Rust</a>. Estes são os RFCs que foram aprovados para implementação esta semana:</p>
    <ul>
    <li><em>Nenhum RFC foi aprovado esta semana.</em></li>
    </ul>
    <h3 id="final-comment-period"><a class="toclink" href="#final-comment-period">Período de Comentário Final</a></h3>
    <p>Toda semana, <a href="https://www.rust-lang.org/team.html">a equipe</a> anuncia o 'período de comentário final' para RFCs e PRs importantes que estão chegando a uma decisão. Expresse suas opiniões agora.</p>
    <h4 id="tracking-issues-prs"><a class="toclink" href="#tracking-issues-prs">Tracking Issues & PRs</a></h4>
    <h5 id="rust"><a class="toclink" href="#rust"><a href="https://github.com/rust-lang/rust/issues?q=is%3Aopen%20label%3Afinal-comment-period%20sort%3Aupdated-desc%20state%3Aopen">Rust</a></a></h5>
    <ul>
    <li><a href="https://github.com/rust-lang/rust/pull/152931">Sempre verifica <code>ConstArgHasType</code> mesmo quando ignorando de outra forma</a></li>
    <li><a href="https://github.com/rust-lang/rust/pull/147834">Sempre torna elementos de tupla um local de coerção</a></li>
    <li><a href="https://github.com/rust-lang/rust/pull/152853">negar por padrão & reportar em deps <code>uninhabited_static</code></a></li>
    <li><a href="https://github.com/rust-lang/rust/issues/152761">Nunca quebrar entre parênteses vazios</a></li>
    </ul>
    <h5 id="compiler-team-mcps-only"><a class="toclink" href="#compiler-team-mcps-only"><a href="https://github.com/rust-lang/compiler-team/issues?q=label%3Amajor-change%20label%3Afinal-comment-period%20state%3Aopen">Compiler Team</a> <a href="https://forge.rust-lang.org/compiler/mcp.html">(MCPs apenas)</a></a></h5>
    <ul>
    <li><a href="https://github.com/rust-lang/compiler-team/issues/972">Remover soft_unstable</a></li>
    <li><a href="https://github.com/rust-lang/compiler-team/issues/945">Analisar palavras-chave instáveis para sintaxe experimental</a></li>
    </ul>
    <h5 id="language-reference"><a class="toclink" href="#language-reference"><a href="https://github.com/rust-lang/reference/issues?q=is%3Aopen%20label%3Afinal-comment-period%20sort%3Aupdated-desc%20state%3Aopen">Language Reference</a></a></h5>
    <ul>
    <li><a href="https://github.com/rust-lang/rfcs/pull/3855">Aplicação de mitigação</a></li>
    </ul>
    <p><em>Nenhum item entrou no Período de Comentário Final esta semana para
    <a href="https://github.com/rust-lang/rfcs/issues?q=state%3Aopen%20label%3Afinal-comment-period%20state%3Aopen">RFCs do Rust</a>,
    <a href="https://github.com/rust-lang/cargo/issues?q=is%3Aopen%20label%3Afinal-comment-period%20sort%3Aupdated-desc%20state%3Aopen">Cargo</a>,
    <a href="https://github.com/rust-lang/lang-team/issues?q=is%3Aopen%20label%3Afinal-comment-period%20sort%3Aupdated-desc%20state%3Aopen">Language Team</a>,
    <a href="https://github.com/rust-lang/leadership-council/issues?q=state%3Aopen%20label%3Afinal-comment-period%20state%3Aopen">Leadership Council</a> ou
    <a href="https://github.com/rust-lang/unsafe-code-guidelines/issues?q=is%3Aopen%20label%3Afinal-comment-period%20sort%3Aupdated-desc%20state%3Aopen">Unsafe Code Guidelines</a>.</em></p>
    <p>Avise-nos se você gostaria que seus PRs, Tracking Issues ou RFCs fossem rastreados como parte desta lista.</p>
    <h3 id="new-and-updated-rfcs"><a class="toclink" href="#new-and-updated-rfcs"><a href="https://github.com/rust-lang/rfcs/pulls">RFCs Novos e Atualizados</a></a></h3>
    <ul>
    <li><em>Nenhum RFC novo ou atualizado foi criado esta semana.</em></li>
    </ul>
    <h2 id="upcoming-events"><a class="toclink" href="#upcoming-events">Próximos Eventos</a></h2>
    <p>Eventos Rust entre 2026-03-04 - 2026-04-01 🦀</p>
    <h3 id="virtual"><a class="toclink" href="#virtual">Virtual</a></h3>
    <ul>
    <li>2026-03-04 | Virtual (Cardiff, UK) | <a href="https://www.meetup.com/rust-and-c-plus-plus-in-cardiff">Rust and C++ Cardiff</a><ul>
    <li><a href="https://www.meetup.com/rust-and-c-plus-plus-in-cardiff/events/313526020/"><strong>Começando com Rust Parte 4: Manipulação de Módulos em um Projeto</strong></a></li>
    </ul>
    </li>
    <li>2026-03-04 | Virtual (Indianapolis, IN, US) | <a href="https://www.meetup.com/indyrs">Indy Rust</a><ul>
    <li><a href="https://www.meetup.com/indyrs/events/313303094/"><strong>Indy.rs - com Distanciamento Social</strong></a></li>
    </ul>
    </li>
    <li>2026-03-05 | Virtual (Charlottesville, VA, US) | <a href="https://www.meetup.com/charlottesville-rust-meetup">Charlottesville Rust Meetup</a><ul>
    <li><a href="https://www.meetup.com/charlottesville-rust-meetup/events/313264830/"><strong>Apresentação: Tock OS Parte #3 - Cápsulas e drivers de hardware de nível inferior</strong></a></li>
    </ul>
    </li>
    <li>2026-03-05 | Virtual (Nürnberg, DE) | <a href="https://www.meetup.com/rust-noris">Rust Nuremberg</a><ul>
    <li><a href="https://www.meetup.com/rust-noris/events/313293173/"><strong>Rust Nürnberg online</strong></a></li>
    </ul>
    </li>
    <li>2026-03-07 | Virtual (Kampala, UG) | <a href="https://www.eventbrite.com/o/rust-circle-kampala-65249289033">Rust Circle Meetup</a><ul>
    <li><a href="https://www.eventbrite.com/e/rust-circle-meetup-tickets-628763908777"><strong>Rust Circle Meetup</strong></a></li>
    </ul>
    </li>
    <li>2026-03-10 | Virtual (Dallas, TX, US) | <a href="https://www.meetup.com/dallasrust">Dallas Rust User Meetup</a><ul>
    <li><a href="https://www.meetup.com/dallasrust/events/310254786/"><strong>Segunda Terça-feira</strong></a></li>
    </ul>
    </li>
    <li>2026-03-10 | Virtual (London, UK) | <a href="https://www.meetup.com/women-in-rust">Women in Rust</a><ul>
    <li><a href="https://www.meetup.com/women-in-rust/events/312799450/"><strong>👋 Reunião da Comunidade</strong></a></li>
    </ul>
    </li>
    <li>2026-03-11 | Virtual (Girona, ES) | <a href="https://lu.ma/rust-girona">Rust Girona</a><ul>
    <li><a href="https://luma.com/cgzfpzcp"><strong>Sessió setmanal de codificació / Sessão semanal de codificação</strong></a></li>
    </ul>
    </li>
    <li>2026-03-12 | Virtual (Berlin, DE) | <a href="https://www.meetup.com/rust-berlin">Rust Berlin</a><ul>
    <li><a href="https://www.meetup.com/rust-berlin/events/308455924/"><strong>Rust Hack and Learn</strong></a></li>
    </ul>
    </li>
    <li>2026-03-17 | Virtual (Washington, DC, US) | <a href="https://www.meetup.com/rustdc">Rust DC</a><ul>
    <li><a href="https://www.meetup.com/rustdc/events/313490537/"><strong>Rustful de Meio do Mês</strong></a></li>
    </ul>
    </li>
    <li>2026-03-18 | Híbrido (Vancouver, BC, CA) | <a href="https://www.meetup.com/vancouver-rust">Vancouver Rust</a><ul>
    <li><a href="https://www.meetup.com/vancouver-rust/events/313471716/"><strong>Embedded Rust</strong></a></li>
    </ul>
    </li>
    <li>2026-03-18 | Virtual (Cardiff, UK) | <a href="https://www.meetup.com/rust-and-c-plus-plus-in-cardiff">Rust and C++ Cardiff</a><ul>
    <li><a href="https://www.meetup.com/rust-and-c-plus-plus-in-cardiff/events/313621933/"><strong>Evento híbrido com Rust Dortmund!</strong></a></li>
    </ul>
    </li>
    <li>2026-03-18 | Virtual (Girona, ES) | <a href="https://lu.ma/rust-girona">Rust Girona</a><ul>
    <li><a href="https://luma.com/45qqc2eo"><strong>Sessió setmanal de codificació / Sessão semanal de codificação</strong></a></li>
    </ul>
    </li>
    <li>2026-03-19 | Híbrido (Seattle, WA, US) | <a href="https://www.meetup.com/join-srug">Seattle Rust User Group</a><ul>
    <li><a href="https://www.meetup.com/seattle-rust-user-group/events/312274882/"><strong>Meetup SRUG (Seattle Rust User Group) de Março de 2026</strong></a></li>
    </ul>
    </li>
    <li>2026-03-20 | Virtual | <a href="https://www.eventbrite.com/o/70306584013">Packt Publishing Limited</a><ul>
    <li><a href="https://www.eventbrite.com/e/rust-adoption-safety-and-cloud-with-francesco-ciulla-registration-1981847709850"><strong>Adoção de Rust, Segurança e Nuvem com Francesco Ciulla</strong></a></li>
    </ul>
    </li>
    <li>2026-03-24 | Virtual (Dallas, TX, US) | <a href="https://www.meetup.com/dallasrust">Dallas Rust User Meetup</a><ul>
    <li><a href="https://www.meetup.com/dallasrust/events/310254785/"><strong>Quarta Terça-feira</strong></a></li>
    </ul>
    </li>
    <li>2026-03-24 | Virtual (London, UK) | <a href="https://www.meetup.com/women-in-rust">Women in Rust</a><ul>
    <li><a href="https://www.meetup.com/women-in-rust/events/312799496/"><strong>Almoço & Aprendizado: Crates, Dicas & Truques Lightning Talks - Traga suas ideias!</strong></a></li>
    </ul>
    </li>
    <li>2026-03-25 | Virtual (Girona, ES) | <a href="https://lu.ma/rust-girona">Rust Girona</a><ul>
    <li><a href="https://luma.com/vq9w8q0w"><strong>Rust Girona Hack & Learn 03 2026</strong></a></li>
    </ul>
    </li>
    <li>2026-03-26 | Virtual (Berlin, DE) | <a href="https://www.meetup.com/rust-berlin">Rust Berlin</a><ul>
    <li><a href="https://www.meetup.com/rust-berlin/events/308455925/"><strong>Rust Hack and Learn</strong></a></li>
    </ul>
    </li>
    <li>2026-04-01 | Virtual (Girona, ES) | <a href="https://lu.ma/rust-girona">Rust Girona</a><ul>
    <li><a href="https://luma.com/me4jwgxu"><strong>Sessió setmanal de codificació / Sessão semanal de codificação</strong></a></li>
    </ul>
    </li>
    <li>2026-04-01 | Virtual (Indianapolis, IN, US) | <a href="https://www.meetup.com/indyrs">Indy Rust</a><ul>
    <li><a href="https://www.meetup.com/indyrs/events/wqzhftyjcgbcb/"><strong>Indy.rs - com Distanciamento Social</strong></a></li>
    </ul>
    </li>
    </ul>
    <h3 id="asia"><a class="toclink" href="#asia">Ásia</a></h3>
    <ul>
    <li>2026-03-22 | Tel Aviv-yafo, IL | <a href="https://www.meetup.com/rust-tlv">Rust 🦀 TLV</a><ul>
    <li><a href="https://www.meetup.com/rust-tlv/events/312862609/"><strong>Rust presencial de Março 2026 na AWS em Tel Aviv</strong></a></li>
    </ul>
    </li>
    </ul>
    <h3 id="europe"><a class="toclink" href="#europe">Europa</a></h3>
    <ul>
    <li>2026-03-04 | Barcelona, ES | <a href="https://www.meetup.com/bcnrust">BcnRust</a><ul>
    <li><a href="https://www.meetup.com/bcnrust/events/313263086/"><strong>Rust no MWC Talent Arena — Workshops + Meetup da Comunidade</strong></a></li>
    </ul>
    </li>
    <li>2026-03-04 | Hamburg, DE | <a href="https://www.meetup.com/rust-meetup-hamburg">Rust Meetup Hamburg</a><ul>
    <li><a href="https://www.meetup.com/rust-meetup-hamburg/events/311942636/"><strong>Rust Hack & Learn Março 2026</strong></a></li>
    </ul>
    </li>
    <li>2026-03-04 | Köln, DE | <a href="https://www.meetup.com/rust-cologne-bonn">Rust Cologne</a><ul>
    <li><a href="https://www.meetup.com/rustcologne/events/313532986/"><strong>Rust em Março: Abstrações, mas a que custo?</strong></a></li>
    </ul>
    </li>
    <li>2026-03-04 | Oxford, UK | <a href="https://www.meetup.com/oxford-rust-meetup-group">Oxford ACCU/Rust Meetup.</a><ul>
    <li><a href="https://www.meetup.com/oxford-rust-meetup-group/events/312664488/"><strong>Records, Shredded on Ice: Uma Introdução ao Parquet e Iceberg</strong></a></li>
    </ul>
    </li>
    <li>2026-03-04 | Paris, FR | <a href="https://www.meetup.com/rust-paris">Rust Paris</a><ul>
    <li><a href="https://www.meetup.com/rust-paris/events/313493454/"><strong>Rust meetup #83</strong></a></li>
    </ul>
    </li>
    <li>2026-03-05 | Oslo, NO | <a href="https://www.meetup.com/rust-oslo">Rust Oslo</a><ul>
    <li><a href="https://www.meetup.com/rust-oslo/events/313464558/"><strong>Rust Hack'n'Learn no Kampen Bistro</strong></a></li>
    </ul>
    </li>
    <li>2026-03-11 | Amsterdam, NL | <a href="https://www.meetup.com/rust-amsterdam-group">Rust Developers Amsterdam Group</a><ul>
    <li><a href="https://www.meetup.com/rust-amsterdam-group/events/313426708/"><strong>Meetup @ Instruqt</strong></a></li>
    </ul>
    </li>
    <li>2026-03-11 | Frankfurt, DE | <a href="https://www.meetup.com/rust-rhein-main">Rust Rhein-Main</a><ul>
    <li><a href="https://www.meetup.com/rust-rhein-main/events/313617138/"><strong>Escrevendo um compilador Python em Rust</strong></a></li>
    </ul>
    </li>
    <li>2026-03-12 | Bern, CH | <a href="https://www.meetup.com/rust-bern">Rust Bern</a><ul>
    <li><a href="https://www.meetup.com/rust-bern/events/313443248/"><strong>2026 Rust Talks Bern #1 @bespinian</strong></a></li>
    </ul>
    </li>
    <li>2026-03-12 | Geneva, CH | <a href="https://www.posttenebraslab.ch/">Post Tenebras Lab</a><ul>
    <li><a href="https://www.posttenebraslab.ch/wiki/events/monthly_meeting/rust_meetup"><strong>Rust Meetup Geneva</strong></a></li>
    </ul>
    </li>
    <li>2026-03-18 | Dortmund, DE | <a href="https://www.meetup.com/rust-dortmund">Rust Dortmund</a><ul>
    <li><a href="https://www.meetup.com/rust-dortmund/events/313338784/"><strong>Meetup Rust Dortmund - Introdução ao Embedded Rust - Março</strong></a></li>
    </ul>
    </li>
    <li>2026-03-19 - 2026-03-20 | Warsaw, PL | <a href="https://www.rustikon.dev/">Rustikon</a><ul>
    <li><a href="https://www.rustikon.dev/"><strong>Conferência Rustikon</strong></a></li>
    </ul>
    </li>
    <li>2026-03-24 | Aarhus, DK | <a href="https://www.meetup.com/rust-aarhus">Rust Aarhus</a><ul>
    <li><a href="https://www.meetup.com/rust-aarhus/events/313284304/"><strong>Noite de Hack - Advent of Code</strong></a></li>
    </ul>
    </li>
    <li>2026-03-24 | Manchester, UK | <a href="https://www.meetup.com/rust-manchester">Rust Manchester</a><ul>
    <li><a href="https://www.meetup.com/rust-manchester/events/313495449/"><strong>Noite de Código Rust Manchester de Março</strong></a></li>
    </ul>
    </li>
    <li>2026-03-27 | Paris, FR | <a href="https://www.rustinparis.com/">Rust in Paris</a><ul>
    <li><a href="https://www.rustinparis.com/"><strong>Rust in Paris</strong></a></li>
    </ul>
    </li>
    <li>2026-04-01 | Oxford, UK | <a href="https://www.meetup.com/oxford-rust-meetup-group">Oxford ACCU/Rust Meetup.</a><ul>
    <li><a href="https://www.meetup.com/oxford-rust-meetup-group/events/312664491/"><strong>Meetup Rust/ACCU.</strong></a></li>
    </ul>
    </li>
    </ul>
    <h3 id="north-america"><a class="toclink" href="#north-america">América do Norte</a></h3>
    <ul>
    <li>2026-03-04 | New York, NY, US | <a href="https://www.meetup.com/rust-nyc">Rust NYC</a><ul>
    <li><a href="https://www.meetup.com/rust-nyc/events/313499010/"><strong>Rust NYC: Coletor de Métricas Personalizado & Embedded Rust!</strong></a></li>
    </ul>
    </li>
    <li>2026-03-05 | Chicago, IL, US | <a href="https://www.meetup.com/chicago-rust-meetup">Chicago Rust Meetup</a><ul>
    <li><a href="https://www.meetup.com/chicago-rust-meetup/events/313529755/"><strong>Rust Happy Hour</strong></a></li>
    </ul>
    </li>
    <li>2026-03-05 | Mountain View, CA, US | <a href="https://www.meetup.com/hackerdojo/events/">Hacker Dojo</a><ul>
    <li><a href="https://www.meetup.com/hackerdojo/events/313305800/"><strong>RUST MEETUP no HACKER DOJO</strong></a></li>
    </ul>
    </li>
    <li>2026-03-05 | Saint Louis, MO, US | <a href="https://www.meetup.com/stl-rust">STL Rust</a><ul>
    <li><a href="https://www.meetup.com/stl-rust/events/312654992/"><strong>Noite de Projeto Rust</strong></a></li>
    </ul>
    </li>
    <li>2026-03-07 | Boston, MA, US | <a href="https://www.meetup.com/bostonrust">Boston Rust Meetup</a><ul>
    <li><a href="https://www.meetup.com/bostonrust/events/313208584/"><strong>Almoço Rust no MIT, 7 de Março</strong></a></li>
    </ul>
    </li>
    <li>2026-03-12 | Lehi, UT, US | <a href="https://www.meetup.com/utah-rust">Utah Rust</a><ul>
    <li><a href="https://www.meetup.com/utah-rust/events/313506767/"><strong>Um Interpretador para teoria da Computabilidade, Escrito da Forma Difícil</strong></a></li>
    </ul>
    </li>
    <li>2026-03-14 | Boston, MA, US | <a href="https://www.meetup.com/bostonrust">Boston Rust Meetup</a><ul>
    <li><a href="https://www.meetup.com/bostonrust/events/313208587/"><strong>Almoço Rust no North End, 14 de Março</strong></a></li>
    </ul>
    </li>
    <li>2026-03-17 | San Francisco, CA, US | <a href="https://www.meetup.com/san-francisco-rust-study-group">San Francisco Rust Study Group</a><ul>
    <li><a href="https://www.meetup.com/san-francisco-rust-study-group/events/313404095/"><strong>Hacking em Rust Presencialmente</strong></a></li>
    </ul>
    </li>
    <li>2026-03-18 | Híbrido (Vancouver, BC, CA) | <a href="https://www.meetup.com/vancouver-rust">Vancouver Rust</a><ul>
    <li><a href="https://www.meetup.com/vancouver-rust/events/313471716/"><strong>Embedded Rust</strong></a></li>
    </ul>
    </li>
    <li>2026-03-19 | Híbrido (Seattle, WA, US) | <a href="https://www.meetup.com/join-srug">Seattle Rust User Group</a><ul>
    <li><a href="https://www.meetup.com/seattle-rust-user-group/events/312274882/"><strong>Meetup SRUG (Seattle Rust User Group) de Março de 2026</strong></a></li>
    </ul>
    </li>
    <li>2026-03-19 | Nashville, TN, US | <a href="https://www.meetup.com/music-city-rust-developers">Music City Rust Developers</a><ul>
    <li><a href="https://www.meetup.com/music-city-rust-developers/events/313576317/"><strong>Rust Aplicado - Construindo Aplicações Rust</strong></a></li>
    </ul>
    </li>
    <li>2026-03-21 | Boston, MA, US | <a href="https://www.meetup.com/bostonrust">Boston Rust Meetup</a><ul>
    <li><a href="https://www.meetup.com/bostonrust/events/313208597/"><strong>Almoço Rust na Porter Square, 21 de Março</strong></a></li>
    </ul>
    </li>
    <li>2026-03-25 | Austin, TX, US | <a href="https://www.meetup.com/rust-atx">Rust ATX</a><ul>
    <li><a href="https://www.meetup.com/rust-atx/events/xvkdgtyjcfbhc/"><strong>Almoço Rust - Fareground</strong></a></li>
    </ul>
    </li>
    <li>2026-03-26 | Atlanta, GA, US | <a href="https://www.meetup.com/rust-atl">Rust Atlanta</a><ul>
    <li><a href="https://www.meetup.com/rust-atl/events/311228658/"><strong>Rust-Atl</strong></a></li>
    </ul>
    </li>
    </ul>
    <h3 id="oceania"><a class="toclink" href="#oceania">Oceania</a></h3>
    <ul>
    <li>2026-03-12 | Brisbane City, AU | <a href="https://www.meetup.com/rust-brisbane">Rust Brisbane</a><ul>
    <li><a href="https://www.meetup.com/rust-brisbane/events/313596218/"><strong>Rust Brisbane Mar 2026</strong></a></li>
    </ul>
    </li>
    <li>2026-03-26 | Melbourne, AU | <a href="https://www.meetup.com/rust-melbourne">Rust Melbourne</a><ul>
    <li><a href="https://www.meetup.com/rust-melbourne/events/313471749/"><strong>Meetup de Março TBD</strong></a></li>
    </ul>
    </li>
    </ul>
    <h3 id="south-america"><a class="toclink" href="#south-america">América do Sul</a></h3>
    <ul>
    <li>2026-03-21 | São Paulo, BR | <a href="https://www.meetup.com/rust-sao-paulo-meetup">Rust São Paulo Meetup</a><ul>
    <li><a href="https://www.meetup.com/rust-sao-paulo-meetup/events/313446400/"><strong>Encontro do Rust-SP (migrado pro Lumma)</strong></a></li>
    </ul>
    </li>
    </ul>
    <p>Se você está organizando um evento Rust, por favor adicione-o ao <a href="https://www.google.com/calendar/embed?src=apd9vmbc22egenmtu5l6c5jbfc%40group.calendar.google.com">calendário</a> para que seja mencionado aqui. Por favor, lembre-se de adicionar um link para o evento também.
    Envie um email para a <a href="mailto:community-team@rust-lang.org">Equipe da Comunidade Rust</a> para obter acesso.</p>
    <h2 id="jobs"><a class="toclink" href="#jobs">Empregos</a></h2>
    <p>Por favor, veja a última <a href="https://www.reddit.com/r/rust/comments/1qkkqi9/official_rrust_whos_hiring_thread_for_jobseekers/">thread Who's Hiring no r/rust</a></p>
    <h1 id="quote-of-the-week"><a class="toclink" href="#quote-of-the-week">Citação da Semana</a></h1>
    <blockquote>
    <p>Afinal, Rust só se tornou tão bom quanto é passando por uma transformação bastante drástica. Em um momento teve um GC e Green Threads, notoriamente. Não há substituto para fazer existir e ver como funciona em um problema real.</p>
    </blockquote>
    <p>– <a href="https://users.rust-lang.org/t/aliased-xor-mutable-core-for-a-high-level-language/138482/22">scottmcm no rust-users</a></p>
    <p>Obrigado a <a href="https://users.rust-lang.org/t/twir-quote-of-the-week/328/1755">Jonas Fassbender</a> pela sugestão!</p>
    <p><a href="https://users.rust-lang.org/t/twir-quote-of-the-week/328">Por favor, envie citações e vote para a próxima semana!</a></p>
    <p>This Week in Rust é editado por:</p>
    <ul>
    <li><a href="https://github.com/nellshamrell">nellshamrell</a></li>
    <li><a href="https://github.com/llogiq">llogiq</a></li>
    <li><a href="https://github.com/ericseppanen">ericseppanen</a></li>
    <li><a href="https://github.com/extrawurst">extrawurst</a></li>
    <li><a href="https://github.com/U007D">U007D</a></li>
    <li><a href="https://github.com/mariannegoldin">mariannegoldin</a></li>
    <li><a href="https://github.com/bdillo">bdillo</a></li>
    <li><a href="https://github.com/opeolluwa">opeolluwa</a></li>
    <li><a href="https://github.com/bnchi">bnchi</a></li>
    <li><a href="https://github.com/KannanPalani57">KannanPalani57</a></li>
    <li><a href="https://github.com/tzilist">tzilist</a></li>
    </ul>
    <p><em>A hospedagem da lista de emails é patrocinada pela <a href="https://foundation.rust-lang.org/">The Rust Foundation</a></em></p>
    <p><small><a href="https://www.reddit.com/r/rust/comments/1rm06mx/this_week_in_rust_641/">Discuta no r/rust</a></small></p>
    
    ---
    
    *Artigo original: [https://this-week-in-rust.org/blog/2026/03/04/this-week-in-rust-641/](https://this-week-in-rust.org/blog/2026/03/04/this-week-in-rust-641/)*
    
    *Traduzido automaticamente por IA. Para sugestoes de melhorias, abra uma issue no repositorio.*
  date: 2026-03-04 05:00:00
  image: /images/ESSA-SEMANA-COM-RUST-FINAL.png
  main-class: rust
  color: "#CE422B"
  tags:
    - rust
    - newsletter
    - this-week-in-rust
    - traducao
en:
  title: "This Week in Rust 641"
  description: "Original newsletter link"
  body: >-
    *Original post: [https://this-week-in-rust.org/blog/2026/03/04/this-week-in-rust-641/](https://this-week-in-rust.org/blog/2026/03/04/this-week-in-rust-641/)*
---
