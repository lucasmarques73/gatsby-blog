---
type: post
title: Deploy de uma API Node na Heroku
description: Neste post vou mostrar de uma maneira simples, como colocar sua API
  online na Heroku
date: 2020-05-29 07:13:18
image: /assets/img/heroku-signup-screen.png
category: js
tags:
  - js
  - heroku
---
Antes de começar, gostaria de explicar um pouco sobre a [Heroku](https://www.heroku.com/).\
Segundo o [Wikipedia](https://en.wikipedia.org/wiki/Heroku), A Heroku é uma plataforma de nuvem como serviço, suportando diversas linguagens de programação. O que isso significa??\
Significa que ela oferece recursos como Servidores, Banco de dados, entre outros serviços como a [Amazon](https://aws.amazon.com/pt/) e a [Azure](https://azure.microsoft.com/pt-br/) também fazem. Pra mim, a maior vantagem de utilizar a Heroku, é sua fácil integração com Github (Vou demonstrar isso abaixo) e os recursos disponibilizados de forma gratuita, [mais info](https://www.heroku.com/pricing).\
Bom, vamos lá.\
Como fazer o deploy de uma API NodeJS na heroku?\
Tenho no meu github, um [repositório](https://github.com/lucasmarques73/node-api-heroku) com uma API que contém apenas uma rota para exemplo.\
Este é o código da nossa API:

```jsconst
const app = express();
const port = 3000;

app.get("/", (_, res) => res.send("OK"));

app.listen(process.env.PORT || port, () =>
  console.log(`Server running in ${port}`)
);
```

Um ponto importante para o deploy na heroku, é a utilização correta da variável de ambiente **PORT**, pois com ela que a Heroku disponibiliza sua api na porta **80**.\
Para colocarmos ela online na heroku, o primeiro passo é [criar uma conta](https://signup.heroku.com/) na plataforma:

![Tela de cadastro na Heroku](/assets/img/heroku-signup-screen.png "Tela de cadastro na Heroku")

