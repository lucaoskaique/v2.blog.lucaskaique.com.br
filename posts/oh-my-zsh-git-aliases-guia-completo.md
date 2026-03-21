---
pt-BR:
  layout: post
  date: 2026-03-21 00:00:00
  main-class: dev
  color: '#637a91'
  tags:
    - git
    - zsh
    - productivity
  title: Oh My Zsh Git Aliases - Guia Completo dos Atalhos Mais Usados
  description: Um guia completo dos aliases do plugin Git do Oh My Zsh para aumentar sua produtividade no terminal
  body: >

    Se você usa Git diariamente, sabe como alguns comandos podem ser
    repetitivos e longos. O plugin Git do Oh My Zsh oferece mais de 200
    aliases que transformam comandos extensos em atalhos de 2-4 caracteres,
    economizando tempo e aumentando significativamente sua produtividade.


    Neste post, vou mostrar os aliases mais comuns e úteis que você deve
    conhecer.


    ## Comandos Básicos


    Estes são os aliases fundamentais que você usará todos os dias:


    - `g` = `git`

    - `gst` = `git status`

    - `gss` = `git status --short`

    - `gsb` = `git status --short --branch`


    Em vez de digitar `git status` toda hora, basta usar `gst`. Simples assim!


    ## Add & Commit


    Atalhos para adicionar arquivos e fazer commits:


    - `ga` = `git add`

    - `gaa` = `git add --all`

    - `gc` = `git commit --verbose`

    - `gcmsg` = `git commit --message`

    - `gca` = `git commit --verbose --all`

    - `gcam` = `git commit --all --message`

    - `gca!` = `git commit --verbose --all --amend`


    **Exemplo prático:**


    ```bash
    # Forma tradicional
    git add --all
    git commit -m "feat: add new feature"

    # Com aliases
    gaa
    gcmsg "feat: add new feature"

    # Ou tudo de uma vez
    gcam "feat: add new feature"
    ```


    ## Operações com Branches


    Gerenciar branches fica muito mais rápido:


    - `gb` = `git branch`

    - `gba` = `git branch --all`

    - `gbd` = `git branch --delete`

    - `gco` = `git checkout`

    - `gcb` = `git checkout -b`

    - `gcm` = `git checkout $(git_main_branch)`

    - `gsw` = `git switch`

    - `gswc` = `git switch --create`


    **Dica:** O alias `gcm` automaticamente detecta se sua branch principal é
    `main`, `master` ou outro nome comum.


    ```bash
    # Criar e trocar para nova branch
    gcb feature/nova-funcionalidade

    # Voltar para main/master
    gcm

    # Deletar branch
    gbd feature/antiga
    ```


    ## Push & Pull


    Sincronização com repositórios remotos:


    - `gp` = `git push`

    - `gl` = `git pull`

    - `gpsup` = `git push --set-upstream origin $(git_current_branch)`

    - `ggpush` = `git push origin "$(git_current_branch)"`

    - `ggpull` = `git pull origin "$(git_current_branch)"`

    - `gpr` = `git pull --rebase`


    **Uso comum:**


    ```bash
    # Primeira vez fazendo push de uma nova branch
    gpsup

    # Push simples
    gp

    # Pull com rebase
    gpr
    ```


    ## Diff & Log


    Visualizar diferenças e histórico de commits:


    - `gd` = `git diff`

    - `gdca` = `git diff --cached`

    - `gds` = `git diff --staged`

    - `glo` = `git log --oneline --decorate`

    - `glog` = `git log --oneline --decorate --graph`

    - `glol` = `git log --graph --pretty=...` (com cores e datas)


    O alias `glol` é particularmente útil porque mostra um log colorido e
    formatado de forma legível:


    ```bash
    # Log simples
    glo

    # Log com grafo visual
    glog

    # Log detalhado e bonito
    glol
    ```


    ## Stash


    Gerenciar mudanças temporárias:


    - `gsta` = `git stash push`

    - `gstp` = `git stash pop`

    - `gstaa` = `git stash apply`

    - `gstl` = `git stash list`


    ```bash
    # Guardar mudanças temporariamente
    gsta

    # Ver lista de stashes
    gstl

    # Recuperar último stash
    gstp
    ```


    ## Outros Aliases Úteis


    Comandos adicionais que aumentam sua produtividade:


    - `gf` = `git fetch`

    - `gfa` = `git fetch --all --tags --prune`

    - `gm` = `git merge`

    - `grb` = `git rebase`

    - `grbi` = `git rebase --interactive`

    - `grt` = `cd "$(git rev-parse --show-toplevel)"` (ir para raiz do repo)


    O alias `grt` é especialmente útil quando você está em algum subdiretório
    do projeto e quer voltar rapidamente para a raiz.


    ## Como Começar a Usar


    Se você usa Oh My Zsh, o plugin Git já está habilitado por padrão. Caso
    contrário, adicione-o ao seu `.zshrc`:


    ```bash
    plugins=(git)
    ```


    ## Dicas Finais


    1. **Comece aos poucos**: Não tente memorizar todos os aliases de uma vez.
    Comece com os mais usados (gst, gaa, gcam, gp, gl)


    2. **Mantenha um cheatsheet**: Enquanto não memoriza, mantenha uma lista
    dos aliases que usa mais


    3. **Explore gradualmente**: À medida que se sentir confortável, incorpore
    novos aliases ao seu workflow


    4. **Consulte a lista completa**: O arquivo do plugin contém mais de 200
    aliases. Explore em
    `~/.oh-my-zsh/plugins/git/git.plugin.zsh`


    ## Conclusão


    Os aliases do plugin Git do Oh My Zsh podem parecer confusos no início,
    mas uma vez que você se acostuma, é difícil voltar a digitar os comandos
    completos. Eles economizam tempo, reduzem erros de digitação e tornam seu
    fluxo de trabalho com Git muito mais fluido.


    Comece incorporando alguns aliases no seu dia a dia e, em pouco tempo,
    você estará usando-os naturalmente. Sua produtividade agradece!


    ---


    **Recursos adicionais:**


    - [Plugin Git do Oh My Zsh](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/git)

    - [Documentação oficial do Oh My Zsh](https://github.com/ohmyzsh/ohmyzsh)
en:
  layout: post
  date: 2026-03-21 00:00:00
  main-class: dev
  color: '#637a91'
  tags:
    - git
    - zsh
    - productivity
  title: Oh My Zsh Git Aliases - Complete Guide to Most Used Shortcuts
  description: A complete guide to Oh My Zsh Git plugin aliases to boost your terminal productivity
  body: >

    If you use Git daily, you know how some commands can be repetitive and
    lengthy. The Oh My Zsh Git plugin offers over 200 aliases that transform
    extensive commands into 2-4 character shortcuts, saving time and
    significantly boosting your productivity.


    In this post, I'll show you the most common and useful aliases you should
    know.


    ## Basic Commands


    These are the fundamental aliases you'll use every day:


    - `g` = `git`

    - `gst` = `git status`

    - `gss` = `git status --short`

    - `gsb` = `git status --short --branch`


    Instead of typing `git status` all the time, just use `gst`. Simple as
    that!


    ## Add & Commit


    Shortcuts for adding files and making commits:


    - `ga` = `git add`

    - `gaa` = `git add --all`

    - `gc` = `git commit --verbose`

    - `gcmsg` = `git commit --message`

    - `gca` = `git commit --verbose --all`

    - `gcam` = `git commit --all --message`

    - `gca!` = `git commit --verbose --all --amend`


    **Practical example:**


    ```bash
    # Traditional way
    git add --all
    git commit -m "feat: add new feature"

    # With aliases
    gaa
    gcmsg "feat: add new feature"

    # Or all at once
    gcam "feat: add new feature"
    ```


    ## Branch Operations


    Managing branches becomes much faster:


    - `gb` = `git branch`

    - `gba` = `git branch --all`

    - `gbd` = `git branch --delete`

    - `gco` = `git checkout`

    - `gcb` = `git checkout -b`

    - `gcm` = `git checkout $(git_main_branch)`

    - `gsw` = `git switch`

    - `gswc` = `git switch --create`


    **Tip:** The `gcm` alias automatically detects if your main branch is
    `main`, `master`, or another common name.


    ```bash
    # Create and switch to new branch
    gcb feature/new-feature

    # Go back to main/master
    gcm

    # Delete branch
    gbd feature/old-feature
    ```


    ## Push & Pull


    Syncing with remote repositories:


    - `gp` = `git push`

    - `gl` = `git pull`

    - `gpsup` = `git push --set-upstream origin $(git_current_branch)`

    - `ggpush` = `git push origin "$(git_current_branch)"`

    - `ggpull` = `git pull origin "$(git_current_branch)"`

    - `gpr` = `git pull --rebase`


    **Common usage:**


    ```bash
    # First time pushing a new branch
    gpsup

    # Simple push
    gp

    # Pull with rebase
    gpr
    ```


    ## Diff & Log


    Viewing differences and commit history:


    - `gd` = `git diff`

    - `gdca` = `git diff --cached`

    - `gds` = `git diff --staged`

    - `glo` = `git log --oneline --decorate`

    - `glog` = `git log --oneline --decorate --graph`

    - `glol` = `git log --graph --pretty=...` (with colors and dates)


    The `glol` alias is particularly useful because it shows a colorful and
    readable formatted log:


    ```bash
    # Simple log
    glo

    # Log with visual graph
    glog

    # Detailed and beautiful log
    glol
    ```


    ## Stash


    Managing temporary changes:


    - `gsta` = `git stash push`

    - `gstp` = `git stash pop`

    - `gstaa` = `git stash apply`

    - `gstl` = `git stash list`


    ```bash
    # Store changes temporarily
    gsta

    # View stash list
    gstl

    # Recover last stash
    gstp
    ```


    ## Other Useful Aliases


    Additional commands that boost your productivity:


    - `gf` = `git fetch`

    - `gfa` = `git fetch --all --tags --prune`

    - `gm` = `git merge`

    - `grb` = `git rebase`

    - `grbi` = `git rebase --interactive`

    - `grt` = `cd "$(git rev-parse --show-toplevel)"` (go to repo root)


    The `grt` alias is especially useful when you're in some subdirectory of
    the project and want to quickly return to the root.


    ## How to Start Using


    If you use Oh My Zsh, the Git plugin is already enabled by default.
    Otherwise, add it to your `.zshrc`:


    ```bash
    plugins=(git)
    ```


    ## Final Tips


    1. **Start small**: Don't try to memorize all aliases at once. Start with
    the most used ones (gst, gaa, gcam, gp, gl)


    2. **Keep a cheatsheet**: While you don't memorize them, keep a list of
    the aliases you use most


    3. **Explore gradually**: As you feel comfortable, incorporate new aliases
    into your workflow


    4. **Check the complete list**: The plugin file contains over 200 aliases.
    Explore it at `~/.oh-my-zsh/plugins/git/git.plugin.zsh`


    ## Conclusion


    Oh My Zsh Git plugin aliases may seem confusing at first, but once you get
    used to them, it's hard to go back to typing the full commands. They save
    time, reduce typos, and make your Git workflow much smoother.


    Start incorporating some aliases into your daily routine and, in no time,
    you'll be using them naturally. Your productivity will thank you!


    ---


    **Additional resources:**


    - [Oh My Zsh Git Plugin](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/git)

    - [Oh My Zsh Official Documentation](https://github.com/ohmyzsh/ohmyzsh)
---
