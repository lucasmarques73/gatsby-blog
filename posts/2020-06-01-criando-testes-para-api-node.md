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
No post anterior, nós [criamos uma api node e colocamos ela online na Heroku](https://lucasmarques.dev/deploy-de-uma-api-node-na-heroku/). Agora, vou demonstrar como podemos fazer testes de api para ela.  
Antes de criar os testes, é bom nós entendermos o quê é testes de Api.  

O teste de Api, consiste em simularmos chamadas em nossos endpoits, como nosso front-end faria, e comparar o resultado que veio, com o nosso resultado esperado. Se nosso endpoint se comporta como esperado, o teste vai passar. Devemos também, testar cenários onde quem consome nossa Api passe dados inválidos e todas as condições esperadas para esse endpoint.  

Por exemplo, temos uma rota que busca usuários por id. Devemos ter um teste para quando encontramos o usuário esperado, quando não encontramos o usuário, se há validações do id, devemos ter um teste onde passamos um id inválido e ele retorne a resposta esperada.

Agora que já explicamos algumas coisas, vamos para o código.  
Este projeto está no [github](https://github.com/lucasmarques73/node-api-heroku)

Separamos ele em quatro arquivos.

## app.js

Neste arquivo vai estar descrito nossas routas e cada método deve ser executado para cada uma. Repare que temos uma rota que busca todos os usuários e uma que busca usuários por id. Outro detalhe importante, não iniciamos nosso servidor neste arquivo, exportamos nosso app para podermos testar ele.
```javascript
const express = require("express");
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json());

const users = require("./users");

app.get("/", (_, res) => res.send("Ok"));
app.get("/health", (_, res) => res.send("Healthy"));
app.get("/users", (_, res) => res.send(users));
app.get("/users/:id", (req, res) => {
  const user = users.find((element) => element.id === Number(req.params.id));

  if (typeof user === "undefined") return res.sendStatus(404);

  return res.send(user);
});

module.exports = app;
```
## users.js

 Atualmente os usuários são uma constante com um array de usuários.
```javascript
const users = [
  { id: 1, name: "João" },
  { id: 2, name: "Mateus" },
  { id: 3, name: "José" },
];

module.exports = users;
```
## index.js

Neste arquivo que nós importamos nosso app e rodamos nosso servidor.
```javascript
const app = require("./app");
const port = 3000;

app.listen(process.env.PORT || port, () =>
  console.log(`Server running in ${port}`)
);
```
Agora nossa aplicação está com mais recursos, foram adicionas mais rotas e assim começamos a ter mais responsabilidade em nosso projeto.
Uma boa estratégia agora, é garantir que nosso código funciona. Garantir que quando eu peça um usuário de um determinado id, ele me devolva o usuário correto. Pode parecer simples, dado nossa implementação, mas nosso teste vai garantir que caso alguém altere a regra de como buscamos nossos usuários por id, ele ainda continue devolvendo o usuário correto.  
E assim, vamos escrever testes para todas nossas rotas.

## app.test.js

Vou quebrar este arquivo para que a explicação possa ficar o mais claro possível.

### Pacotes necessários

Antes de mais nada, vamos instalar os pacotes necessários para testarmos nossos testes.  
Neste projeto vamos utilizar o [jest](https://jestjs.io/) como nosso framework de testes. E para simular as requesições em nosso projeto. O pacote [supertest](https://www.npmjs.com/package/supertest) foi utilizado.

Para instalar esses pacotes.
```sh
npm install --save-dev jest supertest
```

### Imports corretos

Então, vamos importar o pacote dos testes, o nosso app propriamente dito e nossos usuários para facilitar na hora de comparar os dados vindos da api com os dados que estão simulando nossa base de dados.

```javascript
// we will use supertest to test HTTP requests/responses
const request = require("supertest");
const app = require("./app");

const users = require("./users");

```
Com tudo importado, podemos iniciar a escrever nossos testes para cada rota que nós temos, validando se as repostas recibidas são as respostas esperadas.

#### Testando a rota "/"

```javascript
describe("GET / ", () => {
  test("It should respond with an Ok", async () => {
    const response = await request(app).get("/");
    expect(response.text).toEqual("Ok");
    expect(response.statusCode).toBe(200);
  });
});
```

#### Testando a rota "/health"
```javascript
describe("GET /health ", () => {
  test("It should respond with an Healthy", async () => {
    const response = await request(app).get("/health");
    expect(response.text).toEqual("Healthy");
    expect(response.statusCode).toBe(200);
  });
});
```
#### Testando a rota "/users"
```javascript
describe("GET /users ", () => {
  test("It should respond with an array of users", async () => {
    const response = await request(app).get("/users");
    expect(response.body).toEqual(users);
    expect(response.statusCode).toBe(200);
  });
});
```
#### Testando a rota "/users/:id"
```javascript
describe("GET /users/:id ", () => {
  const expectedUser = { id: 2, name: "Mateus" };

  test(`It should respond with an user id ${expectedUser.id}`, async () => {
    const response = await request(app).get(`/users/${expectedUser.id}`);
    expect(response.body).toEqual(expectedUser);
    expect(response.statusCode).toBe(200);
  });

  test(`It should respond with not found user status code`, async () => {
    const unexpectedId = 99;
    const response = await request(app).get(`/users/${unexpectedId}`);
    expect(response.statusCode).toBe(404);
  });
});
```