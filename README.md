Aqui está a versão organizada do README.md para o projeto Movie Catalog API com Docker configurado para rodar o projeto e instruções para aplicar as migrations do Prisma.

### README.md

```markdown
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
<a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
<a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Índice

- [Instalação](#instalação)
- [Configuração](#configuração)
- [Executando a Aplicação](#executando-a-aplicação)
- [Endpoints](#endpoints)
- [Deploy](#deploy)
- [Documentação Swagger](#documentação-swagger)
- [Contribuição](#contribuição)
- [Licença](#licença)

Prerequisites

Before running the project, make sure you have the following installed:

    Node.js v18.19.0
    npm (Node Package Manager)
    Prisma CLI
    Docker (for running Prisma with Docker)


## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/movie-catalog.git
cd movie-catalog
```

2. Instale as dependências:

```bash
npm install
```

## Configuração

1. Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente:

```dotenv
DATABASE_URL=postgresql://user:password@localhost:5432/moviedb?schema=public
JWT_SECRET=your_jwt_secret
```

## Executando a Aplicação

### Com Docker

Construa e inicie os containers:

Para rodar os containers em segundo plano (modo "detached") 
docker-compose up -d

Rodar migrate do prisma pra sincronizar a base 
npx prisma migrate dev 

Start para acessar o banco prisma:
npx prisma studio 

Execute a aplicação em modo de desenvolvimento:
npm run start:dev

## Endpoints

### Autenticação

#### 1. **Registrar Usuário**
- **Endpoint:** `POST /auth/register`
- **Descrição:** Registra um novo usuário.
- **Corpo da Requisição:**
  ```json
  {
    "username": "testuser",
    "password": "testpass"
  }
  ```

- **Resposta de Sucesso:**
  ```json
  {
    "message": "User created successfully",
    "user": {
      "id": 1,
      "username": "testuser"
    }
  }
  ```

#### 2. **Login de Usuário**
- **Endpoint:** `POST /auth/login`
- **Descrição:** Faz login de um usuário.
- **Corpo da Requisição:**
  ```json
  {
    "username": "testuser",
    "password": "testpass"
  }
  ```

- **Resposta de Sucesso:**
  ```json
  {
    "access_token": "jwt_token"
  }
  ```

### Filmes

#### 1. **Criar Filme**
- **Endpoint:** `POST /movies`
- **Descrição:** Cria um novo filme. (Requer autenticação)
- **Cabeçalho da Requisição:**
  ```
  Authorization: Bearer jwt_token
  ```
- **Corpo da Requisição:**
  ```json
  {
    "title": "Inception",
    "description": "A mind-bending thriller",
    "releaseDate": "2010-07-16"
  }
  ```

- **Resposta de Sucesso:**
  ```json
  {
    "message": "Movie created successfully",
    "movie": {
      "id": 1,
      "title": "Inception",
      "description": "A mind-bending thriller",
      "releaseDate": "2010-07-16T00:00:00.000Z",
      "createdAt": "2024-07-02T02:19:02.595Z",
      "updatedAt": "2024-07-02T02:19:02.595Z",
      "userId": 1
    }
  }
  ```

#### 2. **Listar Filmes**
- **Endpoint:** `GET /movies`
- **Descrição:** Lista todos os filmes. (Requer autenticação)
- **Cabeçalho da Requisição:**
  ```
  Authorization: Bearer jwt_token
  ```

- **Resposta de Sucesso:**
  ```json
  [
    {
      "id": 1,
      "title": "Inception",
      "description": "A mind-bending thriller",
      "releaseDate": "2010-07-16T00:00:00.000Z",
      "createdAt": "2024-07-02T02:19:02.618Z",
      "updatedAt": "2024-07-02T02:19:02.618Z",
      "userId": 1
    }
  ]
  ```

#### 3. **Obter Filme pelo ID**
- **Endpoint:** `GET /movies/:id`
- **Descrição:** Obtém um filme pelo ID. (Requer autenticação)
- **Cabeçalho da Requisição:**
  ```
  Authorization: Bearer jwt_token
  ```

- **Resposta de Sucesso:**
  ```json
  {
    "id": 1,
    "title": "Inception",
    "description": "A mind-bending thriller",
    "releaseDate": "2010-07-16T00:00:00.000Z",
    "createdAt": "2024-07-02T02:19:02.623Z",
    "updatedAt": "2024-07-02T02:19:02.623Z",
    "userId": 1
  }
  ```

#### 4. **Atualizar Filme pelo ID**
- **Endpoint:** `PATCH /movies/:id`
- **Descrição:** Atualiza um filme pelo ID. (Requer autenticação)
- **Cabeçalho da Requisição:**
  ```
  Authorization: Bearer jwt_token
  ```
- **Corpo da Requisição:**
  ```json
  {
    "title": "Inception Updated"
  }
  ```

- **Resposta de Sucesso:**
  ```json
  {
    "message": "Movie updated successfully",
    "movie": {
      "id": 1,
      "title": "Inception Updated",
      "description": "A mind-bending thriller",
      "releaseDate": "2010-07-16T00:00:00.000Z

",
      "createdAt": "2024-07-02T02:19:02.630Z",
      "updatedAt": "2024-07-02T02:19:02.630Z",
      "userId": 1
    }
  }
  ```

#### 5. **Excluir Filme pelo ID**
- **Endpoint:** `DELETE /movies/:id`
- **Descrição:** Exclui um filme pelo ID. (Requer autenticação)
- **Cabeçalho da Requisição:**
  ```
  Authorization: Bearer jwt_token
  ```

- **Resposta de Sucesso:**
  ```json
  {
    "message": "Movie deleted successfully",
    "movie": {
      "id": 1,
      "title": "Inception",
      "description": "A mind-bending thriller",
      "releaseDate": "2010-07-16T00:00:00.000Z",
      "createdAt": "2024-07-02T02:19:02.635Z",
      "updatedAt": "2024-07-02T02:19:02.635Z",
      "userId": 1
    }
  }
  ```

## Documentação Swagger

A documentação Swagger está disponível em:

```bash
http://localhost:3001/api
```

## Support

Nest é um projeto open source licenciado sob MIT. Ele pode crescer graças aos patrocinadores e ao suporte dos incríveis patrocinadores. Se você quiser se juntar a eles, por favor [leia mais aqui](https://docs.nestjs.com/support).

## Stay in touch

- Autor - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## Licença

Nest é [licenciado sob MIT](LICENSE).
```

### Estrutura do Projeto

```plaintext
movie-catalog/
│
├── prisma/
│   ├── schema.prisma
│
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── app.controller.ts
│   ├── app.service.ts
│   │
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   ├── auth.dto.ts
│   │   ├── jwt.strategy.ts
│   │
│   ├── users/
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── users.module.ts
│   │   ├── users.entity.ts
│   │
│   ├── movies/
│   │   ├── movies.controller.ts
│   │   ├── movies.service.ts
│   │   ├── movies.module.ts
│   │   ├── movies.entity.ts
│   │   ├── dto/
│   │   │   ├── create-movie.dto.ts
│   │   │   ├── update-movie.dto.ts
│
├── docker-compose.yml
├── Dockerfile
├── .env
├── package.json
└── README.md
```

### Arquivo Docker Compose (`docker-compose.yml`)

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3001:3000"
    environment:
      - DATABASE_URL=postgresql://user:password@postgres:5432/moviedb?schema=public
      - JWT_SECRET=your_jwt_secret
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres
    environment:
      POSTGRES_DB: moviedb
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"

  redis:
    image: redis
    ports:
      - "6379:6379"
```

### Arquivo Dockerfile

```Dockerfile
# Use the official Node.js image.
# https://hub.docker.com/_/node
FROM node:18

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the local code to the container image.
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Run the web service on container startup.
CMD ["npm", "run", "start:dev"]
```

Com estas instruções, você poderá configurar, rodar e testar a aplicação Movie Catalog API com Docker, aplicar as migrations do Prisma e acessar a documentação Swagger.