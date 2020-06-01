---
type: post
title: Criando testes para Api Node
description: Nest post vou demonstrar como criar teste de Api para nossa Api Node
date: 2020-06-01T07:42:53.000Z
category: js
tags:
  - testes
  - js
  - jest
  - supertest
---
No post anterior, nós \[criamos uma api node e colocamos ela online na Heroku](https://lucasmarques.dev/deploy-de-uma-api-node-na-heroku/). Agora, vou demonstrar como podemos fazer testes de api para ela.  \
Antes de criar os testes, é bom nós entendermos o quê é testes de Api.  

O teste de Api, consiste em simularmos chamadas em nossos endpoits, como nosso front-end faria, e comparar o resultado que veio, com o nosso resultado esperado. Se nosso endpoint se comporta como esperado, o teste vai passar. Devemos também, testar cenários onde quem consome nossa Api passe dados inválidos e todas as condições esperadas para esse endpoint.  

Por exemplo, temos uma rota que busca usuários por id. Devemos ter um teste para quando encontramos o usuário esperado, quando não encontramos o usuário, se há validações do id, devemos ter um teste onde passamos um id inválido e ele retorne a resposta esperada.