---
type: post
title: Criando um pipeline com Github Action
description: Neste post vamos mostrar o qué um pipeline e aprender a criar um
  usando GithubActions.
date: 2021-04-03 05:31:51
category: devops
tags:
  - github
  - github actions
  - pipeline
  - devops
---
Antes de mais nada, devemos saber o qué um pipeline quando falamos de software e porque ele é importante.   
Após isso, vamos criar um pipeline do zero utilizando Github Actions, a ideia é usar esse pipeline para rodar nossos testes e colocar nosso código em produção.

## O quê é um pipeline?
Segundo um artigo postado pela [Red Hat](https://www.redhat.com/pt-br/topics/devops/what-cicd-pipeline), "Um pipeline de CI/CD consiste em uma série de etapas a serem realizadas para a disponibilização de uma nova versão de um software."  
O pipeline, nada mais é que um arquivo, onde declaramos essas etapas e a ferramenta que utilizarmos vai executando cada passo. Os principais passos desse arquivo são:
* **Preparação do ambiente**: em nosso caso, definimos a versão do Node que vai ser executada, instalamos as dependências e etc.
* **Testes**: após o ambiente preparado, nós vamos executar nossos testes. Eles podem ser vários e geralmente executados em paralelo.
* **Implantação**: com nosso código validado, subimos ele para nosso ambiente. Ele pode ser um ambiente de validação, caso dependa de alguma aprovação de negócio, ou de produção, quando tudo já está validado.

