---
pt-BR:
  title: "This Week in Rust 643"
  description: "Traducao em portugues da newsletter This Week in Rust 643"
  body: >-
    <p>Olá e bem-vindos a mais uma edição de <em>This Week in Rust</em>!
    <a href="https://www.rust-lang.org/">Rust</a> é uma linguagem de programação que capacita qualquer pessoa a criar software confiável e eficiente.
    Este é um resumo semanal do seu progresso e da comunidade.
    Quer algo mencionado? Marque a gente em
    <a href="https://bsky.app/profile/thisweekinrust.bsky.social">@thisweekinrust.bsky.social</a> no Bluesky ou
    <a href="https://mastodon.social/@thisweekinrust">@ThisWeekinRust</a> no mastodon.social, ou
    <a href="https://github.com/rust-lang/this-week-in-rust">nos envie um pull request</a>.
    Quer se envolver? <a href="https://github.com/rust-lang/rust/blob/main/CONTRIBUTING.md">Adoramos contribuições</a>.</p>
    <p><em>This Week in Rust</em> é desenvolvido abertamente <a href="https://github.com/rust-lang/this-week-in-rust">no GitHub</a> e os arquivos podem ser vistos em <a href="https://this-week-in-rust.org/">this-week-in-rust.org</a>.
    Se você encontrar algum erro na edição desta semana, <a href="https://github.com/rust-lang/this-week-in-rust/pulls">por favor envie um PR</a>.</p>
    <p>Quer receber o TWIR na sua caixa de entrada? <a href="https://this-week-in-rust.us11.list-manage.com/subscribe?u=fd84c1c757e02889a9b08d289&id=0ed8b72485">Inscreva-se aqui</a>.</p>
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
    <li><a href="https://blog.rust-lang.org/2026/03/12/Rustup-1.29.0/">Anunciando rustup 1.29.0</a></li>
    <li><a href="https://blog.rust-lang.org/2026/03/13/call-for-testing-build-dir-layout-v2/">Convite para testes: Build Dir Layout v2</a></li>
    </ul>
    <h3 id="newsletters"><a class="toclink" href="#newsletters">Newsletters</a></h3>
    <ul>
    <li><a href="https://www.theembeddedrustacean.com/p/the-embedded-rustacean-issue-67">The Embedded Rustacean Issue #67</a></li>
    <li><a href="https://rust-osdev.com/this-month/2026-02/">This Month in Rust OSDev: February 2026</a></li>
    </ul>
    <h3 id="projecttooling-updates"><a class="toclink" href="#projecttooling-updates">Atualizações de Projetos/Ferramentas</a></h3>
    <ul>
    <li><a href="https://blog.none.at/blog/2026/2026-03-01-loadgen-rs/">loadgen-rs - cliente de benchmark HTTP compatível com h2load escrito em Rust, com suporte a HTTP/1.1, HTTP/2 e HTTP/3 (QUIC)</a></li>
    <li><a href="https://kdwarn.net/programming/blog/227">Apresentando pgtui, um cliente TUI de Postgres</a></li>
    <li><a href="https://joonaa.dev/blog/12/avian-0-6">Avian Physics 0.6</a></li>
    <li><a href="https://vite.dev/blog/announcing-vite8">Vite 8.0 chegou!</a></li>
    <li><a href="https://aacebo.hashnode.dev/building-rust-procedural-macros-without-quote-introducing-zyn">Construindo Procedural Macros em Rust sem quote!: Apresentando zyn</a></li>
    <li><a href="https://github.com/isaacholt100/bnum/releases/tag/v0.14.0">bnum v0.14.0: muitas melhorias grandes!</a></li>
    <li><a href="https://runta.com/blog/introducing-clawshell/">ClawShell: Proteja o OpenClaw usando primitivas de nível de SO</a></li>
    <li><a href="https://github.com/bahdotsh/giff/releases/tag/v1.1.0">Giff v1.1.0: Uma UI de terminal para diffs do git com suporte a rebase interativo</a></li>
    <li><a href="https://github.com/bahdotsh/mdterm/releases/tag/v1.5.0">mdterm v1.5.0: Um navegador de Markdown baseado em terminal</a></li>
    <li><a href="https://flodl.dev/blog/impl-drop-for-tensor">flodl - Um framework de deep learning nativo em Rust construído sobre libtorch</a></li>
    <li><a href="https://mackow.ski/blog/cot-v06-lazy-underneath/">Cot v0.6: Lazy Underneath</a></li>
    </ul>
    <h3 id="observationsthoughts"><a class="toclink" href="#observationsthoughts">Observações/Reflexões</a></h3>
    <ul>
    <li><a href="https://nikomatsakis.github.io/rust-project-perspectives-on-ai/feb27-summary.html">Resumo - Rust Project Perspectives on AI</a></li>
    <li><a href="https://www.ralfj.de/blog/2026/03/13/inline-asm.html">Como usar storytelling para encaixar assembly inline no Rust</a></li>
    <li><a href="https://blog.yoshuawuyts.com/why-webassembly-components/">Por que componentes WebAssembly</a></li>
    <li><a href="https://iev.ee/blog/all-longest-regex-matches-in-linear-time/">sim, todos os matches mais longos de regex em tempo linear são possíveis</a></li>
    <li><a href="https://ferrous-systems.com/blog/hardware-access-rust/">Acessando Hardware em Rust</a></li>
    <li>[audio] <a href="https://netstack.fm/#episode-31">Netstack.FM episódio 31 — Protocol Shorts: MITM Proxies and Transparent L4 Interception</a></li>
    <li>[video] <a href="https://www.youtube.com/watch?v=qfKBv3A0CVs">Rust-powered SpacetimeDB is 1000x Faster? Founder Explains</a></li>
    </ul>
    <h3 id="rust-walkthroughs"><a class="toclink" href="#rust-walkthroughs">Guias de Rust</a></h3>
    <ul>
    <li><a href="https://kerkour.com/rust-docker-small-secure-images">Construindo imagens Docker pequenas e seguras para Rust: scratch vs alpine vs debian</a></li>
    <li><a href="https://blog.kerollmops.com/patching-lmdb-how-we-made-meilisearch-s-vector-store-333-faster">Patching LMDB: Como tornamos o Vector Store do Meilisearch 333% mais rápido</a></li>
    <li><a href="https://whoisryosuke.com/blog/2026/creating-a-daw-in-rust/">Criando um DAW em Rust - Tocando Áudio</a></li>
    <li><a href="https://barretts.club/posts/how-to-test-code-coverage-rust-2026/">Como verificar Code Coverage em Rust</a></li>
    <li>[video] <a href="https://www.youtube.com/watch?v=r-Ag_21CKBI">RustCurious lesson 4: Structs and Resources – Copy vs Clone vs Move</a></li>
    </ul>
    <h3 id="miscellaneous"><a class="toclink" href="#miscellaneous">Diversos</a></h3>
    <ul>
    <li><a href="https://tokio.rs/blog/2026-03-12-tokioconf-oss-tickets">Ingressos gratuitos da TokioConf para contribuidores e mantenedores de open source</a></li>
    </ul>
    <h2 id="crate-of-the-week"><a class="toclink" href="#crate-of-the-week">Crate da Semana</a></h2>
    <p>O crate desta semana é <a href="https://github.com/anwitars/grab">grab</a>, uma ferramenta de linha de comando para converter rapidamente CSV em JSON.</p>
    <p>Obrigado a <a href="https://users.rust-lang.org/t/crate-of-the-week/2704/1565">Gábor Maksa</a> pela auto-sugestão!</p>
    <p><a href="https://users.rust-lang.org/t/crate-of-the-week/2704">Por favor, envie suas sugestões e votos para a próxima semana</a>!</p>
    <h2 id="calls-for-testing"><a class="toclink" href="#calls-for-testing">Convites para Testes</a></h2>
    <p>Um passo importante para a implementação de RFCs é que as pessoas experimentem a
    implementação e deem feedback, especialmente antes da estabilização.</p>
    <p>Se você é um implementador de funcionalidades e gostaria que sua RFC aparecesse nesta lista, adicione um rótulo
    <code>call-for-testing</code> à sua RFC junto com um comentário fornecendo instruções de teste e/ou
    orientação sobre quais aspectos da funcionalidade precisam de testes.</p>
    <p><em>Nenhum convite para testes foi emitido esta semana por
    <a href="https://github.com/rust-lang/rust/issues?q=state%3Aopen%20label%3Acall-for-testing%20state%3Aopen">Rust</a>,
    <a href="https://github.com/rust-lang/cargo/issues?q=state%3Aopen%20label%3Acall-for-testing%20state%3Aopen">Cargo</a>,
    <a href="https://github.com/rust-lang/rustup/issues?q=state%3Aopen%20label%3Acall-for-testing%20state%3Aopen">Rustup</a> ou
    <a href="https://github.com/rust-lang/rfcs/issues?q=label%3Acall-for-testing%20state%3Aopen">Rust language RFCs</a>.</em></p>
    <p><a href="https://github.com/rust-lang/this-week-in-rust/issues">Avise-nos</a> se você gostaria que sua funcionalidade fosse acompanhada como parte desta lista.</p>
    <h2 id="call-for-participation-projects-and-speakers"><a class="toclink" href="#call-for-participation-projects-and-speakers">Convite à participação; projetos e palestrantes</a></h2>
    <h3 id="cfp-projects"><a class="toclink" href="#cfp-projects">CFP - Projetos</a></h3>
    <p>Sempre quis contribuir para projetos open-source, mas não sabia por onde começar?
    Toda semana destacamos algumas tarefas da comunidade Rust para você escolher e começar!</p>
    <p>Algumas dessas tarefas também podem ter mentores disponíveis; visite a página da tarefa para mais informações.</p>
    <!-- CFPs go here, use this format: * [project name - title of issue](URL to issue) -->
    <!-- * [ - ]() -->
    <!-- or if none - *No Calls for participation were submitted this week.* -->
    
    <p>Se você é dono de um projeto Rust e está procurando contribuidores, por favor envie tarefas <a href="https://github.com/rust-lang/this-week-in-rust?tab=readme-ov-file#call-for-participation-guidelines">aqui</a> ou por meio de um <a href="https://github.com/rust-lang/this-week-in-rust">PR para TWiR</a> ou entrando em contato no <a href="https://bsky.app/profile/thisweekinrust.bsky.social">Bluesky</a> ou <a href="https://mastodon.social/@thisweekinrust">Mastodon</a>!</p>
    <h3 id="cfp-events"><a class="toclink" href="#cfp-events">CFP - Eventos</a></h3>
    <p>Você é um palestrante novo ou experiente procurando um lugar para compartilhar algo legal? Esta seção destaca eventos que estão sendo planejados e aceitando submissões para participar como palestrante.</p>
    <!-- CFPs go here, use this format: * [**event name**](URL to CFP)| Date CFP closes in YYYY-MM-DD | city,state,country | Date of event in YYYY-MM-DD -->
    <!-- or if none - *No Calls for papers or presentations were submitted this week.* -->
    
    <ul>
    <li><a href="https://pretalx.com/oxidize-conference-2026-2025/cfp"><strong>Oxidize Conference</strong></a> | CFP aberto até 2026-03-23 | Berlin, Germany | 2026-09-14 - 2026-09-16</li>
    <li><a href="https://sessionize.com/eurorust-2026/"><strong>EuroRust</strong></a> | CFP aberto até 2026-04-27 | Barcelona, Spain | 2026-10-14 - 2026-10-17</li>
    <li><a href="https://pretalx.com/oxidize-conference-2026-2025/cfp"><strong>NDC Techtown 2026</strong></a> | CFP aberto até 2026-05-03 | Kongsberg, Norway | 2026-09-21 - 2026-09-24</li>
    </ul>
    <p>Se você é um organizador de evento esperando ampliar o alcance do seu evento, por favor envie um link para o site por meio de um <a href="https://github.com/rust-lang/this-week-in-rust">PR para TWiR</a> ou entrando em contato no <a href="https://bsky.app/profile/thisweekinrust.bsky.social">Bluesky</a> ou <a href="https://mastodon.social/@thisweekinrust">Mastodon</a>!</p>
    <h2 id="updates-from-the-rust-project"><a class="toclink" href="#updates-from-the-rust-project">Atualizações do Projeto Rust</a></h2>
    <p>427 pull requests foram <a href="https://github.com/search?q=is%3Apr+org%3Arust-lang+is%3Amerged+merged%3A2026-03-10..2026-03-17">mescladas na última semana</a></p>
    <h4 id="compiler"><a class="toclink" href="#compiler">Compiler</a></h4>
    <ul>
    <li><a href="https://github.com/rust-lang/rust/pull/153925">fornecer melhores sugestões para erros de inferência em <code>.collect()?</code></a></li>
    </ul>
    <h4 id="library"><a class="toclink" href="#library">Library</a></h4>
    <ul>
    <li><a href="https://github.com/rust-lang/rust/pull/146013">adicionar impls de <code>From</code> para tipos wrapper</a></li>
    <li><a href="https://github.com/rust-lang/rust/pull/148562">em <code>Option::get_or_insert_with()</code>, esquecer o <code>None</code> em vez de descartá-lo</a></li>
    <li><a href="https://github.com/rust-lang/rust/pull/152258">corrigido <code>VecDeque::splice()</code> não preenchendo o buffer corretamente ao redimensionar o buffer no intervalo start = end</a></li>
    </ul>
    <h4 id="cargo"><a class="toclink" href="#cargo">Cargo</a></h4>
    <ul>
    <li><a href="https://github.com/rust-lang/cargo/pull/16735"><code>CARGO_TARGET_DIR</code> não precisa ser relativo</a></li>
    <li><a href="https://github.com/rust-lang/cargo/pull/16730"><code>shell</code>: Suporte a progresso OSC 9;4 no ptyxis</a></li>
    <li><a href="https://github.com/rust-lang/cargo/pull/16725"><code>compile</code>: Parar ao negar warnings sem --keep-going</a></li>
    <li><a href="https://github.com/rust-lang/cargo/pull/16754">evitar panic para specs de pacote com fragmento vazio</a></li>
    <li><a href="https://github.com/rust-lang/cargo/pull/16728">util: excluir da sincronização do iCloud Drive no macOS</a></li>
    </ul>
    <h4 id="rustdoc"><a class="toclink" href="#rustdoc">Rustdoc</a></h4>
    <ul>
    <li><a href="https://github.com/rust-lang/rust/pull/153283"><code>rustdoc-json</code>: Adicionar suporte opcional à (de)serialização rkyv</a></li>
    </ul>
    <h4 id="clippy"><a class="toclink" href="#clippy">Clippy</a></h4>
    <ul>
    <li><a href="https://github.com/rust-lang/rust-clippy/pull/16701">corrigir falso positivo de <code>match_same_arms</code> com consts associadas</a></li>
    <li><a href="https://github.com/rust-lang/rust-clippy/pull/16656">corrigir: sugestão de <code>question_mark</code> causava erro</a></li>
    <li><a href="https://github.com/rust-lang/rust-clippy/pull/15889">refatorar implementação de <code>unnecessary_{option,result}_map_or_else</code></a></li>
    </ul>
    <h4 id="rust-analyzer"><a class="toclink" href="#rust-analyzer">Rust-Analyzer</a></h4>
    <ul>
    <li><a href="https://github.com/rust-lang/rust-analyzer/pull/21827">não disparar GC em testes lentos</a></li>
    <li><a href="https://github.com/rust-lang/rust-analyzer/pull/21828">geração de SCIP deve preparar caches em paralelo</a></li>
    <li><a href="https://github.com/rust-lang/rust-analyzer/pull/21794">adicionar validação de convenção de nomes para tipos <code>union</code></a></li>
    <li><a href="https://github.com/rust-lang/rust-analyzer/pull/21793">lidar com identificadores UTF-8 multi-byte em <code>NameGenerator::suggest_name</code></a></li>
    <li><a href="https://github.com/rust-lang/rust-analyzer/pull/21820">inferir args genéricos para trait ref e seu assoc type</a></li>
    <li><a href="https://github.com/rust-lang/rust-analyzer/pull/21784">remover colchetes angulares se todos os args de lifetime forem removidos no assist de code alias de tipo inline</a></li>
    <li><a href="https://github.com/rust-lang/rust-analyzer/pull/21826">substituir uso de make por SyntaxFactory em alguns métodos de utils de ide-assists</a></li>
    </ul>
    <h3 id="rust-compiler-performance-triage"><a class="toclink" href="#rust-compiler-performance-triage">Rust Compiler Performance Triage</a></h3>
    <p>Outra semana bastante tranquila, com poucas mudanças e desempenho geral neutro.</p>
    <p>Triage feito por <strong>@simulacrum</strong>.
    Intervalo de revisões: <a href="https://perf.rust-lang.org/?start=3945997aabf6165261ef3419534c1ad59d9dc5c6&end=5b61449ed85a670f1dd3fca6a8c759ee0b451b66&absolute=false&stat=instructions%3Au">3945997a..5b61449e</a></p>
    <p>1 Regressão, 1 Melhoria, 2 Mistas; 3 delas em rollups
    35 comparações de artefatos feitas no total</p>
    <p><a href="https://github.com/rust-lang/rustc-perf/blob/master/triage/2026/2026-03-16.md">Relatório completo aqui</a></p>
    <h3 id="approved-rfcs"><a class="toclink" href="#approved-rfcs"><a href="https://github.com/rust-lang/rfcs/commits/master">RFCs Aprovadas</a></a></h3>
    <p>Mudanças no Rust seguem o <a href="https://github.com/rust-lang/rfcs#rust-rfcs">processo de RFC (request for comments)</a> do Rust. Estas
    são as RFCs que foram aprovadas para implementação nesta semana:</p>
    <ul>
    <li><em>Nenhuma RFC foi aprovada esta semana.</em></li>
    </ul>
    <h3 id="final-comment-period"><a class="toclink" href="#final-comment-period">Período Final de Comentários</a></h3>
    <p>Toda semana, <a href="https://www.rust-lang.org/team.html">a equipe</a> anuncia o 'final comment period' para RFCs e PRs chave
    que estão chegando a uma decisão. Expresse suas opiniões agora.</p>
    <h4 id="tracking-issues-prs"><a class="toclink" href="#tracking-issues-prs">Tracking Issues & PRs</a></h4>
    <h5 id="rust"><a class="toclink" href="#rust"><a href="https://github.com/rust-lang/rust/issues?q=is%3Aopen%20label%3Afinal-comment-period%20sort%3Aupdated-desc%20state%3Aopen">Rust</a></a></h5>
    <ul>
    <li><a href="https://github.com/rust-lang/rust/issues/152763">Melhorias na formatação de match</a></li>
    <li><a href="https://github.com/rust-lang/rust/pull/152851">Corrigir lookup de host atrasado do SGX via ToSocketAddr</a></li>
    </ul>
    <h5 id="rust-rfcs"><a class="toclink" href="#rust-rfcs"><a href="https://github.com/rust-lang/rfcs/issues?q=state%3Aopen%20label%3Afinal-comment-period%20state%3Aopen">Rust RFCs</a></a></h5>
    <ul>
    <li><a href="https://github.com/rust-lang/rfcs/pull/3721">Adicionar RFC <code>homogeneous_try_blocks</code></a></li>
    </ul>
    <h5 id="compiler-team-mcps-only"><a class="toclink" href="#compiler-team-mcps-only"><a href="https://github.com/rust-lang/compiler-team/issues?q=label%3Amajor-change%20label%3Afinal-comment-period%20state%3Aopen">Compiler Team</a> <a href="https://forge.rust-lang.org/compiler/mcp.html">(apenas MCPs)</a></a></h5>
    <ul>
    <li><a href="https://github.com/rust-lang/compiler-team/issues/974">permitir <code>incomplete_features</code> em testes de UI</a></li>
    <li><a href="https://github.com/rust-lang/compiler-team/issues/975">Adicionar <code>-Zsanitizer=kernel-hwaddress</code></a></li>
    </ul>
    <h5 id="language-reference"><a class="toclink" href="#language-reference"><a href="https://github.com/rust-lang/reference/issues?q=is%3Aopen%20label%3Afinal-comment-period%20sort%3Aupdated-desc%20state%3Aopen">Language Reference</a></a></h5>
    <ul>
    <li><a href="https://github.com/rust-lang/reference/pull/2200">[type layout] usize e isize têm o mesmo tamanho e alinhamento</a></li>
    </ul>
    <h5 id="leadership-council"><a class="toclink" href="#leadership-council"><a href="https://github.com/rust-lang/leadership-council/issues?q=state%3Aopen%20label%3Afinal-comment-period%20state%3Aopen">Leadership Council</a></a></h5>
    <ul>
    <li><a href="https://github.com/rust-lang/leadership-council/issues/276">Discutir projeções de bolsas de viagem 2026</a></li>
    </ul>
    <p><em>Nenhum item entrou no Período Final de Comentários esta semana para
    <a href="https://github.com/rust-lang/cargo/issues?q=is%3Aopen%20label%3Afinal-comment-period%20sort%3Aupdated-desc%20state%3Aopen">Cargo</a>,
    <a href="https://github.com/rust-lang/lang-team/issues?q=is%3Aopen%20label%3Afinal-comment-period%20sort%3Aupdated-desc%20state%3Aopen">Language Team</a> ou
    <a href="https://github.com/rust-lang/unsafe-code-guidelines/issues?q=is%3Aopen%20label%3Afinal-comment-period%20sort%3Aupdated-desc%20state%3Aopen">Unsafe Code Guidelines</a>.</em></p>
    <p>Avise-nos se você gostaria que seus PRs, Tracking Issues ou RFCs fossem acompanhados como parte desta lista.</p>
    <h3 id="new-and-updated-rfcs"><a class="toclink" href="#new-and-updated-rfcs"><a href="https://github.com/rust-lang/rfcs/pulls">RFCs Novas e Atualizadas</a></a></h3>
    <ul>
    <li><a href="https://github.com/rust-lang/rfcs/pull/3927">Permissões para exclusão de crates</a></li>
    <li><a href="https://github.com/rust-lang/rfcs/pull/3928">Evitar lint de <code>unreachable_code</code> em <code>todo!()</code></a></li>
    <li><a href="https://github.com/rust-lang/rfcs/pull/3931">Propor o fundo Rust Foundation Maintainer</a></li>
    </ul>
    <h2 id="upcoming-events"><a class="toclink" href="#upcoming-events">Próximos Eventos</a></h2>
    <p>Eventos Rust entre 2026-03-18 - 2026-04-15 🦀</p>
    <h3 id="virtual"><a class="toclink" href="#virtual">Virtual</a></h3>
    <ul>
    <li>2026-03-18 | Hybrid (Vancouver, BC, CA) | <a href="https://www.meetup.com/vancouver-rust">Vancouver Rust</a><ul>
    <li><a href="https://www.meetup.com/vancouver-rust/events/313471716/"><strong>Embedded Rust</strong></a></li>
    </ul>
    </li>
    <li>2026-03-18 | Virtual (Cardiff, UK) | <a href="https://www.meetup.com/rust-and-c-plus-plus-in-cardiff">Rust and C++ Cardiff</a><ul>
    <li><a href="https://www.meetup.com/rust-and-c-plus-plus-in-cardiff/events/313621933/"><strong>Hybrid event with Rust Dortmund!</strong></a></li>
    </ul>
    </li>
    <li>2026-03-18 | Virtual (Girona, ES) | <a href="https://lu.ma/rust-girona">Rust Girona</a><ul>
    <li><a href="https://luma.com/45qqc2eo"><strong>Sessió setmanal de codificació / Weekly coding session</strong></a></li>
    </ul>
    </li>
    <li>2026-03-19 | Hybrid (Seattle, WA, US) | <a href="https://www.meetup.com/join-srug">Seattle Rust User Group</a><ul>
    <li><a href="https://www.meetup.com/seattle-rust-user-group/events/312274882/"><strong>March, 2026 SRUG (Seattle Rust User Group) Meetup</strong></a></li>
    </ul>
    </li>
    <li>2026-03-20 | Virtual | <a href="https://www.eventbrite.com/o/70306584013">Packt Publishing Limited</a><ul>
    <li><a href="https://www.eventbrite.com/e/rust-adoption-safety-and-cloud-with-francesco-ciulla-registration-1981847709850"><strong>Rust Adoption, Safety, and Cloud with Francesco Ciulla</strong></a></li>
    </ul>
    </li>
    <li>2026-03-24 | Virtual (Dallas, TX, US) | <a href="https://www.meetup.com/dallasrust">Dallas Rust User Meetup</a><ul>
    <li><a href="https://www.meetup.com/dallasrust/events/310254785/"><strong>Fourth Tuesday</strong></a></li>
    </ul>
    </li>
    <li>2026-03-24 | Virtual (London, UK) | <a href="https://www.meetup.com/women-in-rust">Women in Rust</a><ul>
    <li><a href="https://www.meetup.com/women-in-rust/events/312799496/"><strong>Lunch & Learn: Crates, Tips & Tricks Lightning Talks - Bring your ideas!</strong></a></li>
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
    <li><a href="https://luma.com/me4jwgxu"><strong>Sessió setmanal de codificació / Weekly coding session</strong></a></li>
    </ul>
    </li>
    <li>2026-04-01 | Virtual (Indianapolis, IN, US) | <a href="https://www.meetup.com/indyrs/events/">Indy Rust</a><ul>
    <li><a href="https://www.meetup.com/indyrs/events/313656388/"><strong>Indy.rs - with Social Distancing</strong></a></li>
    </ul>
    </li>
    <li>2026-04-02 | Virtual (Nürnberg, DE) | <a href="https://www.meetup.com/rust-noris">Rust Nuremberg</a><ul>
    <li><a href="https://www.meetup.com/rust-noris/events/313345237/"><strong>Rust Nürnberg online</strong></a></li>
    </ul>
    </li>
    <li>2026-04-04 | Virtual (Kampala, UG) | <a href="https://www.eventbrite.com/e/rust-circle-meetup-tickets-628763176587">Rust Circle Meetup</a><ul>
    <li><a href="https://www.eventbrite.com/e/rust-circle-meetup-tickets-628763176587"><strong>Rust Circle Meetup</strong></a></li>
    </ul>
    </li>
    <li>2026-04-09 | Virtual (Berlin, DE) | <a href="https://www.meetup.com/rust-berlin/events/">Rust Berlin</a><ul>
    <li><a href="https://www.meetup.com/rust-berlin/events/308455926/"><strong>Rust Hack and Learn</strong></a></li>
    </ul>
    </li>
    <li>2026-04-14 | Virtual (Dallas, TX, US) | <a href="https://www.meetup.com/dallasrust/events/">Dallas Rust User Meetup</a><ul>
    <li><a href="https://www.meetup.com/dallasrust/events/310254784/"><strong>Second Tuesday</strong></a></li>
    </ul>
    </li>
    <li>2026-04-14 | Virtual (London, GB) | <a href="https://www.meetup.com/women-in-rust/events/">Women in Rust</a><ul>
    <li><a href="https://www.meetup.com/women-in-rust/events/313506013/"><strong>👋 Community Catch Up</strong></a></li>
    </ul>
    </li>
    <li>2026-04-15 | Virtual (Vancouver, BC, CA) | <a href="https://www.meetup.com/vancouver-rust/events/">Vancouver Rust</a><ul>
    <li><a href="https://www.meetup.com/vancouver-rust/events/313471712/"><strong>Nushell</strong></a></li>
    </ul>
    </li>
    </ul>
    <h3 id="asia"><a class="toclink" href="#asia">Ásia</a></h3>
    <ul>
    <li>2026-03-19 | Seoul, KR | <a href="https://www.meetup.com/rust-seoul-meetup/events/">Seoul Rust (Programming Language) Meetup</a><ul>
    <li><a href="https://www.meetup.com/rust-seoul-meetup/events/313764176/"><strong>Seoul Rust Meetup</strong></a></li>
    </ul>
    </li>
    <li>2026-03-22 | Tel Aviv-yafo, IL | <a href="https://www.meetup.com/rust-tlv">Rust 🦀 TLV</a><ul>
    <li><a href="https://www.meetup.com/rust-tlv/events/312862609/"><strong>In person Rust March 2026 at AWS in Tel Aviv</strong></a></li>
    </ul>
    </li>
    <li>2026-03-28 | Delhi, IN | <a href="https://www.meetup.com/rustdelhi/events/">Rust Delhi</a><ul>
    <li><a href="https://www.meetup.com/rustdelhi/events/313777790/"><strong>Rust Delhi Meetup #13</strong></a></li>
    </ul>
    </li>
    </ul>
    <h3 id="europe"><a class="toclink" href="#europe">Europa</a></h3>
    <ul>
    <li>2026-03-18 | Dortmund, DE | <a href="https://www.meetup.com/rust-dortmund">Rust Dortmund</a><ul>
    <li><a href="https://www.meetup.com/rust-dortmund/events/313338784/"><strong>Rust Dortmund Meetup - Intro to Embedded Rust - March</strong></a></li>
    </ul>
    </li>
    <li>2026-03-19 - 2026-03-20 | Warsaw, PL | <a href="https://www.rustikon.dev/">Rustikon</a><ul>
    <li><a href="https://www.rustikon.dev/"><strong>Rustikon Conference</strong></a></li>
    </ul>
    </li>
    <li>2026-03-23 | Augsburg, DE | <a href="https://rust-augsburg.github.io/meetup">Rust Meetup Augsburg</a><ul>
    <li><a href="https://rust-augsburg.github.io/meetup/Meetup_18.html"><strong>Rust Meetup #18</strong>: Ludwig Weinzierl - Bevy: Spielentwicklung mit Rust</a></li>
    </ul>
    </li>
    <li>2026-03-23 | Amsterdam, NL | <a href="https://events.linuxfoundation.org/kubecon-cloudnativecon-europe/co-located-events/open-source-securitycon/">Open Source SecurityCon</a><ul>
    <li><a href="https://rustfoundation.org/event/open-source-securitycon-eu-2026/"><strong>Open Source SecurityCon EU 2026</strong></a></li>
    </ul>
    </li>
    <li>2026-03-24 | Aarhus, DK | <a href="https://www.meetup.com/rust-aarhus">Rust Aarhus</a><ul>
    <li><a href="https://www.meetup.com/rust-aarhus/events/313284304/"><strong>Hack Night - Advent of Code</strong></a></li>
    </ul>
    </li>
    <li>2026-03-24 | Manchester, UK | <a href="https://www.meetup.com/rust-manchester">Rust Manchester</a><ul>
    <li><a href="https://www.meetup.com/rust-manchester/events/313495449/"><strong>Rust Manchester March Code Night</strong></a></li>
    </ul>
    </li>
    <li>2026-03-24 | Trondheim, NO | <a href="https://www.meetup.com/rust-trondheim">Rust Trondheim</a><ul>
    <li><a href="https://www.meetup.com/rust-trondheim/events/313537618/"><strong>Rust projects - show and tell in March</strong></a></li>
    </ul>
    </li>
    <li>2026-03-25 | Dresden, DE | <a href="https://github.com/rust-dresden">Rust Dresden</a><ul>
    <li><a href="https://github.com/rust-dresden/rust-dresden/discussions/7"><strong>First Meetup</strong></a></li>
    </ul>
    </li>
    <li>2026-03-26 | Paris, FR | <a href="https://www.meetup.com/rust-paris">Rust Paris</a><ul>
    <li><a href="https://www.meetup.com/rust-paris/events/313646981/"><strong>Rust meetup #84</strong></a></li>
    </ul>
    </li>
    <li>2026-03-27 | Paris, FR | <a href="https://www.rustinparis.com/">Rust in Paris</a><ul>
    <li><a href="https://www.rustinparis.com/"><strong>Rust in Paris</strong></a></li>
    </ul>
    </li>
    <li>2026-03-28 | Stockholm, SE | <a href="https://www.meetup.com/stockholm-rust/events/">Stockholm Rust</a><ul>
    <li><a href="https://www.meetup.com/stockholm-rust/events/313749232/"><strong>Ferris' Fika Forum #25</strong></a></li>
    </ul>
    </li>
    <li>2026-04-01 | Berlin, DE | <a href="https://www.meetup.com/rust-berlin/events/">Rust Berlin</a><ul>
    <li><a href="https://www.meetup.com/rust-berlin/events/313783250/"><strong>Rust Berlin Talks: The next generation</strong></a></li>
    </ul>
    </li>
    <li>2026-04-01 | Oxford, UK | <a href="https://www.meetup.com/oxford-rust-meetup-group">Oxford ACCU/Rust Meetup.</a><ul>
    <li><a href="https://www.meetup.com/oxford-rust-meetup-group/events/312664491/"><strong>Rust/ACCU meetup.</strong></a></li>
    </ul>
    </li>
    <li>2026-04-02 | London, GB | <a href="https://www.meetup.com/rust-london-user-group/events/">Rust London User Group</a><ul>
    <li><a href="https://www.meetup.com/rust-london-user-group/events/313816694/"><strong>LDN Talks Spring Community Showcase</strong></a></li>
    </ul>
    </li>
    <li>2026-04-07 | Basel, CH | <a href="https://www.meetup.com/rust-basel/events/">Rust Basel</a><ul>
    <li><a href="https://www.meetup.com/rust-basel/events/313765547/"><strong>Rust Meetup #15 @ letsboot</strong></a></li>
    </ul>
    </li>
    <li>2026-04-09 | Geneva, CH | <a href="https://www.posttenebraslab.ch/wiki/events/start">Rust Meetup Geneva</a><ul>
    <li><a href="https://www.posttenebraslab.ch/wiki/events/monthly_meeting/rust_meetup"><strong>Rust Meetup Geneva</strong></a></li>
    </ul>
    </li>
    <li>2026-04-09 | Oslo, NO | <a href="https://www.meetup.com/rust-oslo/events/">Rust Oslo</a><ul>
    <li><a href="https://www.meetup.com/rust-oslo/events/313806765/"><strong>Rust talks @ AutoStore – "Patterns for Event Driven Systems" and "Rust + WASM"</strong></a></li>
    </ul>
    </li>
    </ul>
    <h3 id="north-america"><a class="toclink" href="#north-america">América do Norte</a></h3>
    <ul>
    <li>2026-03-18 | Hybrid (Vancouver, BC, CA) | <a href="https://www.meetup.com/vancouver-rust">Vancouver Rust</a><ul>
    <li><a href="https://www.meetup.com/vancouver-rust/events/313471716/"><strong>Embedded Rust</strong></a></li>
    </ul>
    </li>
    <li>2026-03-19 | Hybrid (Seattle, WA, US) | <a href="https://www.meetup.com/join-srug">Seattle Rust User Group</a><ul>
    <li><a href="https://www.meetup.com/seattle-rust-user-group/events/312274882/"><strong>March, 2026 SRUG (Seattle Rust User Group) Meetup</strong></a></li>
    </ul>
    </li>
    <li>2026-03-19 | Mountain View, CA, US | <a href="https://www.meetup.com/hackerdojo/events/">Hacker Dojo</a><ul>
    <li><a href="https://www.meetup.com/hackerdojo/events/313569258/"><strong>RUST MEETUP at HACKER DOJO</strong></a></li>
    </ul>
    </li>
    <li>2026-03-19 | Nashville, TN, US | <a href="https://www.meetup.com/music-city-rust-developers">Music City Rust Developers</a><ul>
    <li><a href="https://www.meetup.com/music-city-rust-developers/events/313576317/"><strong>Applied Rust - Building Rust Applictions</strong></a></li>
    </ul>
    </li>
    <li>2026-03-19 | New York, NY, US | <a href="https://www.meetup.com/rust-nyc">Rust NYC</a><ul>
    <li><a href="https://www.meetup.com/rust-nyc/events/313639707/"><strong>Rust NYC: Social Interoperability - Rust, C++ and The Greater Good</strong></a></li>
    </ul>
    </li>
    <li>2026-03-21 | Boston, MA, US | <a href="https://www.meetup.com/bostonrust">Boston Rust Meetup</a><ul>
    <li><a href="https://www.meetup.com/bostonrust/events/313208597/"><strong>Porter Square Rust Lunch, Mar 21</strong></a></li>
    </ul>
    </li>
    <li>2026-03-25 | Austin, TX, US | <a href="https://www.meetup.com/rust-atx">Rust ATX</a><ul>
    <li><a href="https://www.meetup.com/rust-atx/events/313653030/"><strong>Rust Lunch - Fareground</strong></a></li>
    </ul>
    </li>
    <li>2026-03-25 | New York, NY, US | <a href="https://www.meetup.com/rust-nyc">Rust NYC</a><ul>
    <li><a href="https://www.meetup.com/rust-nyc/events/313713085/"><strong>Rust NYC's Digital Asset Adoption Special</strong></a></li>
    </ul>
    </li>
    <li>2026-03-26 | Atlanta, GA, US | <a href="https://www.meetup.com/rust-atl">Rust Atlanta</a><ul>
    <li><a href="https://www.meetup.com/rust-atl/events/311228658/"><strong>Rust-Atl</strong></a></li>
    </ul>
    </li>
    <li>2026-04-02 | Saint Louis, MO, US | <a href="https://www.meetup.com/stl-rust">STL Rust</a><ul>
    <li><a href="https://www.meetup.com/stl-rust/events/313482094/"><strong>SIUE Cruft Crawler with LLM</strong></a></li>
    </ul>
    </li>
    <li>2026-04-09 | San Diego, CA, US | <a href="https://www.meetup.com/san-diego-rust/events/">San Diego Rust</a><ul>
    <li><a href="https://www.meetup.com/san-diego-rust/events/313721879/"><strong>San Diego Rust April Meetup - Back in person!</strong></a></li>
    </ul>
    </li>
    <li>2026-04-14 | Charlottesville, VA, US | <a href="https://www.meetup.com/charlottesville-rust-meetup/events/">Charlottesville Rust Meetup</a><ul>
    <li><a href="https://www.meetup.com/charlottesville-rust-meetup/events/313262215/"><strong>Sharpening Your Rust Skills for Job Interviews</strong></a></li>
    </ul>
    </li>
    </ul>
    <h3 id="oceania"><a class="toclink" href="#oceania">Oceania</a></h3>
    <ul>
    <li>2026-03-26 | Melbourne, AU | <a href="https://www.meetup.com/rust-melbourne">Rust Melbourne</a><ul>
    <li><a href="https://www.meetup.com/rust-melbourne/events/313471749/"><strong>TBD March Meetup</strong></a></li>
    </ul>
    </li>
    </ul>
    <h3 id="south-america"><a class="toclink" href="#south-america">América do Sul</a></h3>
    <ul>
    <li>2026-03-21 | São Paulo, BR | <a href="https://www.meetup.com/rust-sao-paulo-meetup">Rust São Paulo Meetup</a><ul>
    <li><a href="https://www.meetup.com/rust-sao-paulo-meetup/events/313446400/"><strong>Encontro do Rust-SP (migrado pro Lumma)</strong></a></li>
    </ul>
    </li>
    <li>2026-04-11 | Argentina, AR | <a href="https://luma.com/user/oxidar">Oxidar Org</a><ul>
    <li><a href="https://luma.com/5f51ey45"><strong>Oxidar.org Hackaton - Snakear - ¡Veni a hackear con Rust!</strong></a></li>
    </ul>
    </li>
    </ul>
    <p>Se você estiver organizando um evento Rust, por favor adicione-o ao <a href="https://www.google.com/calendar/embed?src=apd9vmbc22egenmtu5l6c5jbfc%40group.calendar.google.com">calendário</a> para que
    ele seja mencionado aqui. Lembre-se de adicionar um link para o evento também.
    Envie um email para a <a href="mailto:community-team@rust-lang.org">Rust Community Team</a> para obter acesso.</p>
    <h2 id="jobs"><a class="toclink" href="#jobs">Vagas</a></h2>
    <p>Por favor veja a última <a href="https://www.reddit.com/r/rust/comments/1rmra27/official_rrust_whos_hiring_thread_for_jobseekers/">thread Who's Hiring no r/rust</a></p>
    <h1 id="quote-of-the-week"><a class="toclink" href="#quote-of-the-week">Citação da Semana</a></h1>
    <blockquote>
    <p>O que construímos coletivamente, além dos artefatos de código que são o compilador+ferramentas, é um grupo de pessoas que voltam, que aprendem, que compartilham seu entendimento, que alinham seus gostos, que recebem input da comunidade, etc etc. Mesclar um PR gerado por LLM alimenta apenas a parte de “temos código que funciona” do Projeto; não está participando de todos os outros ciclos de feedback que mantêm o projeto vivo.</p>
    </blockquote>
    <p>– <a href="https://nikomatsakis.github.io/rust-project-perspectives-on-ai/feb27-summary.html#codebases-are-more-than-code">Nadrieril on the Rust Project Perspectives on AI</a></p>
    <p>Apesar de mais uma semana sem uma sugestão, llogiq está satisfeito com sua escolha.</p>
    <p><a href="https://users.rust-lang.org/t/twir-quote-of-the-week/328">Por favor envie citações e vote para a próxima semana!</a></p>
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
    <p><small><a href="https://www.reddit.com/r/rust/comments/1rxlv3m/this_week_in_rust_643/">Discuta no r/rust</a></small></p>
    
    ---
    
    *Artigo original: [https://this-week-in-rust.org/blog/2026/03/18/this-week-in-rust-643/](https://this-week-in-rust.org/blog/2026/03/18/this-week-in-rust-643/)*
    
    *Traduzido automaticamente por IA. Para sugestoes de melhorias, abra uma issue no repositorio.*
  date: 2026-03-18 01:00:00
  image: /images/ESSA-SEMANA-COM-RUST-FINAL.png
  main-class: rust
  color: "#CE422B"
  tags:
    - rust
    - newsletter
    - this-week-in-rust
    - traducao
en:
  title: "This Week in Rust 643"
  description: "Original newsletter link"
  body: >-
    *Original post: [https://this-week-in-rust.org/blog/2026/03/18/this-week-in-rust-643/](https://this-week-in-rust.org/blog/2026/03/18/this-week-in-rust-643/)*
---
