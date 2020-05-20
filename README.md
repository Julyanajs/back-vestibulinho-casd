<img alt="front-vestibulinho-casd" title="#front-vestibulinho-casd" src="https://i0.wp.com/cursosantosdumont.org.br/wp-content/uploads/2019/03/CASD-1.png?fit=600%2C211&ssl=1" width="200px" />

## [Back-end] Vestibulinho - Cadastro e gestão de alunos
Projeto do back-end para gerar o DB e definir a API para o funcioanmento das ferramentas web criadas para a organização do vestibulinho do CASD.

> [Estrutura do DB](https://whimsical.com/WZW7i9LaUyAwcf5cXYHZQh)

### Tecnologias
API desenvolvida em [Node](https://nodejs.org/en/), utilizando o [express](https://expressjs.com/) como framework web. <br/>
DB criado utilizando [MongoDB](https://www.mongodb.com/). <br/> 
Outras dependências utilizadas: 
 - [body-parser](https://www.npmjs.com/package/body-parser) - adiciona um middleware de parse para formatar o body de requests.
 - [cors](https://www.npmjs.com/package/cors) - configura a cors da API, permitindo rodar front e back-end localmente simultaneamente.
 - [express]()
 - [mongoose](https://mongoosejs.com/) - modelagem do banco de dados utilizando MongoDB.
 - [mongoose-auto-increment](https://www.npmjs.com/package/mongoose-auto-increment) - implementação do número de matrícula auto-incremental
 - [mongoose-paginate-v2](https://www.npmjs.com/package/mongoose-paginate-v2) - divisão dos dados do DB em páginas.
 - [mongoose-patch-update](https://www.npmjs.com/package/mongoose-patch-update) - facilitar atualização de dados no DB.
 - [mongoose-type-email](https://www.npmjs.com/package/mongoose-type-email) - tipo email para facilitar a verificação
 - [nconf](https://www.npmjs.com/package/nconf) - armazenar valores chaves da aplicação.
 - [nodemon](https://www.npmjs.com/package/nodemon) - atualização automática de mudanças feitas no js enquanto o servidor estiver rodando.
 - [shelljs](https://www.npmjs.com/package/shelljs) - rodar os scripts para checar se o banco de dados está online.

### Estrutura de pastas
 ```js
 - config
 - controllers
 - middleware
 - models
 - services
 ```

### Front-end
Front-end foi desenvolvido utilizando [React](https://pt-br.reactjs.org/), pode ser encontrado no seu respectivo [repositório](https://github.com/bambokianr/front-vestibulinho-casd).

### Iniciando a API
Verificar se existe [Node.js](https://nodejs.org/en/), [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), [mongoDB](https://www.mongodb.com/) e [docker](https://www.docker.com/) instalados na sua máquina antes de iniciar com o projeto. 

```bash
# Primeira utilização
# Clone o repositório front-end
$ git clone https://github.com/lulis123/back-vestibulinho-casd

# Primeira utilização
# Entre no repositório
$ cd front-vestibulinho-casd

# Primeira utilização
# Instale as dependências que estão presentes no arquivo 'package.json'
$ npm install

# Primeira utilização
# Instalar Docker e mongo, caso não os tenha instalado.
$ chmod +x installDockerMongo.sh
$ ./installDockerMongo.sh

# Sempre
# Subir o DB
$ ./runMongoDB.sh

#Sempre
# Rodar a API
$ npm start
```
### Padrões de desenvolvimento
Antes de fazer alterações no código, criar uma nova branch `git checkout -b feat/nome-da-feature`
> Não comitar na branch master.