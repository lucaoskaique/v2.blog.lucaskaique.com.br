---
layout: post
date: 2024-09-13 05:05:00
title: "Lidando com projetos WordPress quando você não é especialista: WPGraphQL
  ou REST API para Headless WordPress"
description: Imagina que você conseguiu um cliente e esse cliente tem um site
  wordpress, mas você não trabalha com wordpress e ainda assim quer fechar o
  contrato, o que você faz? Bom, foi o que aconteceu comigo e pode acontecer com
  você, então nesse post vamos conversar um pouco sobre esse estudo de caso.
main-class: js
color: "#D6BA32"
tags:
  - javascript
  - wordpress
  - graphql
  - rest
categories:
  - Wordpress
---

E aí, galera! Tô aqui pra contar uma parada bem louca que rolou comigo recentemente. Vocês não vão acreditar!

- Como eu decidi se valia a pena entrar nessa roubada (spoiler: tá indo!)
- A inspiração que me levou pro caminho do WordPress headless
- O que é WordPress headless e por que é uma boa
- As opções pra fazer o WordPress virar headless: REST API vs WPGraphQL
- As vantagens do WPGraphQL e por que eu escolhi ele

Se você já se viu numa saia justa parecida, ou só tá curioso pra saber como foi, cola aqui! Vamos trocar uma ideia sobre como a gente pode se virar nos trinta quando aparece um projeto fora da nossa zona de conforto.

Bora lá?

## Como eu decidi se valia a pena entrar nessa roubada

Então, galera, é o seguinte: caiu no meu colo um cliente, vamos chamar ele de _N_, que tem um site/blog com mais de 15 anos de postagens e muitos acessos diários. Eu já atendia eles faz um tempo pra umas coisinhas pequenas, mas a ideia de desenvolver um novo site, que já tava sem atualização há anos, tava sempre no ar.

As negociações começaram em fevereiro de 2024, mas o projeto só começou a rolar mesmo há alguns meses. E aí vem o pepino: o site todo era WordPress. Pra quem não manja, WordPress é "um programa de código aberto que você pode usar pra criar um site, blog ou aplicativo bem legal sem muito sofrimento".

Meu único contato com WordPress foi lá na adolescência, quando eu tinha um blog pra escrever minhas noias. Migrei pra lá depois de deletar sem querer meu Blogspot (sim, foi muito clicar sem ler, achei que tava fazendo backup, quase chorei). Depois que virei desenvolvedor, sempre ouvi falar de WP e sei que grande parte da web ainda usa ele. Pelo menos 80% da web roda em PHP (pra nossa tristeza, né? kkkkk). Mentira, respeito PHP, sempre vou respeitar coisas sólidas.

Então, por que raios eu aceitei esse desafio? Simples: porque eu posso e tenho um "probleminha" na cabeça onde tô constantemente me desafiando. Já me ferrei muito por isso, mas faz parte do aprendizado, né?

## O desafio: WordPress Headless

No fim das contas, decidimos que poderíamos ficar com WordPress, mas também tentar migrar pra uma stack nova. Aí que o bicho pegou: como fazer essa comunicação se vamos manter o WP como CMS (Content Management System) e fazer um site à parte?

O requisito era: "não podemos perder essa base de dados". E eu também não queria fazer uma migração pra outro lugar, o que ia deixar tudo mais caro pro cliente e dar mais trabalho pra mim.

Aí me veio uma ideia maluca: e se a gente usasse o WordPress como headless? Pois é, galera, tô falando de WordPress headless! Mas calma aí, vou explicar melhor essa parada.

## A inspiração: Strapi e CMS Headless

Antes de seguir, deixa eu contar uma história que me ajudou a chegar nessa solução. Em 2021, um brother meu, o @felipe marcolin, me falou sobre um tema que ficou martelando na minha cabeça. Ele mencionou o Strapi, que é um "CMS headless de última geração, de código aberto e javascript, que permite que experiências ricas em conteúdo sejam criadas, gerenciadas e expostas a qualquer dispositivo digital."

Achei a ideia tão foda que fui atrás de um curso pra aprender mais. Acabei caindo num curso do William Justen em 2022. Esse cara é brabo e muito didático, um diferencial na comunidade. Lá aprendi mais sobre Strapi e sobre a melhor versão do app. Hoje em dia, na v4, eu não curto tanto porque eles fecharam muito o opensource e não dá pra customizar tanto, mas ainda é uma solução animal pra colocar rápido em produção.

E aí que tá a sacada: um CMS headless é basicamente um sistema de gerenciamento de conteúdo da web só de backend, que funciona principalmente como um repositório de conteúdo. Isso me fez pensar: será que dá pra fazer isso com WordPress?

## WordPress headless: o que é isso?

![Arquitetura de como o WordPress headless funciona.](https://kinsta.com/wp-content/uploads/2023/11/headless-cms-arcitecture.png "Arquitetura de como o WordPress headless funciona. (https://kinsta.com/pt/blog/wpgraphql-e-wp-rest-api/)")

Então, o WordPress normal não é um CMS headless de cara. Ele é aquele CMS que todo mundo conhece, fácil de usar e flexível pra criar e gerenciar conteúdo. Mas tradicionalmente, ele mistura o gerenciamento de conteúdo com a forma de apresentar esse conteúdo, tudo num pacote só.

Mas aí os developers malucos criaram o tal do WordPress headless usando a API REST dele. Nesse esquema, o WordPress continua sendo o CMS onde você cria, gerencia e guarda o conteúdo. A diferença é que, em vez de mostrar o site direto pelos templates e temas do WordPress, a parte do frontend fica separada do backend.

Isso permite que a gente construa aplicativos usando tecnologias e frameworks diferentes, mas ainda aproveitando as paradas legais de gerenciamento de conteúdo do WordPress. É um jeito de fazer o WordPress funcionar mais como headless, mesmo não sendo a configuração padrão.

## As opções: REST API vs WPGraphQL

### REST API do WordPress

A API REST é tipo o coringa do WordPress. Desde a versão 4.7, ela já vem embutida e não precisa de plugin nenhum pra funcionar. Com ela, você consegue pegar os dados do seu site no formato JSON.

Pra usar, é só adicionar /wp-json ao URL do site:

```
http://seusite.com/wp-json
```

Daí você tem endpoints pra posts, páginas, comentários, mídia e por aí vai. Por exemplo:

```
http://seusite.com/wp-json/wp/v2/posts
http://seusite.com/wp-json/wp/v2/comments
http://seusite.com/wp-json/wp/v2/media
```

### WPGraphQL

Agora, se você quer uma parada mais moderna e eficiente, tem o WPGraphQL. É um plugin baseado em GraphQL que permite fazer consultas mais precisas e personalizadas.

![Plugin WpGraphQL no mercado do WP.](https://kinsta.com/wp-content/uploads/2023/11/wpgraphql-plugin.png "Plugin WpGraphQL no mercado do WP.")

![Obtenha dados de artigos do WordPress com o WPGraphQL.](https://kinsta.com/wp-content/uploads/2023/11/testing-graphql-wp.jpg "Obtenha dados de artigos do WordPress com o WPGraphQL.")

Com o WPGraphQL, você tem um único endpoint e pode pedir exatamente os dados que precisa, sem ficar pegando um monte de coisa que não vai usar. Por exemplo:

```graphql
{
  post(id: "123") {
    title
    content
    comments {
      edges {
        node {
          content
        }
      }
    }
  }
}
```

Nesse exemplo, a gente tá pegando o título, conteúdo e comentários de um post específico, tudo numa tacada só!

## As vantagens do WPGraphQL

Galera, deixa eu falar mais sobre o WPGraphQL, porque essa parada é muito massa:

1. Endpoint único pra recuperação precisa de dados: Com o WPGraphQL, você tem um endpoint unificado, tipo `/graphql`, que te permite pegar exatamente os dados que você precisa. É bem diferente da API REST, onde você precisa fazer várias chamadas pra pegar tudo que quer.

2. Consultas direcionadas pra uma recuperação eficiente: Com o GraphQL, você pode criar consultas específicas pro que você precisa. Isso evita que você pegue um monte de dado que não vai usar. Por exemplo:

```graphql
{
  posts {
    title
    date
    author {
      name
    }
  }
}
```

Nessa consulta, a gente tá pegando só o título, a data e o nome do autor dos posts. Nada de informação extra que a gente não vai usar!

3. Vários recursos raiz: No WPGraphQL, você pode consultar vários recursos de uma vez só. Tipo, você pode pegar posts e páginas numa única consulta:

```graphql
{
  posts {
    edges {
      node {
        title
        content
      }
    }
  }

  pages {
    edges {
      node {
        title
        content
      }
    }
  }
}
```

Isso deixa tudo mais rápido e eficiente.

## Qual escolher?

Bom, galera, a escolha entre REST API e WPGraphQL vai depender do que você precisa pro seu projeto. Se quer uma solução já integrada no WordPress, vai de REST API. Se quer algo mais moderno e eficiente, o WPGraphQL pode ser uma boa.

No fim das contas, o importante é escolher a ferramenta que melhor se encaixa no seu fluxo de trabalho e nas metas do projeto. Assim você garante uma integração suave entre o WordPress e o framework de frontend que você escolher.

No meu caso, acabei optando pelo WPGraphQL pra fazer a POC (Proof of Concept) pro nosso cliente N. A ideia era usar o WordPress como backend pra alimentar nosso frontend em Next.js, que a gente escolheu pra ajudar no SEO, que era o grande foco do projeto.

E aí, o que acharam dessa lourada? Já passaram por algo parecido? Conta aí nos comentários! Até a próxima, galera!
