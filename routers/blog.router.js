//const { Router } = require('express');
import { Router } from 'express'
import fs from 'fs';
// import Blog from '../class/Blog';

const routers = Router();

// Requisições via post
routers.post('/:id', (req, res) => {

    var id = 1;
    let nome = req.body.nome;
    let email = req.body.email;
    let texto = req.body.texto;
    let data = new Date();
    let idTabela = 1;
    let dadosBlog = [];
    var obj = {};
    let msg = {};

    if (fs.existsSync(`./blog/blog`)) {
        dadosBlog = JSON.parse(fs.readFileSync(`./blog/blog`));
        idTabela = parseInt(JSON.parse(fs.readFileSync(`./blog/idTabela`))) + 1;
        id = idTabela;
    }
    // dadosBlog[dadosBlog.length] = { "id": id, "nome": nome, "email": email, "texto": texto, "data": data }
    // dadosBlog.push({ "id": id, "nome": nome, "email": email, "texto": texto, "data": data })
    dadosBlog.push({ id: id, nome, email, texto, data })
        //fs.writeFileSync(`./blog/${new Date().getTime}`, JSON.stringify(req.body));
    fs.writeFileSync(`./blog/blog`, JSON.stringify(dadosBlog));
    fs.writeFileSync(`./blog/idTabela`, JSON.stringify(idTabela));
    let retornoDados = JSON.parse(fs.readFileSync(`./blog/blog`));

    retornoDados.filter(function(pesquisaDados) {
        if (id == (pesquisaDados.id)) {
            obj = { "id": pesquisaDados.id, "nome": pesquisaDados.nome, "email": pesquisaDados.email, "texto": pesquisaDados.texto, "data": pesquisaDados.data }
            return obj;
        }
    });

    msg = { "msg": "Registro inserido com sucesso!" };
    obj = {... { "dados": obj }, ...msg };

    res.send(obj);
});

routers.get('/token/:id', (req, res) => {
    let dadosBlog = [];
    let msg = {};
    let obj = {};
    let texto = "";

    let importando = new Blog;
    importando(2);

    if (fs.existsSync(`./blog/blog`)) {
        dadosBlog = JSON.parse(fs.readFileSync(`./blog/blog`));
        (dadosBlog.length == 1) ? texto = dadosBlog.length + " registro encontrado!": texto = dadosBlog.length + " registros encontrados!";
        msg = { "msg": texto }
    } else {
        msg = { "msg": "Registros não encontrados!" };
    }
    obj = {... { "Blog": dadosBlog }, ...msg };
    res.send(obj);
});

// Requisições com parâmetro fixo via get
routers.get('/id/:id', (req, res) => {
    var token = parseInt(req.params.id);
    console.log(token)
    var id = parseInt(req.body.id)
    var obj = {};
    var msg = {};
    if (fs.existsSync(`./blog/blog`)) {
        if (id != "") {
            let dadosBlog = JSON.parse(fs.readFileSync(`./blog/blog`))
            dadosBlog.filter(function(retornoDados) {
                if (id == (parseInt(retornoDados.id))) {
                    obj = { "id": retornoDados.id, "nome": retornoDados.nome, "email": retornoDados.email, "texto": retornoDados.texto, "data": retornoDados.data }
                    msg = { "msg": "Registro encontrado!" };
                    // obj = {... { "dados": obj }, ...msg };
                    return obj;
                } else {
                    msg = { "msg": "Registro não encontrado!" };
                }
            });
        } else {
            msg = { "msg": "Campo id é obrigatório!" };
        }
    } else {
        msg = { "msg": "Registro não encontrado!" };
    }
    obj = {... { "dados": obj }, ...msg };
    res.send(obj);
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
    var id = parseInt(req.body.id);
    var nome = req.body.nome;
    var email = req.body.email;
    var texto = req.body.texto;
    var dadosBlog = [];
    var obj = [];
    var dadosAlterados = [];
    var msg = { "msg": "Registro não encontrado!" };

    if (id != "") {
        dadosBlog = JSON.parse(fs.readFileSync(`./blog/blog`))
        var totalBlog = dadosBlog.length;
        var dadosAlterados = [];
        var i = 1;
        dadosBlog.filter(function(retornoDados) {
            if (id == parseInt(retornoDados.id)) {
                retornoDados.nome = nome
                retornoDados.email = email
                retornoDados.texto = texto

                obj.push({ "id": id, "nome": nome, "email": email, "texto": texto, "data": retornoDados.data });
                dadosAlterados = { "id": id, "nome": nome, "email": email, "texto": texto, "data": retornoDados.data };

                msg = { "msg": "Registro alterado com sucesso!" };

            } else {
                obj.push({ "id": retornoDados.id, "nome": retornoDados.nome, "email": retornoDados.email, "texto": retornoDados.texto, "data": retornoDados.data });
            }
            if (i == totalBlog) {
                fs.writeFileSync(`./blog/blog`, JSON.stringify(obj));
                return dadosAlterados;
            }
            i++;
        });
    }
    dadosAlterados = {... { "dados": dadosAlterados }, ...msg };
    res.send(dadosAlterados);
});

// Requisições para deletar o registro
routers.delete('/:token', (req, res) => {

    var id = parseInt(req.body.id);
    var dadosBlog = [];
    var obj = [];
    var msg = { "msg": "Registro não encontrado!" };

    if (id != "") {
        dadosBlog = JSON.parse(fs.readFileSync(`./blog/blog`))
        var totalBlog = dadosBlog.length;
        var i = 1;
        dadosBlog.filter(function(retornoDados) {
            if (id !== parseInt(retornoDados.id)) {
                obj.push({ "id": retornoDados.id, "nome": retornoDados.nome, "email": retornoDados.email, "texto": retornoDados.texto, "data": retornoDados.data });
            } else {
                msg = { "msg": "Registro excluido com sucesso!" };
            }
            if (i == totalBlog) {
                fs.writeFileSync(`./blog/blog`, JSON.stringify(obj));
                return msg;
            }
            i++;
        });
    }
    res.send(msg);
});

//module.exports = routers
export default routers;