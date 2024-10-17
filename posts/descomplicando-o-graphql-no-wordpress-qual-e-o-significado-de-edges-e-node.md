---
layout: post
date: 2024-09-24 04:30:00
title: 'Descomplicando o GraphQL no WordPress: qual é o significado de "edges" e
  "node"?'
description: Você tá consumindo um endpoint GraphQL e retorno tem "edges" e
  "node". Você tá fornecendo uma estrutura JSON limpa pra consulta e parece que
  o WPGraphQL está poluindo seus dados sem nenhum benefício óbvio aparente. E se
  pergunta por que esses termos estão incluídos na resposta do endpoint GraphQL
  e se é possível se livrar deles para um retorno mais simples de dados??
main-class: js
color: "#D6BA32"
tags:
  - wordpress
  - wpgraphql
  - graphql
---

## O que é GraphQL e por que está bombando?

Já falei sobre no post anterior mas se você não leu imagina só: você tá num buffet self-service top da cidade (para quem é de Porto Alegre esses tão escassos hoje em dia). Em vez de pegar aquele prato feito que vem com um monte de coisa que você nem come (como acontece às vezes com APIs REST), você monta exatamente o que quer comer. Style, né? Pois é assim que funciona o GraphQL. Você pede só os dados que precisa, nada a mais, nada a menos. Resultado? Seu site fica mais rápido e você economiza dados. Todo mundo sai ganhando!

## WPGraphQL: Quando o WordPress entra na dança

Agora, pensa no seu site WordPress. Tem post, página, comentário, usuário... uma porrada de coisa. Já falamos também no outro artigo, que o WPGraphQL é um plugin que traz toda essa mágika 🪄 do GraphQL pro WordPress.

## Edges e Nodes: Os inseparáveis do GraphQL

Quando a gente começa a brincar com WPGraphQL, logo esbarra em dois conceitos: edges e nodes. Parece complicado, mas é mais simples do que parece:

- **Nodes**: São os dados mesmo. Um post, um comentário, um usuário. É a informação que você quer pegar.
- **Edges**: É o caminho pra chegar nessa informação. Parece desnecessário, mas pelo visto não é pois::: paginação e metadados.

É tipo uma árvore genealógica. Os nodes são as pessoas, e as edges são as linhas que conectam elas.

## Na prática, como fica?

Vamos ver um exemplo rapidinho de como buscar posts no WPGraphQL:

```graphql
query {
  posts(first: 5) {
    edges {
      node {
        title
        excerpt
      }
    }
  }
}
```

Aqui a gente tá pedindo os 5 primeiros posts, mas só o título e o resumo de cada um. Simples, né?

## Quando usar cada coisa?

- **Lista simples**: Quando você só quer uma lista rápida e direta, sem frescura.
- **Só Nodes**: Útil pra quando você quer paginar, mas não precisa de informações extras sobre cada item.
- **Edges e Nodes**: O pacote completo. Ideal pra quando você precisa de paginação avançada ou metadados sobre cada item da lista.

# Descomplicando o GraphQL no WordPress: Minha Experiência com WPGraphQL

[Conteúdo anterior permanece o mesmo...]

## Quando usar cada coisa?

Galera, vamos ver na prática quando usar cada tipo de estrutura. Colei aqui uns exemplos pra ficar mais fácil de entender:

1. **Lista simples**: Quando você só quer uma lista rápida e direta, sem frescura.

Exemplo: Pegar o nome e o slug das 5 primeiras categorias.

```graphql
query {
  categories(first: 5) {
    name
    slug
  }
}
```

Sacou? Direto ao ponto, sem edges nem nodes. Só o que a gente precisa.

2. **Só Nodes**: Útil pra quando você quer paginar, mas não precisa de informações extras sobre cada item.

Exemplo: Buscar os 10 posts mais recentes, com opção de paginação.

```graphql
query {
  posts(first: 10) {
    nodes {
      title
      date
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

Aqui a gente já tá usando paginação, mas ainda tá bem enxuto, sacou?

3. **Edges e Nodes**: O pacote completo. Ideal pra quando você precisa de paginação avançada ou metadados sobre cada item da lista.

Exemplo: Pegar os 5 primeiros posts, incluindo informações sobre a posição de cada post na lista.

```graphql
query {
  posts(first: 5) {
    edges {
      node {
        title
        excerpt
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

Bem chic né?! Agora temos o 'cursor' pra cada post, que é aquela informação extra que falei. Dá pra fazer umas mágicas de paginação avançada com isso.

No WPGraphQL, você vai ver muito o uso de edges e nodes. Pode parecer exagero às vezes, mas essa padronização parece facilitar muito quando o projeto cresce.

## Concluindo...

GraphQL e WPGraphQL podem parecer um bicho de sete cabeças no começo, mas quando a ficha cai, você vê o tanto de possibilidades que se abrem. É uma ferramenta poderosa que dá mais controle e eficiência pro seu desenvolvimento.

Escrevi esse artigo porque é algo que estava nas minhas anotações dessa seman e to tentando colocar mais ideias e pesquisas minhas aqui.

Tem alguma experiência pra compartilhar ou dúvida pra tirar? Comenta aí embaixo! Vamos trocar uma ideia e aprender juntos.

Falou, jovens! Boa semana!
