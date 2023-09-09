_Este repositório não será atualizado. A API será reconstruída em Python._

---
<h1 align="center"> 
 Portfolio_v2 API
</h1>

<p align="center">
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/juliolecy/portfolio_v2_backend">
  
  <a href="https://github.com/fallying/portfolio_v2_backend/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/juliolecy/portfolio_v2_backend">
  </a>
    
   <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
</p>

<div  align="center">
  <a>
    <img src="https://skillicons.dev/icons?i=typescript,js,nodejs,express,sequelize,postgresql" />
  </a>
</div>


# Documentação da API
Esta documentação descreve os endpoints e funcionalidades desta API.

## 🛠 Tecnologias
-  **Typescript**
-   **Javascript**
-   **Node**
-   **PostgreSQL**

> Veja o arquivo  [package.json](https://github.com/juliolecy/portfolio_v2_backend/blob/master/package.json)

---

## Endpoints

|   Método    |      Endpoint   | Privada   | Parâmetros       |
|-------------|-----------------|-----------|------------------|
| `Get`       | '/ping'         | Não       |                  |
| `Get`       | '/api/projects' | Não       |                  |
| `Post`      | '/user/signin'  | Não       | email, password  |

<pre>
  
PORT=4000
BASE=http://localhost:4000
PG_DB= <database>
PG_HOST=<host>
PG_USER=<user>
PG_PASSWORD=<password>
PG_URL=postgres://<user>:<password>@<host>/<database>
<pre>

  

### Dependências  
* typescript
* cors
* dotenv
* express
* sequelize
* pg
* pg-hstore
* validator
* jsonwebtoken
* uuid

* ### Dependências de desenvolvedor

* nodemon

### Requisitos

* Node
* NPM

#### 🧭 Iniciando a aplicação

```bash

# Clone este repositório
$ git clone https://github.com/juliolecy/portfolio_v2_backend.git

# Acesse a pasta do projeto no seu terminal/cmd
$ cd portfolio_v2_backend

# Instale as dependências
$ npm i

# Execute a aplicação em modo de desenvolvimento
$ npm run start-dev

# Faça as requisições para http://localhost:4000

```

---



