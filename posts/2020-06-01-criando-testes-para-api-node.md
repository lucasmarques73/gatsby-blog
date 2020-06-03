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

Agora que já explicamos algumas coisas, vamos para o código.  
Este projeto está no [github](https://github.com/lucasmarques73/node-api-heroku)

Separamos ele em quatro arquivos.

*app.js* Neste arquivo vai estar descrito nossas routas e cada método deve ser executado para cada uma. Repare que temos uma rota que busca todos os usuários e uma que busca usuários por id.
```javascript
// app.js
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
*users.js* Atualmente os usuários são uma constante com um array de usuários.
```javascript
// users.js
const users = [
  { id: 1, name: "João" },
  { id: 2, name: "Mateus" },
  { id: 3, name: "José" },
];

module.exports = users;
```
```javascript
const app = require("./app");
const port = 3000;

app.listen(process.env.PORT || port, () =>
  console.log(`Server running in ${port}`)
);
```
```javascript
// we will use supertest to test HTTP requests/responses
const request = require("supertest");
const app = require("./app");

const users = require("./users");

describe("GET / ", () => {
  test("It should respond with an Ok", async () => {
    const response = await request(app).get("/");
    expect(response.text).toEqual("Ok");
    expect(response.statusCode).toBe(200);
  });
});

describe("GET /health ", () => {
  test("It should respond with an Healthy", async () => {
    const response = await request(app).get("/health");
    expect(response.text).toEqual("Healthy");
    expect(response.statusCode).toBe(200);
  });
});

describe("GET /users ", () => {
  test("It should respond with an array of users", async () => {
    const response = await request(app).get("/users");
    expect(response.body).toEqual(users);
    expect(response.statusCode).toBe(200);
  });
});

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