---
layout: post
date: 2024-02-11 11:36:36
image: /assets/img/imagem_2024-02-04_202622872.png
title: 3 Técnicas Pessoais Que Transformaram Minha Carreira em Desenvolvimento
description: Sabe quando você começa a codar e só quer que as coisas funcionem?
  Pois é, mas aí você descobre que rola fazer isso de um jeito bem mais top. Tem
  três coisas que, se você começar a usar agora, vão dar um up no seu código
  rapidinho.
main-class: js
color: "#D6BA32"
tags:
  - javascript
  - coding
  - react
categories:
  - javascript
---

![](/assets/img/imagem_2024-02-04_202622872.png "Evoluindo na Programação: Lições de um Full Stack")

### **Evoluindo na Programação: Lições de um Full Stack**

Há quase um ano, entrei numa experiência muito divertida no mundo do desenvolvimento, participando ativamente do Dev em Dobro, ajudando no papel de instrutor e mentor. Durante esse período, não apenas compartilhei conhecimentos e esclareci dúvidas, mas também testemunhei o crescimento impressionante de inúmeros alunos, do zero à competência em desenvolvimento web.

Esta jornada reacendeu reflexões sobre meus próprio inicio na programação. Me lembro dos dias em que, sem uma orientação formal, cada linha de código que funcionava era um motivo de celebrar. Essa abordagem "go horse" no código, embora divertida, muitas vezes me deixava à deriva em um mar de práticas questionáveis e dúvidas horrendas.

Refletindo sobre essa trajetória, identifiquei três princípios fundamentais que teriam acelerado meu progresso e refinado minha abordagem ao desenvolvimento desde o início. São lições que transcenderam minha experiência com desenvolvimento. Aqui estão elas:

#### **1. Escrevendo Código para Humanos**

Na programação, a verdadeira arte eu vejo que é escrever código que seja facilmente compreendido por outros desenvolvedores. No início, muitos escrevem código pensando na máquina, performace e etc, mas a realidade é que nosso público principal são os colegas de equipe que vão ler, entender e modificar esse código. Simplificar a complexidade e priorizar a clareza não é apenas uma questão de cortesia profissional, mas uma habilidade essencial na construção de sistemas robustos e colaborativos.

Esse conceito, embora pareça básico, foi uma verdadeira mudança de paradigma para mim. No início, minha visão de programação era puramente técnica: eu via o código como um meio de instruir o computador, focando em como "falar" com a máquina, todo mundo de todos os cursos e trabalho falavam só sobre performance. Mas, com o tempo, percebi algo fundamental que o código é de dev para dev, não de dev para máquina.

A máquina, no final das contas, vai converte tudo em zeros e uns e não tem a menor preocupação com a legibilidade ou a elegância do código. São os nossos colegas que precisam navegar, entender e, muitas vezes, expandir ou corrigir o que escrevemos.

Vamos ilustrar isso com um exemplo prático: a função `groupBy`.

Primeiro se liga:

```javascript
const groupBy = (arr, groupFn) =>
  arr.reduce(
    (grouped, obj) => ({
      ...grouped,
      [groupFn(obj)]: [...(grouped[groupFn(obj)] || []), obj]
    }),
    {}
  )
```

Aqui, demonstramos que podemos condensar operações complexas em uma única linha. Embora isso possa nos fazer sentir mais experientes, na realidade, torna a compreensão do código muito mais difícil para qualquer pessoa que precise revisá-lo.

Agora, considere esta outra implementação:

```javascript
const groupBy = (arr, groupFn) => {
  const grouped = {}
  for (const obj of arr) {
    const groupName = groupFn(obj)
    if (!grouped[groupName]) {
      grouped[groupName] = []
    }
    grouped[groupName].push(obj)
  }
  return grouped
}
```

Esse código pode ser lido de cima para baixo, e é possível entender instantaneamente o que acontece em cada linha. Ele pode não ter a mesma "elegância" da versão anterior, mas sua legibilidade é imensamente superior. E é justamente isso que valorizamos: um código que qualquer pessoa na equipe possa revisitar no futuro e agradecer pela clareza.

Esse princípio de priorizar a legibilidade não só facilita a manutenção do código como também promove uma cultura de colaboração e aprendizado contínuo entre os desenvolvedores. Portanto, da próxima vez que você se sentar para codar, lembre de que está escrevendo para humanos, não para máquinas.

#### **2. Escondendo Informações Atrás das Cortinas**

Uma das maiores revelações que tive foi a eficácia de abstrair detalhes complexos por trás de funções claras e bem definidas. Isso não apenas melhora a legibilidade do código, mas também sua modularidade. Ao encapsular operações complexas, facilitamos a manutenção e incentivamos a reutilização do código.

Minha passagem pelo Dev em Dobro foi mais do que apenas um período de ensino; foi um lembrete constante do poder da educação contínua e do compartilhamento de conhecimento. Ver desenvolvedores emergentes abraçando esses princípios e aplicando-os em seus projetos reforça a crença de que, independentemente de onde começamos, o crescimento contínuo é sempre possível.

Espero que compartilhando essas lições, possa inspirar outros a refletirem sobre suas práticas de codificação e a buscarem sempre a evolução. Afinal, o desenvolvimento de software é uma jornada sem fim, repleta de aprendizados constantes e oportunidades de melhorar não apenas nossos códigos, mas também a nós mesmos como profissionais e mentores.

Para quem já mexeu com React, os hooks são um exemplo perfeito desse princípio:

```javascript
import React, { useState, useEffect } from "react"

function FriendListItem(props) {
  const [isOnline, setIsOnline] = useState(null)

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline)
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange)
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange)
    }
  })

  return (
    <li style={{ color: isOnline ? "green" : "black" }}>{props.friend.name}</li>
  )
}
```

Nesse caso, temos um componente que mostra um item de lista com a cor dinâmica baseada no status do amigo. Apesar de funcionar direitinho, esse código esconde dentro dele lógicas que não têm muito a ver com o propósito principal do componente `FriendListItem`.

Se a gente pegar essa lógica e criar um hook customizado chamado `useFriendStatus`, dá para simplificar o componente assim:

```javascript
import React, { useState, useEffect } from "react"

function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id)

  return (
    <li style={{ color: isOnline ? "green" : "black" }}>{props.friend.name}</li>
  )
}
```

Isso traz dois benefícios bem legais:

1. A gente pode reutilizar a lógica do `useFriendStatus` em outros lugares.
2. Simplificamos nosso componente para mostrar apenas o que realmente importa para sua funcionalidade.

Falando de um jeito mais amplo, o princípio de esconder informações é sobre colocar detalhes irrelevantes para trás de funções abstratas. Assim, a gente não precisa se preocupar com os detalhes de implementação dentro da função abstrata - podemos focar mais no que ela faz, ou seja, no nome da função que indica seu propósito.

Dessa forma, o código fica mais limpo, fácil de entender e manter, liberando mais tempo para a gente focar na solução dos problemas em vez de decifrar o que cada pedaço do código está fazendo.

#### **3. “Return Early” em Vez de Usar Coisas Aninhadas**

A ultima dica tem a ver especialmente com lidar com validações em rotas de API, é tentador cair na armadilha das condições aninhadas. O padrão "retorne cedo" simplifica a lógica, evitando a complexidade e melhorando a legibilidade do código. Adotar essa prática não só torna o código mais limpo, mas também facilita sua manutenção a longo prazo.

Veja só como geralmente a coisa começa:

```javascript
export const handler = async (req, res) => {
  if (req.method === "POST" || req.method === "OPTIONS") {
    const email = validateEmail(req.body.email)
    if (email) {
      const user = findUserByEmail(email)
      if (user) {
        return res.status(200).json({ user })
      } else {
        return res.status(404).json({ message: "Usuário não encontrado" })
      }
    } else {
      return res.status(422).json({ message: "Faltou o email" })
    }
  } else {
    return res.status(405).json({ message: "Esse método não rola" })
  }
}
```

Esse código pode não estar super complexo, mas já começa a ficar um pouco enrolado. O grande truque aqui é que, em vez de seguir uma linha reta, parece que a gente tá fazendo zig-zag pra entender o fluxo.

Agora, que tal a gente tentar um jeito diferente de escrever isso, utilizando o que chamamos de "Padrão de Retorno Antecipado"? Esse padrão ajuda a cortar o caminho quando algo não está nos conformes, deixando o fluxo mais lógico e direto.

Olha só como poderia ficar:

```javascript
export const handler = async (req, res) => {
  if (req.method !== "POST" && req.method !== "OPTIONS") {
    return res.status(405).json({ message: "Esse método não rola" })
  }

  const email = validateEmail(req.body.email)
  if (!email) {
    return res.status(422).json({ message: "Faltou o email" })
  }

  const user = findUserByEmail(email)
  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado" })
  }

  return res.status(200).json({ user })
}
```

Dessa forma, o código fica mais limpo e a gente consegue entender o que tá acontecendo passo a passo, de uma maneira bem mais tranquila. Ao invés de um monte de condicionais aninhados, a gente vai direto ao ponto e trata cada caso separadamente, deixando o caminho livre até chegar no resultado que a gente quer lá no final.

---

E﻿spero que essas dicas tenham sido úteis e que essas pequenas dicas te engrandeçam na sua jornada de estudos
