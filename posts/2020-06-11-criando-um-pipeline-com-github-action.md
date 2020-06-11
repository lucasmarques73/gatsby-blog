---
type: post
title: Criando um pipeline com Github Action
description: Nest post vou demonstrar como criar um pipeline com Github Action
  para nossa API Node, protegendo nossa branch master e fazer com que os nossos
  testes de API rodem dentro dela gerando relatório de cobertura do código.
date: 2020-06-11T11:48:16.000Z
category: devops
tags:
  - github
  - node
  - testes
  - api
  - coveralls
  - ""
---
No post anterior nós \[criamos testes para nossa API Node](https://lucasmarques.dev/criando-testes-para-api-node/) mas ainda é possível alterar o código atual, quebrando alguns testes e subir esse código para produção pois não é um requisito rodar os testes antes de subir qualquer coisa.

A ideia neste post é proteger nossa branch master de receber commits diretamente, isso significa que ela só vai receber código através de \*\*pull request\*\*. Mas isso ainda não é suficiente, dado que podemos abrir um PR sem rodar os testes e ainda sim colocar código quebrado em produção.  

Então, como podemos melhorar essa segurança, garantindo que o código que vai entrar, pelo menos não está quebrando o código já existente?  

A resposta, neste caso, é com \[Github Actions](https://github.com/features/actions). Com essa ferramenta, junto com algumas configurações no Github, vamos rodar todos nossos testes para cada PR aberto e caso algum teste falhe, ele não vai permitir este novo código.  

Outras coisas que faremos, é utilizar o \[Coveralls](https://coveralls.io/) para termos um relatório de cobertura do código, ele vai nos trazer, por exemplo, a porcentagem de código que está coberta por testes, e podemos utilizar essa métrica para aceitar ou não um PR.