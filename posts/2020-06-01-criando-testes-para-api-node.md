---
type: post
title: Criando testes para Api Node
description: Nest post vou demonstrar como criar teste de Api para nossa Api Node
date: 2020-06-08T03:57:46.000Z
image: /assets/img/npm-t-.png
category: js
tags:
  - testes
  - js
  - jest
  - supertest
---
No post anterior, nós [criamos uma api node e colocamos ela online na Heroku](https://lucasmarques.dev/deploy-de-uma-api-node-na-heroku/). Agora, vou demonstrar como podemos fazer testes de api para ela.\
Antes de criar os testes, é bom nós entendermos o quê é testes de Api.  

O teste de Api, consiste em simularmos chamadas em nossos endpoints, como nosso front-end faria, e comparar o resultado que veio, com o nosso resultado esperado. Se nosso endpoint se comporta como esperado, o teste vai passar. Devemos também, testar cenários onde quem consome nossa Api passe dados inválidos e todas as condições esperadas para esse endpoint.  

Por exemplo, temos uma rota que busca usuários por id. Devemos ter um teste para quando encontramos o usuário esperado, quando não encontramos o usuário, se há validações do id, devemos ter um teste onde passamos um id inválido e ele retorne a resposta esperada.

Agora que já explicamos algumas coisas, vamos para o código.\
Este projeto está no [github](https://github.com/lucasmarques73/node-api-heroku)

Separamos ele em quatro arquivos.

## app.js

Neste arquivo vai estar descrito nossas rotas e cada método que deve ser executado para cada uma. Repare que temos uma rota que busca todos os usuários e uma que busca usuários por id. Outro detalhe importante, não iniciamos nosso servidor neste arquivo, exportamos nosso app para podermos testar ele.

```javascript
const express = require("express");
const app = express();

app.use(express.json());

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

Agora nossa aplicação está com mais recursos, foram adicionas mais rotas e assim começamos a ter mais responsabilidades em nosso projeto. Uma boa estratégia agora, é garantir que nosso código funciona. Garantir que quando eu peça um usuário de um determinado id, ele me devolva o usuário correto. Pode parecer simples, dado nossa implementação, mas nosso teste vai garantir que caso alguém altere a regra de como buscamos nossos usuários por id, ele ainda continue devolvendo o usuário correto.\
E assim, vamos escrever testes para todas nossas rotas.

## app.test.js

Vou quebrar este arquivo para que a explicação possa ficar o mais claro possível.

### Pacotes necessários

Antes de mais nada, vamos instalar os pacotes necessários para executarmos nossos testes.\
Neste projeto vamos utilizar o [jest](https://jestjs.io/) como nosso framework de testes. E para simular as requesições em nosso projeto. O pacote [supertest](https://www.npmjs.com/package/supertest) foi utilizado.

Para instalar esses pacotes.

```shell
npm install --save-dev jest supertest
```

### Explicando as funções usadas no arquivo de testes

#### describe

Utilizamos esta função para agrupar alguns casos de testes, podemos ver isso melhor pela frente.  
Podemos também, dentro de um describe, preparar nossos cenários de testes, com mocks e algumas chamadas de métodos

#### test

Utilizamos esta função para agrupar a execução do método testado e a verificação dos dados esperados.

#### expect

Utilizamos esta função para comparar a resposta do método a ser testado com a resposta esperada.  
Dentro do [jest](https://jestjs.io/) temos uma [variadade de possibilidades para comparação](https://jestjs.io/docs/en/using-matchers).


### Imports corretos

Então, vamos importar o pacote dos testes, o nosso app propriamente dito e nossos usuários para facilitar na hora de comparar os dados vindos da api com os dados que estão simulando nossa base de dados.

```javascript
const request = require("supertest");
const app = require("./app");

const users = require("./users");
```

Com tudo importado, podemos começar a escrever nossos testes para cada rota que temos, validando se as repostas recebidas são as respostas esperadas.

#### Testando a rota "/"

Essa é uma rota bem simples, que deve apenas devolver um **Ok** como texto.
Por isso, nós simulamos a requisição para essa rota e com a resposta, nós verificamos se o texto é igual ao que esperamos e também, se veio com o status code correto.

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

Similar ao exemplo anterior, temos que garantir que a resposta para a requisição é a esperada.

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

Esperamos dessa rota, que ela traga todos os usuários da nossa aplicação.  
Com isso, simulamos a chamada na rota, comparamos o corpo da requisição com a lista de usuários que importamos, neste caso, são os mesmos valores, e verificamos também o status code correto.

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

Esta é a rota onde temos uma regra de negócio, nela devemos trazer somente o usuário do **id** especificado.  
Temos dois casos de teste nesta rota, um caso quando encontramos o usuário esperado, onde nós sabemos qual usuário estamos procurando e sabemos o quê nossa api deve responder.  
No outro caso, buscamos um id que, atualmente, sabemos ser inexistente em nossos usuários e a resposta deve ser apenas o status code de Não Encontrado.

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

Passamos por todos os testes do nosso projeto, entendemos como cada teste funciona e garantimos o funcionamento de todas as rotas.  


Nos próximos passos, podemos aprofundar em nossos testes, utilizando mock para garantir como alguns objetos devem se comportar. Esta é uma boa técnica pois atualmente nós dependemos do nosso conhecimento sobre o arquivo que contém os usuários, caso ele altere, nós também teríamos que corrigir nosso teste. A ideia é removermos essa dependência utilizando mocks.  
Com isso, nossos testes vão funcionar de forma independente da camada que simula nossa base de dados.  
Futuramente podemos criar testes integrados a uma base de dados e trazer mais segurança no funcionamento de todo o projeto.

Valeu pessoas por terem lido até aqui. Até a próxima.