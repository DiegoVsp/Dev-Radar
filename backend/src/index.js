const {MONGO_USER, MONGO_PASS, MONGO_DB} =  require('../.env');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const routes = require('./routes');
const {setupWebsocket} = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0-k9t9y.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);


server.listen(3333);

// MÉTODOS HTTP: GET = buscar alguma informação , POST = criar alguma informação, PUT = editar um usuário / um recurso, DELETE = deletar

//Tipos de parametros:

//Query Params: request.query (filtros, ordenação, paginação, ...)
//Route Params: request.params (Identificar um recurso na alteração ou remoção)
//Body: request.body (Dados para criação ou alteração de um registro)

//MongoDB (Não Relacional)