import EncapsulamentoBlog from '../encapsulamento/EncapsulamentoBlog';
export default class Blog {

    obj = {};

    constructor() {

    }

    getBlog() {
        let dadosBlog = new EncapsulamentoBlog;
        this.obj = dadosBlog.getBlog();

        return this.obj;
    }

    getBlogId(id) {

        let erro = { "erro": "" };
        (id != undefined && id != "") ? id = parseInt(id): id = 0;

        if (id != 0) {
            let dadosBlog = new EncapsulamentoBlog;
            this.obj = dadosBlog.getBlogId(id);

        } else {
            erro = { "erro": "Campo id é obrigatório!" };
        }

        this.obj = {...this.obj, ...erro }
        return this.obj;
    }

    insertBlog(nome, email, texto) {

        let erro = {};

        (nome == undefined) ? nome = "": false;
        (email == undefined) ? email = "": false;
        (texto == undefined) ? texto = "": false;

        if (nome != "" && email != "" && texto != "") {
            let dadosBlog = new EncapsulamentoBlog;
            this.obj = dadosBlog.insertBlog(nome, email, texto);
            erro = { "erro": "" };
        } else {
            let erroNome = { "erroNome": "Campo nome é obrigatório!" };
            let erroEmail = { "erroEmail": "Campo email é obrigatório!" };
            let erroTexto = { "erroTexto": "Campo texto é obrigatório!" };

            (nome == "") ? erro = {...erro, ...erroNome }: false;
            (email == "") ? erro = {...erro, ...erroEmail }: false;
            (texto == "") ? erro = {...erro, ...erroTexto }: false;
        }

        this.obj = {...this.obj, ...erro }
        return this.obj;
    }

    updateBlog(id, nome, email, texto) {

        let erro = {};
        (id != undefined && id != "") ? id = parseInt(id): id = 0;

        if (id != 0) {
            if (nome != "" && email != "" && texto != "") {
                let dadosBlog = new EncapsulamentoBlog;
                this.obj = dadosBlog.updateBlog(id, nome, email, texto);
                erro = { "erro": "" };
            } else {
                let erroNome = { "erroNome": "Campo nome é obrigatório!" };
                let erroEmail = { "erroEmail": "Campo email é obrigatório!" };
                let erroTexto = { "erroTexto": "Campo texto é obrigatório!" };

                (nome == "") ? erro = {...erro, ...erroNome }: false;
                (email == "") ? erro = {...erro, ...erroEmail }: false;
                (texto == "") ? erro = {...erro, ...erroTexto }: false;
            }

        } else {
            erro = { "erro": "Campo id é obrigatório!" };
        }

        this.obj = {...this.obj, ...erro }
        return this.obj;
    }

    deleteBlog(id) {

        let erro = { "erro": "" };

        (id != undefined && id != "") ? id = parseInt(id): id = 0;

        if (id != 0) {
            let dadosBlog = new EncapsulamentoBlog;
            this.obj = dadosBlog.deleteBlog(id);
        } else {
            erro = { "erro": "Campo id é obrigatório!" };
        }
        this.obj = {...this.obj, ...erro };
        return this.obj;
    }
}