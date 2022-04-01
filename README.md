# Nutriverde

![example workflow](https://github.com/ES-UFABC/Nutriverde/actions/workflows/node.js.yml/badge.svg)

A NutriVerde é uma plataforma web que tem como objetivo facilitar a comunicação e comercialização de produtos entre pequenos produtores e compradores, através de uma plataforma de anúncios em que produtores cadastram seus produtos, área de atuação e  parceiros para que os potenciais compradores consigam localizar as melhores opções de produtos dentro de determinadas regiões e também produtores que estejam de acordo com suas preferências.

Além do comércio, nossa aplicação mostra para o público toda a variedade de produtos disponíveis em sua região, enriquecendo seu entendimento sobre a produção de suas redondezas.

## Tecnologias

* Node.JS
* MongoDB
* Bootstrap (bs5)
* React
* React Testing Library e Jest
* Next.js
* Swagger

## *Setup* do projeto

### Como baixar

Como pré-requisitos, é necessário que baixe o [Node.js](https://nodejs.org/en/), e após instalá-lo, rode os seguintes comandos:

```sh
npm i -g yarn
npm i -g nodemon
npm i -g ts-node # Apenas necessário em Windows
```

Com os pré-requisitos instalados, para obter o projeto basta que efetue o clone deste em uma pasta de sua escolha:

```sh
git clone https://github.com/ES-UFABC/Nutriverde
```

Considere que a variável `$ROOT` a partir de agora é a pasta em que o projeto do Nutriverde foi baixado.

### Como instalar

Para o back-end:

```sh
cd $ROOT/server
yarn
```

Para o front-end:

```sh
cd $ROOT/ui
yarn
```

### Como usar

Para o back end:

```sh
cd $ROOT/server
nodemon
```

E então o servidor estará acessível na URL [http://localhost:3000](http://localhost:3000).

Para o front end:

```sh
cd $ROOT/ui
yarn dev
```

E então o *site* estará acessível na URL [http://localhost:3001](http://localhost:3001).

## Grupo 7 - Integrantes

1. Breno Boato da Silva
1. Fabio dos Santos de Souza
1. Guilherme Cavalcante Santana
1. Jonathan Takeshi Ywahashi
1. Lucas Serna Quinto Pardo
1. Vitor Rubens Sniquer Leão Martins

## Licença

MIT/X11
