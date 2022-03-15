# Checkout Service

Este projeto é uma API HTTP, que simula um carrinho de compras para um e-commerce.
O projeto segue os padrões de request/response e regras definidos [neste documento](https://github.com/hashlab/hiring/tree/master/challenges/pt-br/new-backend-challenge).

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


### Padrões de commit

Este projeto segue as convenções de commit do [Angular](https://hub.docker.com/r/hashorg/hash-mock-discount-service). Para ajudar a legibilidade dos commits, e possíveis versionamentos.
***Exceção dos commits iniciais***
