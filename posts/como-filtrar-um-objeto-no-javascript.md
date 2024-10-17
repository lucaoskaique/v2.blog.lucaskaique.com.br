---
layout: post
date: 2024-02-04 08:25:28
image: /assets/img/imagem_2024-02-04_202622872.png
title: Como Filtrar um Objeto no JavaScript
description: Infelizmente, os objetos JavaScript não possuem uma função
  filter(). Mas isso não significa que você não pode usar filter() para filtrar
  objetos, você só precisa ser capaz de iterar sobre um objeto e convertê-lo em
  um array usando Object.entries().
main-class: js
color: "#D6BA32"
tags:
  - programming
  - javascript
  - js
  - dicas
categories:
  - javascript
---

Objetos em JavaScript não são iteráveis como vetores ou cadeias de caracteres (não é possível percorrê-los com loops). Isso significa que você não pode aplicar diretamente `filter()`, o método de laço for, ou qualquer outro método de iteração em um objeto. Então, como se pode filtrar um objeto em JavaScript?

Isso é possível ao transformar o objeto em um vetor utilizando um dos métodos estáticos de objeto, tais como `Object.keys()`, `Object.values()` ou `Object.entries()`. Posteriormente, você pode empregar o método filter() para realizar a filtragem no vetor e gerar um novo vetor com os elementos que passaram pelo filtro.

Imagine que você possui um objeto que armazena detalhes de usuários, como nome, idade e profissão. Esses métodos estáticos de objeto têm a capacidade de retornar as chaves, os valores ou cada par de chave-valor na forma de um vetor.

```javascript
const detalhesDoUsuario = {
  primeiroNome: "Lucas",
  sobrenome: "Kaique",
  nomeDeUsuario: "lucaoskaique",
  email: "me@lucaskaique.com.br",
  empresa: "Example Inc.",
  endereco: "1234 Exemplo",
  idade: 29,
  passatempo: "DJ"
}

let arrayDeChaves = Object.keys(detalhesDoUsuario)

console.log(arrayDeChaves)
```

Isso exibirá um vetor com as chaves do objeto:

`['primeiroNome', 'sobrenome', 'nomeDeUsuario', 'email', 'empresa', 'endereco', 'idade', 'passatempo']`
Agora você pode empregar o método `filter()` para navegar pelo vetor e criar um novo vetor com os elementos filtrados:

```javascript
let chavesFiltradas = arrayDeChaves.filter((chave) => chave.length > 5)

console.log(chavesFiltradas)
```

Isso resultará em um vetor de chaves cujo tamanho é superior a 5:

`['primeiroNome', 'sobrenome', 'nomeDeUsuario', 'empresa', 'endereco', 'passatempo']`
No entanto, certamente você desejará realizar uma operação de filtragem mais significativa. Por exemplo, você pode querer filtrar pares de chave-valor do objeto que incluem um nome de um objeto extenso. Para isso, primeiramente obtenha as chaves, filtre-as e depois utilize o método reduce() para converter as chaves filtradas em um objeto com as chaves filtradas e seus respectivos valores:

```javascript
const detalhesDoUsuario = {
  primeiroNome: "Lucas",
  sobrenome: "Kaique",
  nomeDeUsuario: "lucaoskaique",
  email: "me@lucaskaique.com.br",
  empresa: "Example Inc.",
  endereco: "1234 Exemplo",
  idade: 29,
  passatempo: "DJ"
}

const nomesDeUsuario = Object.keys(detalhesDoUsuario)
  .filter((chave) => chave.includes("Nome"))
  .reduce((objeto, chave) => {
    return Object.assign(objeto, {
      [chave]: detalhesDoUsuario[chave]
    })
  }, {})

console.log(nomesDeUsuario)
```

Isso resultará em um objeto com as chaves filtradas e seus respectivos valores:

```json
{
  "primeiroNome": "Lucas",
  "sobrenome": "Kaique",
  "nomeDeUsuario": "lucaoskaique"
}
```

### Em síntese

Você aprendeu a filtrar um objeto em JavaScript convertendo ele em um array utilizando o método `filter()`.

Fonte
<https://www.freecodecamp.org/news/filter-arrays-in-javascript/>
