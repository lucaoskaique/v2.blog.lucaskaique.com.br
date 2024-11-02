---
layout: post
date: 2024-11-02 05:24:00
title: "Quando usar SSG vs SSR no Next.js: Uma dúvida sincera para um caso real"
description: "Hoje acordei com uma dúvida que tive durante o desenvolvimento do
  site de um cliente: quando usar Server-Side Rendering (SSR) e quando usar
  Static Site Generation (SSG) no Next.js?"
main-class: js
color: "#D6BA32"
tags:
  - nextjs
  - ssg
  - ssr
  - serverside
  - ""
---
As vezes fazendo um blog ou site a gente acha que tomou a melhor decisão mas ai você acorda a noite e pensa que talvez não foi a melhor solução e enquanto não responder se foi ou não com toda certeza desse universo, você não dorme, que foi o meu caso.

![finally go to bed start dreaming about coding](/assets/img/quando-usar-ssg-vs-ssr-no-next-js-uma-duvida-sincera-para-um-caso-real/finallycotobed.jpg "finally go to bed start dreaming about coding")

## A Dúvida Inicial

Minha confusão começou depois que já estavam prontas as páginas e suas rotas para categorias e tags dos posts. Eu tinha duas rotas principais:

```
src/pages/posts/category/[category].tsx
src/pages/posts/tag/[tag].tsx
```

E a grande questão era: usei SSR (Server-Side Rendering) para ambas, foi a melhor estratégia?

> *Antes de mais nada estou usando NextJS 14.2 com Pages Router, até porque SSR e SSG não é uma preocupação no App Router.*

## Entendendo o Cenário

Para saber se tomei a decisão certa, precisei responder três perguntas fundamentais:

1. **Com que frequência as categorias e tags mudam?**

   * Categorias: São fixas, não mudam
   * Tags: São dinâmicas e podem ser infinitas
2. **Quantas categorias e tags existem?**

   * Categorias: Apenas 5 tipos fixos
   * Tags: Quantidade ilimitada
3. **Como funciona a navegação?**

   * Quando clicamos em uma categoria ou tag, somos direcionados para uma página que lista todos os posts relacionados
   * Exemplo: `/posts/category/rock` ou `/posts/tag/jazz`

## A Solução

Talvez para Tags foi uma boa ideia, pelo volume de tags, mas pra categories....E depois de analisar bem o cenário, chegamos à seguinte conclusão:

### Para Categorias: SSG (Static Site Generation)

```typescript
// pages/posts/category/[category].tsx
export async function getStaticPaths() {
  // Como são apenas 5 categorias fixas
  const categories = ['rock', 'jazz', 'classical', 'pop', 'electronic']
  
  return {
    paths: categories.map(category => ({
      params: { category }
    })),
    fallback: false // Não precisamos de fallback
  }
}

export async function getStaticProps({ params }) {
  const posts = await getPostsByCategory(params.category)
  
  return {
    props: {
      posts,
      category: params.category
    },
    revalidate: 3600 // Regera a cada hora
  }
}
```

**Por quê?**

* São apenas 5 categorias fixas
* As categorias não mudam
* Melhor performance
* Menor custo de servidor
* Ótimo para SEO

### Para Tags: SSR (Server-Side Rendering)

```typescript
// pages/posts/tag/[tag].tsx
export async function getServerSideProps({ params }) {
  const posts = await getPostsByTag(params.tag)

  return {
    props: {
      posts,
      tag: params.tag
    }
  }
}
```

**Por quê?**

* Número ilimitado de tags
* Novas tags podem ser adicionadas a qualquer momento
* Precisa ser dinâmico
* Não faz sentido gerar páginas estáticas para todas as possibilidades

## Dicas Práticas

1. **Para Categorias (SSG)**

   * Use `getStaticProps` com `getStaticPaths`
   * Defina `fallback: false` já que as categorias são fixas
   * Considere usar `revalidate` se quiser atualizar a lista de posts periodicamente
2. **Para Tags (SSR)**

   * Use `getServerSideProps`
   * Não precisa se preocupar com paths predefinidos
   * Mantenha um bom cache no servidor para melhorar performance

## Bônus: Teste seu conhecimento! 🤔

### A Pergunta do Milhão 🌽
Para a página de `pages/posts/[slug].tsx` usaremos SSG ou SSR? Pensa antes de responder...

<details>
 <summary>👉 CLIQUE AQUI PARA A RESPOSTA</summary>
 
 Se você respondeu SSG (e ISR junto), você tá correto! 🎉
 
 **Por quê?**
 - Posts geralmente são conteúdo estático
 - Com ISR, podemos regenerar páginas quando novos posts são adicionados
 - Não precisa regenerar todas as páginas quando um novo post é criado
 - Melhor performance para o usuário
 - Ótimo para SEO
 - Menor custo de infraestrutura (comparado a SSR)

 **Código de exemplo:**
 ```typescript
 // pages/posts/[slug].tsx
 export async function getStaticPaths() {
   const posts = await getAllPosts()
   
   return {
     paths: posts.map(post => ({
       params: { slug: post.slug }
     })),
     fallback: 'blocking' // Importante para ISR: permite gerar novas páginas sob demanda
   }
 }

 export async function getStaticProps({ params }) {
   const post = await getPostBySlug(params.slug)
   
   return {
     props: {
       post
     },
     revalidate: 3600 // ISR: regenera a cada hora se necessário
   }
 }
 ```

 **Benefícios do ISR neste caso:**
 - Páginas existentes continuam estáticas e rápidas
 - Novos posts são gerados automaticamente quando acessados
 - Atualiza periodicamente sem precisar fazer novo build
 - Melhor equilíbrio entre performance e conteúdo atual
</details>

## Conclusão

A chave é entender bem o seu caso de uso. No nosso cenário:

* Categorias são previsíveis e limitadas → SSG
* Tags são dinâmicas e ilimitadas → SSR

Esta combinação nos dá o melhor dos dois mundos: páginas ultra rápidas para navegação por categorias e flexibilidade total para tags.

## Recursos Úteis

* [Documentação do Next.js sobre SSG](https://nextjs.org/docs/basic-features/data-fetching/get-static-props)
* [Documentação do Next.js sobre SSR](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props)

Espero que este artigo ajude você a tomar a melhor decisão para o seu projeto! Se ficou alguma dúvida, manda nos comentários! 😉
