---
type: post
title: Criando um pipeline com Github Action
description: Neste post vamos mostrar o qué um pipeline e aprender a criar um
  usando GithubActions.
date: 2021-04-03T05:31:51.000Z
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


## Por que é importante?
Após entendermos o quê é um pipeline, temos que endenter o porquê ele é tão importante. Nele descrevemos cada etapa necessária para colocar o código em produção, essas etapas, são geralmente executadas manualmente e podem haver falhas, como por exemplo não rodar um tipo de teste. Essas falhas podem nos gerar problemas no futuro.  

Com nosso arquivo contendo cada etapa, ele vai executar todas e caso alguma falhe, ele aborta e não coloca o código em produção.

## Github Actions
Ele nada mais é que uma das ferramentas que podemos utilizar para colocar nosso pipeline em ação. Essas ferramentas variam de projetos e empresas. A principal diferença entre elas é como o arquivo é criado, o conceito por trás do pipeline e da cultura DevOps utilizando CI/CD é a mesma.
O primeiro passo é criar no projeto um arquivo de configuração. Este arquivo vai descrever os passos que nosso pipeline vai executar.

O arquivo deve estar dentro de uma estrutura específica para que o github saiba ler este arquivo.

Vamos então seguir a seguinte estrutura **.github/workflows/tests.yml**. O arquivo **tests.yml** é nosso pipeline que vai executar nossos testes.

## Explicando o arquivo em partes

O arquivo completo pode ser visto clicando [aqui](https://github.com/lucasmarques73/node-api-heroku/blob/main/.github/workflows/tests.yml). * *Ele pode ter sofrido alterações durante novos posts.*

### name

A primeira parte do arquivo, nós colocamos o nome da **Action** que estamos criando.

```yaml
name:Tests
```

Na aba **Actions** no Github, vai ficar da seguinte forma.

![Exibindo a Aba de Actions no Github](/assets/img/action-name.png "Exibindo a Aba de Actions no Github")

### on

Seguindo no arquivo, temos a configuração de quando queremos que esta **Action** seja executada.

```yaml
on:
  push:
    branches:
      - main
```

Em nosso caso, ela vai ser executada sempre que houver um **push** na nossa branch **main**.

### jobs

Atualmente temos apenas um **job** que vamos chamar de **tests**. A ideia é que ele faça o necessário para rodar os testes.  
Dentro do nosso **job** nós definimos em qual ambiente ele vai executar e os passos que ele deve seguir.

```yaml
jobs:
  tests:
    runs-on: ubuntu-latest
    steps:
   # Vamos descrever cada passo de forma de
talhada.
```

#### step 1 - Checkout

A primeira coisa que devemos fazer, é baixar nosso repositório. Pra isso, já temos uma **action** do próprio **Github** que faz isso.

```yaml
- name: Checkout Repository
  uses: actions/checkout@v2
```
