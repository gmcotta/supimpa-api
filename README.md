<h1 align="center">
    <img alt="Supimpa" title="Supimpa" src=".github/images/github-logo.png">
</h1>

## Projeto

Supimpa é uma aplicação para cadastrar casas de repouso e centro de convivência para idosos.

## Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- Express
- Multer
- PostgreSQL
- Docker
- TypeORM
- Yup
- Cors
- ESLint
- Prettier
- Ts-node-dev
- Typescript

## Como rodar localmente

- Faça o clone esse repositório:

```
git clone https://github.com/gmcotta/supimpa-api.git
```
- Abra seu terminal na pasta gerada

- Caso tenha o [Yarn](https://yarnpkg.com/) instalado, digite o comando:

```
yarn
```

- Verifique se não há nenhuma aplicação usando a porta 3333. Caso não tenha, digite o comando:

```
yarn dev
```

- Caso tenha Docker, crie um container PostgreSQL. Pode usar o comando abaixo:

```
docker run --name nlw -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

- Faça as migrations do banco de dados:

```
yarn typeorm migration:run
```

Há um arquivo .json para testar as requisições pelo [Insomnia](https://insomnia.rest/). Basta seguir esse [tutorial](https://support.insomnia.rest/article/52-importing-and-exporting-data).

## Outras informações

Para mais informações sobre as ferramentas utilizadas, acesse os seguintes repositórios:

- [Front-end](https://github.com/gmcotta/supimpa-web)
- [Mobile](https://github.com/gmcotta/supimpa-mobile)
