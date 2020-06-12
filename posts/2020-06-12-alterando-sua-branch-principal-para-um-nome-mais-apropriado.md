---
type: post
title: Alterando sua branch principal para um nome mais apropriado
description: Após uma sugestão de @Una no twitter, vou trocar o nome da branch
  principal nos meus projetos.
date: 2020-06-12 04:12:59
category: Dev
tags:
  - git
  - branch
---
Recentemente tivemos vários [protetos acontecendo pelo mundo](https://oglobo.globo.com/fotogalerias/vidas-negras-importam-mundo-fura-quarentena-para-protestar-contra-racismo-24466825) com o papel principal de mostrar que Vidas Negras Importam [#BlackLivesMatter](https://twitter.com/search?q=%23BlackLivesMatter&src=typeahead_click).


Com isso, uma [pessoa no Twitter](https://oglobo.globo.com/fotogalerias/vidas-negras-importam-mundo-fura-quarentena-para-protestar-contra-racismo-24466825), sugeriu para nós, alterar o nome da branch principal em nossos repositórios, geralmente chamada de **master**, onde esta palavra tem uma referência ao trabalho escravo.


Eu gostei muito da ideia e aderi aos meus projetos. Neste post vou demonstrar como fiz essa alteração.

## Alterando a branch no repositório local

Para isso, eu resolvi mover a branch **master** para a nova branch que vamos chamar de **main** como sugestão da [@Una](https://twitter.com/Una).

```shel
git branch -m master main
```

Desta forma, eu já crio uma nova branch localmente e vou para ela. Esta nova branch é exatamente igual a branch anterior.


## Subindo a nova branch

Após criar a nova branch, precisamos subir ela para nosso repositório, no caso o github.

```shell
git push -u origin HEAD
```

##