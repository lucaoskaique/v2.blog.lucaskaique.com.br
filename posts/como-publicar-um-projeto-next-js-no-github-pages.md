---
layout: post
date: 2024-02-25 01:22:43
title: "Como publicar um projeto Next.js no Github Pages "
description: "Neste artigo, vou te orientar no processo de publicação de um
  projeto Next.js no Github Pages "
main-class: js
color: "#D6BA32"
tags:
  - nextjs
  - react
  - deploy
  - github
---

## Neste artigo, vou te orientar no processo de publicação de um projeto Next.js no Github Pages .

Eu trabalho no [Dev em Dobro](https://www.instagram.com/devemdobro/), uma Edtech cuja missão é ajudar devs iniciantes a se sentirem menos perdidos quando começam a aprender programação. Pensando nisso, frequentemente organizamos eventos gratuitos onde ensinamos a criar um site do zero com HTML, CSS e JavaScript. E no final, mostramos como subir seu site para deixá-lo online utilizando o GitHub Pages.

Se você ainda não conhece, o GitHub Pages é uma plataforma de hospedagem gratuita dentro do GitHub que permite aos usuários publicar sites diretamente a partir de um repositório no GitHub. Isso significa que você pode hospedar seu código-fonte no GitHub e transformá-lo em um site acessível para qualquer pessoa na internet. É uma ótima ferramenta para apresentar seus projetos, portfólios ou até mesmo artigos de blog. Além disso, é bastante popular entre os desenvolvedores devido à sua integração com o GitHub e à facilidade de uso.

Muitos alunos tentam sempre fazer deploy de uma aplicação no GitHub Pages mas não sabem realmente como ele funciona. Muitos alunos tentam sempre fazer deploy de uma aplicação no github pages mas não sabe realmente como ele funciona. Eles tentam fazer o deploy e, quando algo dá errado, ficam frustrados, e vem chorar "ah mas não funciona" 😂. Brincadeiras a parte, mas entender o GitHub Pages é o primeiro passo para o sucesso. Lembre que, ele é destinado para arquivos estáticos, e aqui entra o pulo do gato para projetos Next.js: você precisa transformá-los de dinâmicos para estáticos.

Este tutorial vai ser muito massa porque vamos integrar as GitHub Actions com o GitHub Pages. Isso significa que você não vai estar apenas publicando sua aplicação Next.js na internet; você vai estar configurando uma pipeline automática. Uma pipeline é um conjunto de processos e ferramentas automatizados, comumente usado em integração contínua e entrega contínua (CI/CD). Nesse contexto, uma pipeline é um processo que guia o desenvolvimento de software através de um caminho de criação, testes e implantação do código. O objetivo da automação do processo é minimizar erros humanos e manter a consistência até a implantação.

Assim, toda vez que você atualizar seu código no seu repositório GitHub, as GitHub Actions entrarão em cena e farão o deploy do seu projeto direto no GitHub Pages. Prático, né?

### Desvendando o mistério:

- **GitHub Actions**: Imagine ter uma equipe de mini robôs dedicados só pra você, sempre de olho no seu repositório. Quando você faz um push, eles saltam para a ação como pequenos heróis do código, realizando tarefas essenciais – eles podem testar seu código para garantir que tudo está nos trinques, verificar a qualidade para que você mantenha seu padrão ou, especificamente para nosso propósito, fazer o deploy do seu projeto automaticamente.
- **GitHub Pages**: Pense nisso como seu próprio espaço de hospedagem web, cortesia do GitHub. É o local ideal para exibir seus projetos de forma profissional, mostrar ao mundo seu portfólio brilhante ou até mesmo compartilhar seus projetos pessoais e experimentos, tudo isso a partir do conforto do seu repositório GitHub.

Aqui uns links caso tenha interesse em se aprofundar:

- [GitHub Actions](https://github.com/features/actions)
- [GitHub Pages](https://pages.github.com)

### Preparação é chave:

Para gente seguir nessa quest, um pouquinho de bagagem é necessário. Um conhecimento introdutório em React e Next.js vai longe – não precisa ser um mestre lvl 80, apenas entender o básico já é suficiente. E, claro, uma noção fundamental de como o GitHub funciona é crucial, afinal, vai ser onde toda a nossa ação vai acontecer.

### Guia Rápido:

1. **Ative o GitHub Pages**: Vá nas configurações do seu repositório, ache a seção do GitHub Pages e configure para usar as GitHub Actions. Você está basicamente dizendo ao GitHub: "Ei, vou automatizar isso, fique de olho".

   ![GitHub Project Settings](/assets/img/passo1.png "GitHub Project Settings")

   ![GitHub Project Settings – GitHub Pages configuration](/assets/img/passo2.png "GitHub Project Settings – GitHub Pages configuration")

2. **Prepare seu App Next.js**: Como o GitHub Pages prefere conteúdo estático, você vai ajustar seu Next.js para saída de páginas estáticas. Você vai mexer no `next.config.js` para garantir que ele exporte seu projeto como arquivos estáticos. Assim, o GitHub pode exibir seu site sem problemas.

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // <=== permite exportações estáticas
  reactStrictMode: true
}

module.exports = nextConfig
```

Agora, após executar a próxima `next build`, Next.js irá gerar uma pasta `out` contendo arquivos estáticos do nosso projeto. Nas próximas etapas, essa vai ser a pasta que nós pegaremos carregaremos no GitHub Pages.

PS: você pode usar [getStaticProps ](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props)e [getStaticPaths](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths) para gerar arquivos estáticos pro seu projeto.

3. **Corrija Problemas de Caminho**: Seu projeto pode ter problemas com imagens ou estilos quebrados porque o GitHub Pages coloca ele em um subdiretório. Você vai resolver isso definindo um `basePath` no seu `next.config.js`. Isso diz ao seu app: "Ei, não estamos mais no mesmo lugar; estamos nesse novo endereço".

O Github publica páginas em um subcaminho de um domínio e usa o nome do projeto como um subcaminho. Parece confuso, então vamos usar a URL do meu projeto como exemplo:

`https://lucaoskaique.github.io/nextjs-to-github-pages/`

Como você pode ver, o Github atribuiu um subdomínio dedicado para mim chamado lucaoskaique(com meu nome de usuário). Mas o projeto é publicado no subcaminho, que no meu caso é /nextjs-to-github-pages. Infelizmente, isso levará a problemas com imagens e estilos ausentes.

Por padrão, Next.js mapeia todos os ativos estáticos do domínio. Isso significa que o arquivo `favicon.ico` será resolvido para `lucaoskaique.github.io/favicon.ico` em vez de `lucaoskaique.github.io/nextjs-to-github-pages/favicon.icon`.

Para corrigir isso, podemos configurar um prefixo de caminho adicionando basePath dentro do arquivo next.config.js:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/nextjs-to-github-pages",
  output: "export",
  reactStrictMode: true
}

module.exports = nextConfig
```

No meu caso, é `/nextjs-to-github-pages` ja que meu projeto chama nextjs-to-github-pages. Não esquece de botar o `(/)` no inicio do path.

4. **Configure as GitHub Actions**: Aqui é onde a mágica acontece. Você vai criar duas actions: uma para configurar o Node.js (tipo preparando seu ambiente) e outra para a mágica de publicação (levando seu lindo site estático para o mundo ver).

- Ação de configuração do Node (setup-node action) – Essa ação é responsável por configurar o Node.js e instalar todas as dependências. Ter uma ação autônoma para a configuração do Node.js nos permite reutilizá-la em outras pipelines. Por exemplo, no meu projeto, tenho pipelines que executam linter de código e testes. Provavelmente, você também terá mais de uma ação.
- Ação de publicação (publish action) – Esta ação gerencia o processo de build e publica o projeto Next.js no GitHub Pages toda vez que você der um push na branch main do repositório.

Agora, você pode entender por que é benéfico dividir a implantação em duas ações.

Deixe-me começar explicando a ação de configuração do Node (setup-node action). Se liga no código:

```yaml
# File: .github/workflows/setup-node/action.yml
name: setup-node
description: "Configura Node.js ⚙️ - Cache dependencies ⚡ - Instala dependências 🔧"
runs:
  using: "composite"
  steps:
    - name: Configura Node.js ⚙️
      uses: actions/setup-node@v4
      with:
        node-version: 20

    - name: Cache dependencies ⚡
      id: cache_dependencies
      uses: actions/cache@v3
      with:
        path: node_modules
        key: node-modules-${{ hashFiles('package-lock.json') }}

    - name: Instala dependências 🔧
      shell: bash
      if: steps.cache_dependencies.outputs.cache-hit != 'true'
      run: npm ci
```

Importante: Coloque este arquivo no diretório `.github/workflows/setup-node` do seu projeto. Certifique-se de nomear o arquivo como `action.yml`.

O que este código faz?

- Ele declara uma ação composta. A ação composta permite agrupar múltiplos passos de um workflow em uma única ação, combinando múltiplos comandos de execução em uma única ação reutilizável.
- Ele cria um novo ambiente de build e configura o Node.js 20 lá.
- Ele instala dependências npm e utiliza um mecanismo de cache para acelerar este processo.

Estas são as partes mais importantes da ação de configuração do Node (setup-node action).

Agora, vamos passar para a última ação, que é a publicação (publish).

```yaml
# File: .github/workflows/publish.yml
name: publish-to-github-pages
on:
  push:
    branches:
      - master

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout 🛎️
        uses: actions/checkout@v4

      - name: Configura Node.js ⚙️ - Cache dependencies ⚡ - Instala dependências 🔧
        uses: ./.github/workflows/setup-node

      - name: Configura Pages ⚙️
        uses: actions/configure-pages@v4
        with:
          static_site_generator: next

      - name: Build com Next.js 🏗️
        run: npx next build

      - name: Upload do artefato 📡
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    runs-on: ubuntu-latest
    needs: build

    steps:
      - name: Publica no GitHub Pages 🚀
        id: deployment
        uses: actions/deploy-pages@v4
```

Coloque este arquivo no diretório `.github/workflows` do seu projeto. Você pode nomear o arquivo como desejar – eu o chamei de `publish.yml`.

O que este código faz?

- Esta ação é executada quando o código é enviado ou mesclado na branch principal.
- Ela utiliza a ação setup-node para configurar o ambiente.
- A ação tem dois estágios: no primeiro estágio, o aplicativo Next.js é empacotado. No segundo estágio, nós fazemos o upload dos artefatos do primeiro estágio para o GitHub Pages.
- Estes são os aspectos mais importantes da pipeline de implantação. Eu pulei a configuração de permissões e concorrência, pois permanecem inalteradas para todas as implantações.

Agora, sua action está pronta para ser usada.

5. **Faça o Push e Observe**: Depois de fazer essas alterações, quando você fizer o push, as GitHub Actions vão iniciar automaticamente o deploy para o GitHub Pages.

Após fazer o commit e o push das suas mudanças para a branch principal, o GitHub automaticamente iniciará o deploy para o GitHub Pages.

Para inspecionar o processo, navegue até a aba Actions (1 na imagem abaixo), e selecione a ação publish-to-github-pages no menu do lado esquerdo (2). Você verá todas as suas implantações na tela (elas são chamadas de workflows).

![GitHub Actions – Workflows responsáveis pela publicação no GitHub Pages](/assets/img/passo5.png "GitHub Actions – Workflows responsáveis pela publicação no GitHub Pages")

Agora, precisamos selecionar o primeiro desses workflows, e você verá uma implantação em dois estágios. No estágio de deploy, você pode encontrar um link para o seu site no GitHub Pages.

![Workflow do Projeto GitHub – Implantação bem-sucedida](/assets/img/passo6.png "Workflow do Projeto GitHub – Implantação bem-sucedida")

E aí, é só curtir seu projeto rodando liso na web!

## Finalizando

O GitHub Pages pode não ser a solução ideal para sites com tráfego massivo de milhões de acessos. No entanto, representa uma opção incrível para desenvolver seu portfólio ou para a hospedagem de sites de projetos open-source.

Existem diversas alternativas gratuitas disponíveis para hospedagem de sites atualmente. Contudo, quis destacar esta opção específica. O GitHub Pages foi criado por desenvolvedores para desenvolvedores – é possível considerá-lo como o habitat natural de um programador. Acredito que todo dev deveria estar familiarizado com ele.

Espero que este artigo sirva como um incentivo para aprender mais sobre as GitHub Actions. Não hesite em experimentar abordagens diferentes e tentar criar algo próprio. Cada aplicação precisa ser lançada, e veja este artigo apenas como um ponto de partida.
