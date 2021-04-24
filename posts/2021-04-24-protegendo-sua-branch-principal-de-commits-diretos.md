---
type: post
title: Protegendo sua branch principal de "commits" diretos
description: A ideia com esse post é fazer com que todos os commits sejam
  enviados para branch principal através de PRs, dado que agora sempre rodamos
  os testes nele.
date: 2021-04-23 09:00:10
category: devops
tags:
  - branch
  - github
  - commits
---
Continuando nossas alterações feitos neste [repositório](https://github.com/lucasmarques73/node-api-heroku). Já criamos [testes para nossa API](https://lucasmarques.dev/criando-testes-para-api-node/) e fizemos nos [testes rodarem automaticamente com o Github Actions](https://lucasmarques.dev/criando-um-pipeline-com-github-action/). Agora vamos proteger nossa branch para que não seja permitidos commits diretamenta na nossa branch principal.

## Por que isso é tão importante?
