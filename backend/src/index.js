const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://adminsemana:semana@cluster0-n9zmi.mongodb.net/omnistack10?retryWrites=true&w=majority', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

app.use(express.json());
app.use(routes);


// req = request
// res = response

// Métodos HTTP: GET, POST, PUT, DELETE

//Tipos de parâmetros:
// Query Params: req.query (Filtros, ordenação, paginação, ...)
// Route Params: req.params (Identificar um recurso na alteração ou remoção)
// Body: req.body (Dados para criação ou alteração de um registro)

// MongoDB (Não relacional)



app.listen(3333);