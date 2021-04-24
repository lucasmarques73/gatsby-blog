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
Continuando nossas alterações feitos neste [repositório](https://github.com/lucasmarques73/node-api-heroku). Já criamos [testes para nossa API](https://lucasmarques.dev/criando-testes-para-api-node/) e fizemos nos [testes rodarem automaticamente com o Github Actions](https://lucasmarques.dev/criando-um-pipeline-com-github-action/). Agora vamos proteger nossa branch para que não sejam permitidos commits diretamente na nossa branch principal.

## Por que isso é tão importante?

No meu ponto de vista, isso é importante pelo motivo de eu considerar a branch principal um local onde deve sempre estar o código de produção. Não devemos inserir códigos incompletos, ou sem testes, etc.\
Não que isso possa ser inserido através de um PR, mas com um PR, temos uma revisão do código, para ajudar a impedir esse tipo de situação.\
Eu mesmo não faço isso em todos os meus projetos, mas sempre que estou alterando algo grande, eu abro um PR e reviso. **Devemos sempre evitar possíveis bugs em nosso código**.

## Como fazer isso no Github?

Primeiro passo é garantir que você tenha acesso para fazer isso no Github. Basta irmos em **Settings → Branches** como na imagem abaixo.

![Configurações de Branches dentro do Github](/assets/img/settigns-branches.png "Configurações de Branches dentro do Github")

