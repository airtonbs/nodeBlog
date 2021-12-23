import fs from 'fs';
import MessageBlog from '../message/MessageBlog';

export default class EncapsulamentoBlog {

    dadosBlog = [];
    msg = new MessageBlog;
    total = { "total": "0" };
    obj = {};

    constructor() {

    }

    getBlog() {

        if (fs.existsSync(`./blog/blog`)) {
            this.dadosBlog = JSON.parse(fs.readFileSync(`./blog/blog`));
            this.msg.selectBlog(true);
            (this.dadosBlog.length > 0) ? this.total = { "total": this.dadosBlog.length }: false;
        } else {

            this.msg.selectBlog(false);
        }
        this.obj = {...this.dadosBlog, ...this.msg.message, ...this.total };
        return this.obj;
    }

    getBlogId(id) {

        if (fs.existsSync(`./blog/blog`)) {

            this.dadosBlog = JSON.parse(fs.readFileSync(`./blog/blog`))
            var obj = {};
            var msg = new MessageBlog;
            var total = { "total": "0" };

            this.dadosBlog.filter(function(retornoDados) {

                if (id == (parseInt(retornoDados.id))) {

                    obj = { "id": retornoDados.id, "nome": retornoDados.nome, "email": retornoDados.email, "texto": retornoDados.texto, "data": retornoDados.data }
                    msg.selectBlog(true);
                    total = { "total": "1" };

                    return obj;
                } else {
                    msg.selectBlog(false);
                }
            });
            this.total = total;
            this.msg = msg;
        } else {
            this.msg.selectBlog(false);
        }

        this.obj = {... { "dados": obj }, ...msg.message, ...this.total };
        return this.obj;
    }

    insertBlog(nome, email, texto) {

        var id = 1;
        let data = new Date();
        let idTabela = 1;
        var obj = {};
        let msg = new MessageBlog;
        msg.insertBlog(false);
        var total = { "total": "0" };

        if (fs.existsSync(`./blog/blog`)) {
            this.dadosBlog = JSON.parse(fs.readFileSync(`./blog/blog`));
            idTabela = parseInt(JSON.parse(fs.readFileSync(`./blog/idTabela`))) + 1;
            id = idTabela;
        }
        // dadosBlog[dadosBlog.length] = { "id": id, "nome": nome, "email": email, "texto": texto, "data": data }
        // dadosBlog.push({ "id": id, "nome": nome, "email": email, "texto": texto, "data": data })
        this.dadosBlog.push({ id: id, nome, email, texto, data })
            //fs.writeFileSync(`./blog/${new Date().getTime}`, JSON.stringify(req.body));
        fs.writeFileSync(`./blog/blog`, JSON.stringify(this.dadosBlog));
        fs.writeFileSync(`./blog/idTabela`, JSON.stringify(idTabela));

        msg.insertBlog(true);
        total = { "total": "1" };

        let retornoDados = JSON.parse(fs.readFileSync(`./blog/blog`));

        retornoDados.filter(function(pesquisaDados) {
            if (id == (pesquisaDados.id)) {
                obj = { "id": pesquisaDados.id, "nome": pesquisaDados.nome, "email": pesquisaDados.email, "texto": pesquisaDados.texto, "data": pesquisaDados.data }
                return obj;
            }
        });

        this.total = total;
        this.obj = {... { "dados": obj }, ...msg.message, ...this.total };

        return this.obj;
    }

    updateBlog(id, nome, email, texto) {

        var dadosBlog = [];
        var obj = [];
        var dadosAlterados = [];
        var msg = new MessageBlog;
        msg.updateBlog(false);
        var total = { "total": "0" };

        this.dadosBlog = JSON.parse(fs.readFileSync(`./blog/blog`))
        var totalBlog = dadosBlog.length;
        var dadosAlterados = [];
        var i = 1;
        this.dadosBlog.filter(function(retornoDados) {
            if (id == parseInt(retornoDados.id)) {
                retornoDados.nome = nome
                retornoDados.email = email
                retornoDados.texto = texto

                obj.push({ "id": id, "nome": nome, "email": email, "texto": texto, "data": retornoDados.data });
                dadosAlterados = { "id": id, "nome": nome, "email": email, "texto": texto, "data": retornoDados.data };
                total = { "total": "1" };
                msg.updateBlog(true);

            } else {
                obj.push({ "id": retornoDados.id, "nome": retornoDados.nome, "email": retornoDados.email, "texto": retornoDados.texto, "data": retornoDados.data });
            }
            if (i == totalBlog) {
                fs.writeFileSync(`./blog/blog`, JSON.stringify(obj));
                return dadosAlterados;
            }
            i++;
        });
        this.total = total;

        this.obj = {... { "dados": dadosAlterados }, ...msg.message, ...this.total };
        return this.obj;
    }

    deleteBlog(id) {
        this.dadosBlog = JSON.parse(fs.readFileSync(`./blog/blog`))
        var totalBlog = this.dadosBlog.length;
        var i = 1;
        var total = { "total": "0" };
        var obj = [];
        var msg = new MessageBlog;
        msg.deleteBlog(false);

        this.dadosBlog.filter(function(retornoDados) {
            if (id !== parseInt(retornoDados.id)) {
                obj.push({ "id": retornoDados.id, "nome": retornoDados.nome, "email": retornoDados.email, "texto": retornoDados.texto, "data": retornoDados.data });
            } else {
                msg.deleteBlog(true);
                total = { "total": "1" };
            }
            if (i == totalBlog) {
                fs.writeFileSync(`./blog/blog`, JSON.stringify(obj));
                return msg;
            }
            i++;
        });
        this.total = total;
        this.obj = {...msg.message, ...total }

        return this.obj;
    }
}