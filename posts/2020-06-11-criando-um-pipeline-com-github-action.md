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