---
layout: post
date: 2024-02-26 01:56:55
main-class: js
color: '#D6BA32'
tags:
  - javascript
  - js
  - development
pt-BR:
  title: "Dominando as malicias do JavaScript \U0001F608"
  description: >-
    Hoje, nosso foco está nos atalhos que gosto de chamar de "malicias" de
    JavaScript, são técnicas que ajudam a deixar seu código mais limpo e eficaz.
  body: >

    ![Evil
    cowboy](https://res.cloudinary.com/lucaos/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1708976693/lucaoskaique/DALL_E_2024-02-26_16.21.43_-_Create_an_image_of_a_mischievous_devilish_emoji_character_but_with_a_unique_twist__it_s_wearing_a_cowboy_hat._The_character_should_embody_the_playfu.webp
    "Evil Cowboy")


    Salve, galerinha viciada em JavaScript!


    Eu sou Lucas Kaique, seu engenheiro de software dedicado, trazendo mais
    insights de JavaScript. Hoje, nosso foco está nos atalhos que gosto de
    chamar de "malicias" de JavaScript, são técnicas que ajudam a deixar seu
    código mais limpo e eficaz.


    Vamos explorar exemplos práticos, alternando entre a abordagem padrão do
    JavaScript e suas contrapartes abreviadas.


    Então, sem mais delongas, vamos aprimorar suas habilidades em JavaScript!


    ### 1. Arrow Functions ou Funções de Flecha:


    **Aplicação:** Definições Simplificadas de Funções


    **JavaScript Padrão:**


    ```javascript

    function add(a, b) {
      return a + b
    }

    ```


    **Forma Simplificada:**


    ```javascript

    const add = (a, b) => a + b

    ```


    ### 2. Template Literals:


    **Aplicação:** Junção Dinâmica de Strings


    **JavaScript Padrão:**


    ```javascript

    const name = "Lucas Kaique"

    const greeting = "Olá, " + name + "!"

    ```


    **Forma Simplificada:**


    ```javascript

    const name = "Lucas Kaique"

    const greeting = `Olá, ${name}!`

    ```


    ### 3. Desestruturação de Arrays:


    **Aplicação:** Troca de Valores entre Variáveis


    **JavaScript Padrão:**


    ```javascript

    let a = 5

    let b = 10


    let temp = a

    a = b

    b = temp

    ```


    **Forma Simplificada:**


    ```javascript

    let a = 5

    let b = 10


    ;[a, b] = [b, a]

    ```


    ### 4. Avaliação de Curto-Circuito:


    **Aplicação:** Substituição para Valores Não Definidos ou Nulos


    **JavaScript Padrão:**


    ```javascript

    const username = getUsernameFromAPI()

    const displayName = username ? username : "Anônimo"

    ```


    **Forma Simplificada:**


    ```javascript

    const username = getUsernameFromAPI()

    const displayName = username || "Anônimo"

    ```


    ### 5. Valores Padrão para Parâmetros:


    **Aplicação:** Definindo Valores Iniciais para Parâmetros de Função


    **JavaScript Padrão:**


    ```javascript

    function greet(name) {
      name = name || "Visitante"
      return `Olá, ${name}!`
    }

    ```


    **Forma Simplificada:**


    ```javascript

    function greet(name = "Visitante") {
      return `Olá, ${name}!`
    }

    ```


    ### 6. Abreviação de Propriedades de Objetos:


    **Aplicação:** Formação de Objetos com Variáveis


    **JavaScript Padrão:**


    ```javascript

    const name = "Lucas Kaique"

    const age = 30


    const person = {
      name: name,
      age: age
    }

    ```


    **Forma Simplificada:**


    ```javascript

    const name = "Lucas Kaique"

    const age = 30


    const person = {
      name,
      age
    }

    ```


    ### 7. Operador Ternário:


    **Aplicação:** Atribuição Condicional


    **JavaScript Padrão:**


    ```javascript

    let isAdmin

    if (user.role === "admin") {
      isAdmin = true
    } else {
      isAdmin = false
    }

    ```


    **Forma Simplificada:**


    ```javascript

    const isAdmin = user.role === "admin"

    ```


    **Versão ainda mais curta:**


    ```javascript

    const isAdmin = user.role === "admin" ? true : false

    ```


    ### 8. Operador de Coalescência Nula:


    **Aplicação:** Definição de Valores Padrão para Variáveis Nulas ou Não
    Definidas


    **JavaScript Padrão:**


    ```javascript

    const fetchUserData = () => {
      return "Lucas Kaique" // altere para null ou undefined para observar o comportamento
    }


    const data = fetchUserData()

    const username = data !== null && data !== undefined ? data : "Visitante"

    ```


    **Forma Simplificada:**


    ```javascript

    const fetchUserData = () => {
      return "Lucas Kaique" // altere para null ou undefined para observar o comportamento
    }


    const data = fetchUserData()

    const username = data ?? "Visitante"

    ```


    ### 9. Desestruturação de Objetos:


    **Aplicação:** Extração de Propriedades de Objetos


    **JavaScript Padrão:**


    ```javascript

    const user = {
      name: "Lucas Kaique",
      age: 30,
      country: "Brasil"
    }


    const name = user.name

    const age = user.age

    const country = user.country

    ```


    **Forma Simplificada:**


    ```javascript

    const user = {
      name: "Lucas Kaique",
      age: 30,
      country: "Brasil"
    }


    const { name, age, country } = user

    ```


    ### 10. Operador Spread:


    **Aplicação:** União de Arrays ou Objetos


    **JavaScript Padrão:**


    ```javascript

    const arr1 = [1, 2, 3]

    const arr2 = [4, 5, 6]

    const combinedArray = arr1.concat(arr2)

    ```


    **Forma Simplificada:**


    ```javascript

    const arr1 = [1, 2, 3]

    const arr2 = [4, 5, 6]

    const combinedArray = [...arr1, ...arr2]

    ```


    ### 11. Atribuição Lógica OR:


    **Aplicação:** Definição de Valor Padrão para Variáveis


    **JavaScript Padrão:**


    ```javascript

    let count

    if (!count) {
      count = 1
    }

    ```


    **Forma Simplificada:**


    ```javascript

    let count

    count ||= 1

    ```


    ### 12. Avaliação de Curto-Circuito para Chamada de Função:


    **Aplicação:** Prevenção de Execução Desnecessária de Função


    **JavaScript Padrão:**


    ```javascript

    function fetchData() {
      if (shouldFetchData) {
        return fetchDataFromAPI()
      } else {
        return null
      }
    }

    ```


    **Forma Simplificada:**


    ```javascript

    function fetchData() {
      return shouldFetchData && fetchDataFromAPI()
    }

    ```


    Cabô!!


    Implemente essas formas abreviadas em seu código e observe como suas
    habilidades em JavaScript se expandem.


    Até a proxima.
en:
  title: "Mastering JavaScript Shortcuts \U0001F608"
  description: >-
    Today, our focus is on shortcuts that I like to call JavaScript "tricks" -
    techniques that help make your code cleaner and more effective
  body: >

    ![Evil
    cowboy](https://res.cloudinary.com/lucaos/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1708976693/lucaoskaique/DALL_E_2024-02-26_16.21.43_-_Create_an_image_of_a_mischievous_devilish_emoji_character_but_with_a_unique_twist__it_s_wearing_a_cowboy_hat._The_character_should_embody_the_playfu.webp
    "Evil Cowboy")


    Salve, galerinha viciada em JavaScript!


    Eu sou Lucas Kaique, seu engenheiro de software dedicado, trazendo mais
    insights de JavaScript. Hoje, nosso foco está nos atalhos que gosto de
    chamar de "malicias" de JavaScript, são técnicas que ajudam a deixar seu
    código mais limpo e eficaz.


    Vamos explorar exemplos práticos, alternando entre a abordagem padrão do
    JavaScript e suas contrapartes abreviadas.


    Então, sem mais delongas, vamos aprimorar suas habilidades em JavaScript!


    ### 1. Arrow Functions ou Funções de Flecha:


    **Aplicação:** Definições Simplificadas de Funções


    **JavaScript Padrão:**


    ```javascript

    function add(a, b) {
      return a + b
    }

    ```


    **Forma Simplificada:**


    ```javascript

    const add = (a, b) => a + b

    ```


    ### 2. Template Literals:


    **Aplicação:** Junção Dinâmica de Strings


    **JavaScript Padrão:**


    ```javascript

    const name = "Lucas Kaique"

    const greeting = "Olá, " + name + "!"

    ```


    **Forma Simplificada:**


    ```javascript

    const name = "Lucas Kaique"

    const greeting = `Olá, ${name}!`

    ```


    ### 3. Desestruturação de Arrays:


    **Aplicação:** Troca de Valores entre Variáveis


    **JavaScript Padrão:**


    ```javascript

    let a = 5

    let b = 10


    let temp = a

    a = b

    b = temp

    ```


    **Forma Simplificada:**


    ```javascript

    let a = 5

    let b = 10


    ;[a, b] = [b, a]

    ```


    ### 4. Avaliação de Curto-Circuito:


    **Aplicação:** Substituição para Valores Não Definidos ou Nulos


    **JavaScript Padrão:**


    ```javascript

    const username = getUsernameFromAPI()

    const displayName = username ? username : "Anônimo"

    ```


    **Forma Simplificada:**


    ```javascript

    const username = getUsernameFromAPI()

    const displayName = username || "Anônimo"

    ```


    ### 5. Valores Padrão para Parâmetros:


    **Aplicação:** Definindo Valores Iniciais para Parâmetros de Função


    **JavaScript Padrão:**


    ```javascript

    function greet(name) {
      name = name || "Visitante"
      return `Olá, ${name}!`
    }

    ```


    **Forma Simplificada:**


    ```javascript

    function greet(name = "Visitante") {
      return `Olá, ${name}!`
    }

    ```


    ### 6. Abreviação de Propriedades de Objetos:


    **Aplicação:** Formação de Objetos com Variáveis


    **JavaScript Padrão:**


    ```javascript

    const name = "Lucas Kaique"

    const age = 30


    const person = {
      name: name,
      age: age
    }

    ```


    **Forma Simplificada:**


    ```javascript

    const name = "Lucas Kaique"

    const age = 30


    const person = {
      name,
      age
    }

    ```


    ### 7. Operador Ternário:


    **Aplicação:** Atribuição Condicional


    **JavaScript Padrão:**


    ```javascript

    let isAdmin

    if (user.role === "admin") {
      isAdmin = true
    } else {
      isAdmin = false
    }

    ```


    **Forma Simplificada:**


    ```javascript

    const isAdmin = user.role === "admin"

    ```


    **Versão ainda mais curta:**


    ```javascript

    const isAdmin = user.role === "admin" ? true : false

    ```


    ### 8. Operador de Coalescência Nula:


    **Aplicação:** Definição de Valores Padrão para Variáveis Nulas ou Não
    Definidas


    **JavaScript Padrão:**


    ```javascript

    const fetchUserData = () => {
      return "Lucas Kaique" // altere para null ou undefined para observar o comportamento
    }


    const data = fetchUserData()

    const username = data !== null && data !== undefined ? data : "Visitante"

    ```


    **Forma Simplificada:**


    ```javascript

    const fetchUserData = () => {
      return "Lucas Kaique" // altere para null ou undefined para observar o comportamento
    }


    const data = fetchUserData()

    const username = data ?? "Visitante"

    ```


    ### 9. Desestruturação de Objetos:


    **Aplicação:** Extração de Propriedades de Objetos


    **JavaScript Padrão:**


    ```javascript

    const user = {
      name: "Lucas Kaique",
      age: 30,
      country: "Brasil"
    }


    const name = user.name

    const age = user.age

    const country = user.country

    ```


    **Forma Simplificada:**


    ```javascript

    const user = {
      name: "Lucas Kaique",
      age: 30,
      country: "Brasil"
    }


    const { name, age, country } = user

    ```


    ### 10. Operador Spread:


    **Aplicação:** União de Arrays ou Objetos


    **JavaScript Padrão:**


    ```javascript

    const arr1 = [1, 2, 3]

    const arr2 = [4, 5, 6]

    const combinedArray = arr1.concat(arr2)

    ```


    **Forma Simplificada:**


    ```javascript

    const arr1 = [1, 2, 3]

    const arr2 = [4, 5, 6]

    const combinedArray = [...arr1, ...arr2]

    ```


    ### 11. Atribuição Lógica OR:


    **Aplicação:** Definição de Valor Padrão para Variáveis


    **JavaScript Padrão:**


    ```javascript

    let count

    if (!count) {
      count = 1
    }

    ```


    **Forma Simplificada:**


    ```javascript

    let count

    count ||= 1

    ```


    ### 12. Avaliação de Curto-Circuito para Chamada de Função:


    **Aplicação:** Prevenção de Execução Desnecessária de Função


    **JavaScript Padrão:**


    ```javascript

    function fetchData() {
      if (shouldFetchData) {
        return fetchDataFromAPI()
      } else {
        return null
      }
    }

    ```


    **Forma Simplificada:**


    ```javascript

    function fetchData() {
      return shouldFetchData && fetchDataFromAPI()
    }

    ```


    Cabô!!


    Implemente essas formas abreviadas em seu código e observe como suas
    habilidades em JavaScript se expandem.


    Até a proxima.
---

