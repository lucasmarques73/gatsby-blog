---
type: post
title: Criando um pipeline com Github Action
description: Nest post vou demonstrar como criar um pipeline com Github Action
  para nossa API Node, protegendo nossa branch master e fazer com que os nossos
  testes de API rodem dentro dela gerando relatório de cobertura do código.
date: 2020-07-08T05:31:28.000Z
category: devops
tags:
  - github
  - node
  - testes
  - api
  - coveralls
---
No post anterior nós [criamos testes para nossa API Node](https://lucasmarques.dev/criando-testes-para-api-node/), mas ainda é possível alterar o código atual, quebrando alguns testes e subir esse código para produção pois não é um requisito rodar os testes antes de subir qualquer coisa.

A ideia neste post é proteger nossa branch principal de receber commits diretamente, isso significa que ela só vai receber código através de **pull request**. Mas isso ainda não é suficiente, dado que podemos abrir um PR sem rodar os testes e ainda sim colocar código quebrado em produção.  

Então, como podemos melhorar essa segurança, garantindo que o código que vai entrar, pelo menos não está quebrando o código já existente?  

A resposta, neste caso, é com [Github Actions](https://github.com/features/actions). Com essa ferramenta, junto com algumas configurações no Github, vamos rodar todos nossos testes para cada PR aberto e caso algum teste falhe, ele não vai permitir este novo código.  

Outras coisas que faremos, é utilizar o [Coveralls](https://coveralls.io/) para termos um relatório de cobertura do código, ele vai nos trazer, por exemplo, a porcentagem de código que está coberta por testes, e podemos utilizar essa métrica para aceitar ou não um PR.

## O que é com o Github Actions?

Como a própria definição diz, é um automatizador de tarefas para colocar sua ideia em produção.\
Para nós, ele vai automatizar a execução dos testes.

## Começando com Github Actions

O primeiro passo é criar no projeto um arquivo de configuração. Este arquivo vai descrever os passos que nosso pipeline deve executar, dentro dele podemos ter alguns passos com integrações, como por exemplo, a integração com o Coveralls. 

O arquivo deve estar dentro de uma estrutura específica para que o github saiba ler este arquivo.

Vamos então seguir a seguinte estrutura **.github/workflows/tests.yml**. O arquivo **tests.yml** é nosso pipeline que vai executar nossos testes.

## Explicando o arquivo em partes

### name
A primeira parte do arquivo, nós colocamos o nome da **Action** que estamos criando.

```yml
name:Tests
```

Na aba **Actions** no Github, vai ficar da seguinte forma.

![Exibindo a Aba de Actions no Github](/assets/img/action-name.png "Exibindo a Aba de Actions no Github")

### on
Seguindo no arquivo, temos a configuração de quando queremos que esta **Action** seja executada.
```yml
on:
  pull_request:
    types: [opened, synchronize, reopened]
  push:
    branches:
      - main
```
Em nosso caso, ela vai ser executada sempre que um **Pull Request** for aberto, atualizado ou reaberto. E sempre que houver um **push** na nossa branch **main**.

### jobs

Atualmente temos apenas um **job** que vamos chamar de **tests**. A ideia é que ele faça o necessário para rodar os testes em todos os caso que colocamos anteriormente.  
Dentro do nosso **job** nós definimos em qual ambiente ele vai executar e os passos que ele deve seguir.
```yml
jobs:
  tests:
    runs-on: ubuntu-latest
    steps:
   # Vamos descrever cada passo de forma de
talhada.
```
#### step 1 - Checkout

A primeira coisa que devemos fazer, é baixar nosso repositório. Pra isso, já temos um pacote do próprio **Github** que faz isso.
```yml
- name: Checkout Repository
        uses: actions/checkout@v2
```
#### step 2 - Setup NodeJS
No próximo passo nós configuramos o **NodeJS** para executarmos nosso projeto.
```yml
- name: Setup Node.js
        uses: actions/setup-node@v1
        with:
          node-version: "12.x"
```
Também temos um pacote pra isso, e também definimos qual a versão do **NodeJS** vamos utilizar.

#### step 3 - Prepare Cache
Este passo é uma boa prática quando criamos esteiras de integreção contínua. Nele vamos configurar para fazer **cache** dos pacotes que são dependências do projeto. Assim, sempre que instalarmos, o processo será mais rápido pois não vai baixar denovo.
```yml
- name: Prepare cache
        uses: actions/cache@v2
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-
```

#### step 4 - Install Dependencies
Com tudo preparado, vamos instalar as dependências do nosso projeto.  
Um ponto interessante, não utilizamos `npm install`, utilizamos `npm ci`. Ele é similar ao anterior, mas é recomendado para processo automáticos, mais [infos](https://docs.npmjs.com/cli/ci.html)