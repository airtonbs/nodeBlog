//const { Router } = require('express');
import { Router } from 'express'
import fs from 'fs';

const routers = Router();

// Requisições com todos parâmetros via get
routers.get('/', (req, res) => {

    console.log(req.query);
    res.send('Buscar dados por query');
});
// Requisições via post
routers.post('/', (req, res) => {

    fs.writeFileSync(`./posts/${new Date().getTime}`, JSON.stringify(req.body));


    console.log('POST');
    console.log(req.body);
    res.send('Incluir');
});

// Requisições com parâmetro fixo via get
routers.get('/:id', (req, res) => {

    console.log(req.params.id);
    res.send('Buscar por ID');
});

// Requisições via put 
// obs: melhor formato a ser utilizado 
// pois a variável id é o parâmetro e o body é um objeto json com todo conteúdo a ser alterado
routers.put('/:id', (req, res) => {

    console.log('PUT');
    // Parâmetro enviado
    console.log(req.params.id);
    // Objeto json a ser alterado
    console.log(req.body);
    res.send('Alterar');
});

//module.exports = routers
export default routers;