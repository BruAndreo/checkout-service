# Checkout Service

Este projeto é uma API HTTP, que simula um carrinho de compras para um e-commerce.
O projeto segue os padrões de request/response e regras definidos [neste documento](https://github.com/hashlab/hiring/tree/master/challenges/pt-br/new-backend-challenge).

## Overview de Request, Response e principais regras

### Request

A API tem apenas um endpoint. `/checkout`, este que responde através de uma chamada HTTP com o Metodo `POST` e o seguinte body `JSON`:

```js
{
  "products": [
    {
      "id": 1,
      "quantity": 1 // Quantidade a ser comprada do produto
    }
  ]
}
```
### Response

Sua resposta é sincrona, portanto o retorno será neste formato:

```js
{
  "total_amount": 20000, // Valor total da compra sem desconto
  "total_amount_with_discount": 19500, // Valor total da compra com desconto
  "total_discount": 500, // Valor total de descontos
  "products": [
    {
      "id": 1,
      "quantity": 2,
      "unit_amount": 10000, // Preço do produto em centavos
      "total_amount": 20000, // Valor total na compra desse produto em centavos
      "discount": 500, // Valor total de desconto em centavos
      "is_gift": false // É brinde?
    },
    {
      "id": 3,
      "quantity": 1,
      "unit_amount": 0, // Preço do produto em centavos
      "total_amount": 0, // Valor total na compra desse produto em centavos
      "discount": 0, // Valor total de desconto em centavos
      "is_gift": true // É brinde?
    }
  ]
}
```

### Principais regras

Como já informado, este projeto implementar regras e padrões de request e reponse definido por terceiros.
[Neste tópico da documentação](https://github.com/hashlab/hiring/tree/master/challenges/pt-br/new-backend-challenge#regras) é possível verificar todo o conjunto de regras que foram usadas como base para desenvolvimento deste projeto.

## Executar testes em ambiente local

Para executar os testes locais é necessário fazer o clone do projeto local e através do terminal, dentro do diretório do projeto executar os seguintes comandos:
***Além disso, é necessário ter o NodeJS instalado em sua maquina***

```SHELL
cp example.env .env
```

Este comando irá gerar o arquivo `.env` com as configurações padrões que são necessárias para poder executar os testes

Após isso, execute:

```SHELL
npm install
```

Com isso, o todas as dependencias necessárias já estaram devidamente instaladas.

Para executar os testes unitários basta executar:

```SHELL
npm test
```

## Executar o projeto através de um container Docker

É possível executar este projeto através de um container Docker.

Novamente, é importante gerar o arquivo `.env` após o clone do projeto.

```SHELL
cp example.env .env
```

Com isso, o projeto usará env vars padrões para execução local do projeto.

Após ter gerado o `.env` é necessário realizar o build do container.

```SHELL
docker build -t checkout-service .
```

Para executar o container, use o seguinte comando:

```SHELL
docker run -p 3000:3000 --network host checkout-service
```

**Obs:** O projeto tem uma dependencia de um serviço terceiro para fazer o calculo de seus descontos, para uma melhor experiencia de uso, é recomendado ter [este outro container](https://hub.docker.com/r/hashorg/hash-mock-discount-service) em execução também.

## Executar o projeto através de Docker-Compose

Outra forma de executar o projeto é através do docker-compose.

Novamente, é importante gerar o arquivo `.env` após o clone do projeto.

```SHELL
cp example.env .env
```

Para executar o projeto, e suas dependencias é necessário usar o seguinte comando:

```SHELL
docker-compose up
```


## Convenções de commit do projeto

Este projeto segue as convenções de commit do [Angular](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines). Para ajudar a legibilidade dos commits, e possíveis versionamentos.
***Exceção dos commits iniciais***
