# Documentação da API

Esta documentação descreve os endpoints e funcionalidades desta API.
<!-- 
<p >
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/juliolecy/olx_clone_backend">
  
  <a href="https://github.com/fallying/pokedex/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/juliolecy/olx_clone_backend">
  </a>
    
   <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
</p> -->

## Endpoints

|   Método    | Endpoint   | Privada             | Parâmetros         |
|-------------|--------|-----------------------|-----------------------|
| `Get`      | '/ping' | Não       |               |
| `Get`      | '/states' | Não       |   |
| `Post`      | '/user/signin' | Não       | email, password |
| `Post`      | '/user/signup' | Não       |  name, email, password, state |
| `Get`      | '/user/me' | Sim       | token  |
| `Put`      | '/user/me' | Sim       | token|
| `Get`      | '/categories' | Não       |  |
| `Post`      | '/ad/add' | Sim       | token |
| `Get`      | '/ad/list' | Não       |title, price, priceneg, desc, cat, token  |
| `Get`      | '/ad/item' | Não       | id, other |
| `Post`      | '/ad/:id' | Sim       | id |


##### Arquivo .env

<pre>
  
PORT=5000
BASE=http://localhost:5000
DATABASE=mongodb+srv://<username>:<password>@cluster0.owwrqmm.mongodb.net/?retryWrites=true&w=majority
</pre>

*Nota:* Lembre-se de trocar os espaços username e password.

### Dependências

* bcrypt
* cors
* dotenv
* express
* express-fileupload
* express-validator
* jimp
* mongoose
* uuid

* ### Dependências de desenvolvedor

* nodemon



### Requisitos

* Node
* NPM

#### 🧭 Iniciando a aplicação

```bash

# Clone este repositório
$ git clone https://github.com/juliolecy/olx_clone_backend.git

# Acesse a pasta do projeto no seu terminal/cmd
$ cd olx_clone_backend

# Instale as dependências
$ npm i

# Execute a aplicação em modo de desenvolvimento
$ npm run start-dev

# Faça as requisições para http://localhost:5000

```

---



