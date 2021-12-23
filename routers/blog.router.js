//const { Router } = require('express');
import { Router } from 'express'
import Blog from '../class/Blog';
import fs from 'fs';

const routers = Router();

// Requisições via post
routers.post('/:id', (req, res) => {

    let nome = req.body.nome;
    let email = req.body.email;
    let texto = req.body.texto;
    var obj = new Blog;

    res.send(obj.insertBlog(nome, email, texto));
});

routers.get('/token/:id', (req, res) => {
    let todosBlog = new Blog;

    res.send(todosBlog.getBlog());
});

// Requisições com parâmetro fixo via get
routers.get('/id/:id', (req, res) => {
    var token = parseInt(req.params.id);
    console.log(token)
    var id = req.body.id;
    var obj = new Blog;

    res.send(obj.getBlogId(id));
});

routers.get('/email/:id', (req, res) => {

    var email = req.body.email
    var obj = {};

    console.log('email')

    if (email != "") {
        let dadosBlog = JSON.parse(fs.readFileSync(`./blog/blog`))
        dadosBlog.filter(function(retornoDados) {
            if (email == (retornoDados.email)) {
                obj = { "id": retornoDados.id, "nome": retornoDados.nome, "email": retornoDados.email, "texto": retornoDados.texto, "data": retornoDados.data }
                return obj;
            }
        });
    }
    res.send(obj);
});

// Requisições via put 
// obs: melhor formato a ser utilizado 
// pois a variável id é o parâmetro e o body é um objeto json com todo conteúdo a ser alterado
routers.put('/:token', (req, res) => {

    // Parâmetro enviado
    var token = parseInt(req.params.id);
    var id = req.body.id;
    var nome = req.body.nome;
    var email = req.body.email;
    var texto = req.body.texto;
    var obj = new Blog;

    res.send(obj.updateBlog(id, nome, email, texto));
});

// Requisições para deletar o registro
routers.delete('/:token', (req, res) => {

    var id = req.body.id;
    var obj = new Blog;

    res.send(obj.deleteBlog(id));
});

//module.exports = routers
export default routers;