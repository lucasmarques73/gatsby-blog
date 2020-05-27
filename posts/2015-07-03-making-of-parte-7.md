---
title: Making of - Parte 7
description: Qualquer coisa
date: 2015-07-03T05:54:23.000Z
image: /assets/img/mussum-ipsum.jpg
category: devops
categoryColor: "#3d464d"
background: "#10565c"
tags:
  - devops
---

## Antes de qualquer coisa...

Bom, antes de começar explicando como criei esse blog, algumas ideias e o que aconteceu durante o processo, é melhor eu me apresentar né?

Meu nome é Willian Justen de Vasconcellos, tenho 24 anos (nada de piadinhas...) e sou Desenvolvedor Front End no [Queremos!](https://queremos.com.br)/[WeDemand](https://wedemand.com). Trabalho há cerca de 3 anos na área de web, tendo finalizado meu curso de Tecnologia da Informação na Faeterj-Petrópolis no ano de 2014. Mas curiosamente essa não foi minha primeira faculdade, eu também fiz **Química Industrial** na Uff, sim, você leu certo, eu realmente fiz Química...
E por que eu trabalho com web agora? Ah...porque web é incrível e a facilidade em aprender cada dia mais, me deixa mais feliz com a escolha que fiz.

```jsx
import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import * as S from "./styled"

const Avatar = () => {
  const { avatarImage } = useStaticQuery(graphql`
    {
      avatarImage: file(relativePath: { eq: "profile-photo.jpg" }) {
        childImageSharp {
          fixed(width: 60, height: 60) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return <S.AvatarWrapper fixed={avatarImage.childImageSharp.fixed} />
}

export default Avatar
```

Eu pretendo escrever o máximo que der e sobre tudo, desde o avançado até dicas rápidas para iniciantes. O foco principal será em tecnologias Front End, mas isso não impede que um dia escreva sobre Python ou alguma técnica de estudo. Espero que gostem do blog e todo feedback é bem vindo =)
