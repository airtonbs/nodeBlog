import fs from 'fs';

export default class ServiceBlog {

    dadosBlog = [];
    idTabela = 1;
    urlBlog = `./blog/blog`;
    urlTabela = `./blog/idTabela`;

    constructor() {

    }

    insertBlog(nome, email, texto, data) {

        var id = 1;

        if (fs.existsSync(this.urlBlog)) {
            this.dadosBlog = JSON.parse(fs.readFileSync(this.urlBlog));
            this.idTabela = parseInt(JSON.parse(fs.readFileSync(this.urlTabela))) + 1;
            id = this.idTabela;
        }
        // dadosBlog[dadosBlog.length] = { "id": id, "nome": nome, "email": email, "texto": texto, "data": data }
        // dadosBlog.push({ "id": id, "nome": nome, "email": email, "texto": texto, "data": data })
        this.dadosBlog.push({ id: id, nome, email, texto, data })
            //fs.writeFileSync(`./blog/${new Date().getTime}`, JSON.stringify(req.body));
        fs.writeFileSync(this.urlBlog, JSON.stringify(this.dadosBlog));
        fs.writeFileSync(this.urlTabela, JSON.stringify(this.idTabela));
        // let retornoDados = JSON.parse(fs.readFileSync(urlBlog));
        let retornoDados = new ServiceBlog;
        this.dadosBlog = retornoDados.selectBlog(this.urlBlog, id);

        return this.dadosBlog;
    }

    selectBlog(id = 0) {

        let obj;

        if (fs.existsSync(this.urlBlog)) {

            this.dadosBlog = JSON.parse(fs.readFileSync(this.urlBlog));

            if (id != 0) {

                this.dadosBlog.filter(function(retornoDados) {

                    if (id == (parseInt(retornoDados.id))) {

                        obj = { "id": retornoDados.id, "nome": retornoDados.nome, "email": retornoDados.email, "texto": retornoDados.texto, "data": retornoDados.data }

                        return obj;
                    }
                });
                (obj == undefined) ? this.dadosBlog = []: this.dadosBlog = [obj];
            }
        }
        return this.dadosBlog;
    }

    updateBlog(id, nome, email, texto) {

        var obj = [];
        var url = this.urlBlog;

        this.dadosBlog = JSON.parse(fs.readFileSync(this.urlBlog))
        var totalBlog = this.dadosBlog.length;
        var dadosAlterados = {};
        var i = 1;

        this.dadosBlog.filter(function(retornoDados) {
            if (id == parseInt(retornoDados.id)) {
                retornoDados.nome = nome
                retornoDados.email = email
                retornoDados.texto = texto

                obj.push({ "id": id, "nome": nome, "email": email, "texto": texto, "data": retornoDados.data });
                dadosAlterados = { "id": id, "nome": nome, "email": email, "texto": texto, "data": retornoDados.data };

            } else {
                obj.push({ "id": retornoDados.id, "nome": retornoDados.nome, "email": retornoDados.email, "texto": retornoDados.texto, "data": retornoDados.data });
            }
            if (i == totalBlog) {
                fs.writeFileSync(url, JSON.stringify(obj));
                return dadosAlterados;
            }
            i++;
        });

        return dadosAlterados;
    }

    deleteBlog(id) {

        this.dadosBlog = JSON.parse(fs.readFileSync(this.urlBlog))
        var url = this.urlBlog;
        var totalBlog = this.dadosBlog.length;
        var i = 1;
        var obj = [];
        var dadosDeletados = false;

        this.dadosBlog.filter(function(retornoDados) {
            if (id !== parseInt(retornoDados.id)) {
                obj.push({ "id": retornoDados.id, "nome": retornoDados.nome, "email": retornoDados.email, "texto": retornoDados.texto, "data": retornoDados.data });
            } else {
                dadosDeletados = true;
            }
            if (i == totalBlog) {
                fs.writeFileSync(url, JSON.stringify(obj));
                return dadosDeletados;
            }
            i++;
        });

        return dadosDeletados;
    }
}