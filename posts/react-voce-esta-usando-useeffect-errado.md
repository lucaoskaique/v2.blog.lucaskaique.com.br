---
layout: post
date: 2024-01-29 04:09:41
image: /assets/img/the-laptop-in-the-dark-is-illuminated-by-the-light-in-the-style-of-colorful-minimalism-post-processing-bold-chromaticity-kodak-aerochrome-melting-colourful-light-cyan-and-orange-.png
title: "React: Você está Usando useEffect() Errado"
description: "React: Você está Usando useEffect() Errado, Faça Isso em Vez Disso"
main-class: js
color: "#D6BA32"
tags:
  - react
  - js
  - hooks
  - dicas
categories:
  - react
  - hooks
---

Uma vez que se decide avançar com o aprendizado do **React**, hooks estão entre as primeiras coisas a aprender (e se frustrar). Hooks são partes essenciais do **React**, já que foram criados para resolver vários problemas que apareceram nas primeiras versões do **React**, quando todo o render era feito dentro das funções do ciclo de vida do componente, como **componentDidMount()**, **componentWillMount()**, **componentDidUpdate()**.

Dito isso, os primeiros hooks que todos começam a usar são **useState()** e **useEffect()**. O primeiro é usado para gerenciamento de estado e controle de quando o componente deve ser renderizado novamente, enquanto o segundo se comporta de forma um tanto semelhante às funções do ciclo de vida mencionadas acima.

O hook **useEffect()** pode receber dois parâmetros: o primeiro é uma função de retorno de chamada, enquanto o segundo é opcional e define quando esse hook deve ser chamado.

```javascript
  useEffect((prevProps) => { // prevProps são opcionais e têm alguns usos específicos. Compare com o que acontece com as funções do ciclo de vida.
    // Conteúdo da função personalizada…
    conteúdo da função personalizada…

    return () => {
      // Código para executar quando o componente é desmontado ou quando as dependências mudam
      // Ajuda a evitar vazamentos de memória e comportamento inesperado
    };
  }, [dependências em forma de array]);
```

Um ponto que confunde muitos iniciantes é como o segundo parâmetro funciona. Aqui está um resumo:

> Caso A: Se nada for adicionado, então **useEffect** será executado a cada mudança de estado dentro do componente atual.
>
> _Caso B: Se um array vazio for adicionado (\[]), então o **useEffect** será executado apenas uma vez quando o componente for montado._
>
> _Caso C: Se algum array for fornecido (\[estado]), então **useEffect** será executado toda vez que o estado mudar._
>
> _Caso D: Se algum array for fornecido (\[estado1, estado2, …], **useEffect** será executado toda vez que **QUALQUER** um desses estados mudar._

Agora que revisamos como o **useEffect** funciona, é essencial aprofundar-se em uma técnica de otimização conhecida como _memoização_. _Memoização_ ajuda a prevenir renderizações desnecessárias e pode melhorar significativamente o desempenho dos seus componentes, especialmente ao lidar com arrays de dependências no **useEffect**.

A ideia principal do hook **useEffect** é sincronizar a transferência de dados com **APIs** externas ou outro sistema, como quando você está acessando um banco de dados ou esperando que uma requisição **HTTP** seja completada. O problema é que tendemos a usar esse hook em toda situação possível dentro do nosso código, especialmente nos _Casos A_ e C mencionados acima, e o código pode se tornar incrivelmente ilegível com apenas algumas linhas de código, incluindo disparar um loop se você mudar um dos estados no array de dependências durante o processo.

Isso também pode tornar seu código ineficiente, já que o useEffect funciona como se você estivesse se afastando para executar algum código e depois voltando para a thread principal. Isso poderia ser mais eficiente.

Ótimo, agora você sabe que, às vezes, **useEffect** não é a melhor solução. Agora vamos olhar cada caso em detalhe.

Vamos falar sobre cada um dos casos de uso em detalhe:

> Caso A — Sem array de dependência: Este deve ser abolido do seu código, pois certamente disparará cálculos desnecessários toda vez que um estado mudar. Neste caso, você deve especificar quais estados realmente devem disparar essa função usando um array de dependências.
>
> _Caso B — Array de dependência vazio: Este é um dos bons, a única recomendação que posso fornecer é manter apenas um destes para cada componente e envolver seu conteúdo em uma função._
>
> _Caso C — Apenas um estado de dependência. Está ok usar se você está processando dados externos. Caso contrário, você deve mudá-lo para a solução que irei fornecer abaixo._
>
> _Caso C_ — Múltiplos estados de dependência no mesmo **useEffect**. Este é o que considero o mais problemático. Recomendo que você tente desembaraçar os estados em diferentes hooks useEffect antes de qualquer coisa, pois isso torna seu código muito ilegível.

Agora para a solução que prometi. Vamos considerar estes dois Componentes (Pai e Filho):

```javascript
// ParentComponent.js
import React, { useState, useEffect } from 'react';
import ChildComponent from './ChildComponent';

function ParentComponent() {
  const [contagem, setContagem] = useState(0);
  const [mensagem, setMensagem] = useState('Olá do Pai!');

useEffect(() => {
 setMensagem(`Botão clicado ${contagem} vezes!`);
},[contagem]}

  return (
      <ChildComponent contagem={contagem} mensagem={mensagem} setContagem={setContagem} />
  );
}

export default ParentComponent;

// ChildComponent.js
import React from 'react';

function ChildComponent({ contagem, mensagem, setContagem }) {
  return (
    <div>
      <h3>Componente Filho</h3>
      <p>Contagem recebida do Pai: {contagem}</p>
      <p>Mensagem recebida do Pai: {mensagem}</p>
      <button onClick={() => {setContagem(contagem+1)}>Clique em mim</button>
    </div>
  );
}

export default ChildComponent;
```

Agora vamos explicar o que está acontecendo aqui:

> 1 — Uma vez que o usuário clica no botão no Componente Filho, mudamos o estado "contagem" incrementando 1. Isso levará um ciclo de renderização para acontecer e mudar o estado.
>
> _2 — Uma vez que o estado "contagem" muda, o componente filho será renderizado novamente e também disparará o hook **useEffect** em ambos os componentes, o que disparará a mudança no estado "mensagem". Novamente, isso só acontecerá no próximo render._
>
> _3 — Quando o estado "mensagem" muda, então outra renderização acontece nos componentes mudando a mensagem._
>
> _Neste caso, acabamos tendo duas renderizações. Pode não parecer muito, mas pode crescer em grande escala uma vez que você tem mais estados em jogo._
>
> _Agora veja o que acontece quando fazemos as seguintes mudanças nos componentes:_

```javascript
// ParentComponent.js
import React, { useState } from 'react';
import ChildComponent from './ChildComponent';

function ParentComponent() {
  const [contagem, setContagem] = useState(0);
  const [mensagem, setMensagem] = useState('Olá do Pai!');
const incrementarContagem = () => {
 setContagem(contagem + 1);
setMensagem(`Botão clicado ${contagem + 1} vezes!`);
}

  return (
      <ChildComponent contagem={contagem} mensagem={mensagem}
        callbackFunction={incrementarContagem} />
  );
}

export default ParentComponent;

// ChildComponent.js
import React from 'react';

function ChildComponent({ contagem, mensagem, callbackFunction }) {
  return (
    <div>
      <h3>Componente Filho</h3>
      <p>Contagem recebida do Pai: {contagem}</p>
      <p>Mensagem recebida do Pai: {mensagem}</p>
      <button onClick={callbackFunction}>Clique em mim</button>
    </div>
  );
}

export default ChildComponent;
```

Mudamos o código para passar uma **Função de Retorno de Chamada** para o Componente Filho. Você pode notar que:

> - Não temos mais um useEffect definido no Componente Pai. Isso torna o código mais fácil de ler, já que podemos entender nosso código como, digamos, mais linear e de um único thread do que o original.
> - _Não precisamos esperar dois ciclos de renderização para exibir nossa mensagem final, ou pior, renderizar ambos os componentes duas vezes._
> - _Podemos separar preocupações entre componentes, tornando-os mais reutilizáveis e mais fáceis de ler ou adaptar, já que podemos colocar o que quisermos na função de retorno de chamada._
> - _Ambos os estados mudam ao mesmo tempo, evitando o encadeamento de declarações **useEffect**._

Em conclusão, os insights fornecidos aqui oferecem orientação valiosa, mas é importante reconhecer que desenvolvimento de software é uma área dinâmica, e as soluções serão sempre as mesmas para sempre. O hook useEffect é uma parte importante do React, mas nem sempre é a melhor solução.

Obrigado pela leitura!

T﻿ranslated from \[[https://blog.stackademic.com/why-you-should-avoid-using-useeffect-hook-in-react-and-what-to-do-instead-740660e33420]](https://blog.stackademic.com/why-you-should-avoid-using-useeffect-hook-in-react-and-what-to-do-instead-740660e33420)
