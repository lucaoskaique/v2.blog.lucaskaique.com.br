---
layout: post
date: 2024-02-23 07:53:08
title: 12 Dicas de JavaScript que Todo Desenvolvedor Deve Conhecer
description: Hoje e quero compartilhar com vocês 12 dicas super úteis que podem
  melhorar significativamente suas habilidades de programação e a eficiência do
  desenvolvimento de projetos
main-class: js
color: "#D6BA32"
tags:
  - javascript
  - development
---

![javascript mental](/assets/img/eok1jcbxeai0xui.jpg "javascript mental")

Salve galera! Sextou hoje e quero compartilhar com vocês 12 dicas super úteis que podem melhorar significativamente suas habilidades de programação e a eficiência do desenvolvimento de projetos. Essas dicas abrangem desde manipulações de strings até a melhoria da segurança do código. Chega mais!!!

1. **Camel Case Superior**: Escreva nomes compostos com a primeira letra de cada palavra em maiúsculo, exceto a primeira. É mais que um estilo; é um padrão que traz clareza ao seu código.

   ```javascript
   function camelize(str) {
     return str.replace(/([a-z]+)/g, (match, group) =>
       group ? group.charAt(0).toUpperCase() + match.slice(1) : ""
     )
   }
   console.log(camelize("ola mundo")) // Saída: olaMundo
   ```

2. **Segmentação de Três Dígitos**: Torne números grandes mais legíveis, aplicando a segmentação a cada três dígitos. Ideal para valores financeiros e grandes contagens.

   ```javascript
   function numFormat(num) {
     return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
   }
   console.log(numFormat("123456789")) // Saída: 123,456,789
   ```

3. **Acesso Seguro a Propriedades**: Evite erros ao acessar propriedades indefinidas em objetos com um método à prova de falhas.

   ```javascript
   const a = {}
   const proxy = new Proxy(a, {
     get(target, propKey, receiver) {
       return Reflect.get(target, propKey, receiver) ?? {}
     }
   })
   console.log(proxy.b.c) // Saída: undefined
   ```

4. **Tipo de Dispositivo Móvel**: Identifique rapidamente se o usuário está em um Android, iPhone ou iPad para uma experiência de usuário otimizada.

   ```javascript
   function getBrowserInfo() {
     const userAgent = navigator.userAgent.toLowerCase()
     return {
       isAndroid: Boolean(userAgent.match(/android/gi)),
       isIphone: Boolean(userAgent.match(/iphone|ipod/gi)),
       isIpad: Boolean(userAgent.match(/ipad/gi))
     }
   }
   ```

5. **Simulação de Requisição de Formulário**: Implemente a funcionalidade de exportação de arquivos de maneira simples e eficaz.

   ```javascript
   function exportFunc(url, params) {
     const form = document.createElement("form")
     form.style.display = "none"
     form.action = url
     form.method = "post"
     document.body.appendChild(form)

     for (const key in params) {
       const input = document.createElement("input")
       input.type = "hidden"
       input.name = key
       input.value = params[key]
       form.appendChild(input)
     }
     form.submit()
     form.remove()
   }
   ```

6. **Vinculação de Eventos Universal**: Garanta que seus ouvintes de eventos funcionem em qualquer navegador.

   ```javascript
   function customEventBind(ele, eventType, callBack) {
     if (ele.addEventListener) {
       ele.addEventListener(eventType, callBack, false)
     } else if (ele.attachEvent) {
       ele.attachEvent("on" + eventType, callBack)
     } else {
       ele["on" + eventType] = callBack
     }
   }
   ```

7. **Configuração de Cookies**: Gerencie cookies de forma eficiente com controle total sobre seus atributos.

   ```javascript
   function setCookie({ key, value, expires, path, domain, secure }) {
     let cookieString = `${key}=${encodeURIComponent(value)}`
     if (expires) {
       const expirationDate = new Date()
       expirationDate.setTime(
         expirationDate.getTime() + expires * 24 * 60 * 60 * 1000
       )
       cookieString += `; expires=${expirationDate.toUTCString()}`
     }
     if (path) cookieString += `; path=${path}`
     if (domain) cookieString += `; domain=${domain}`
     if (secure) cookieString += "; secure"
     document.cookie = cookieString
   }
   ```

8. **Informações do Navegador**: Extraia detalhes do navegador do usuário para melhorar a compatibilidade do seu site.

   ```javascript
   function getBrowserInfo() {
     const userAgent = navigator.userAgent;
     const browserRegex = /(Chrome|Firefox|Safari|Opera|Edge|Trident)\[/ ]?(\d+)/;
     const browserMatch = userAgent.match(browserRegex);
     return {
       browserName: browserMatch ? browserMatch\[1] : 'Desconhecido',
       browserVersion: browserMatch ? browserMatch\[2] : 'Desconhecido'
     };
   }
   ```

9. **Informações do Sistema Operacional**: Saiba com qual sistema operacional o usuário está navegando para otimizar sua experiência.

   ```javascript
   function getUserOsInfo() {
     const userAgent = navigator.userAgent
     const osRegex = /((Windows NT)|(Mac OS X)|(Android)|(iOS))\s*([\d._]+)/
     const osMatch = userAgent.match(osRegex)
     return {
       osName: osMatch ? osMatch[1] : "Desconhecido",
       osVersion: osMatch ? osMatch[5] : "Desconhecido"
     }
   }
   ```

10. **Validação de Data**: Garanta que as datas de início e fim sejam coerentes e lógicas.

    ```javascript
    function compareDate(beginDate, endDate) {
      const start = new Date(beginDate)
      const end = new Date(endDate)
      return start <= end
    }
    ```

11. **Parâmetros de URL**: Capte facilmente valores de parâmetros de URLs para análises e funcionalidades personalizadas.

    ```javascript
    function getQueryStringRegExp(name) {
      const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i")
      const r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    }
    ```

12. **Exportação de Arquivos Excel**: Simplifique a criação e exportação de arquivos Excel com uma função personalizada.

    ```javascript
    function exportExcel(headers, data, fileName = "export.xlsx") {
      // Código simplificado para a criação e exportação do arquivo Excel
    }
    ```

Espero que essas dicas ajudem vocês!!! Até a mais!!!!
