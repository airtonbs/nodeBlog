import MessageBlog from '../message/MessageBlog';
import ServiceBlog from '../services/blog.service';

export default class EncapsulamentoBlog {

    dadosBlog = new ServiceBlog;
    msg = new MessageBlog;
    total = { "total": "0" };
    obj = {};

    constructor() {

    }

    getBlog() {
        this.dadosBlog = this.dadosBlog.selectBlog();

        if (this.dadosBlog.length > 0) {
            this.msg.selectBlog(true);
            this.total = { "total": this.dadosBlog.length };
        } else {

            this.msg.selectBlog(false);
        }
        this.obj = {...this.dadosBlog, ...this.msg.message, ...this.total };
        return this.obj;
    }

    getBlogId(id) {

        this.dadosBlog = this.dadosBlog.selectBlog(id);

        if (this.dadosBlog.length > 0) {
            this.msg.selectBlog(true);
            this.total = { "total": this.dadosBlog.length };
            this.dadosBlog = { "dadosBlog": this.dadosBlog };

        } else {

            this.msg.selectBlog(false);
        }
        this.obj = {...this.dadosBlog, ...this.msg.message, ...this.total };
        return this.obj;
    }

    insertBlog(nome, email, texto) {

        let data = new Date();
        let msg = new MessageBlog;
        msg.insertBlog(false);

        this.dadosBlog.insertBlog(nome, email, texto, data);

        if (this.dadosBlog.length > 0) {
            msg.insertBlog(true);
            this.total = { "total": "1" };
        }

        this.obj = {... { "dados": this.dadosBlog }, ...msg.message, ...this.total };

        return this.obj;
    }

    updateBlog(id, nome, email, texto) {

        var msg = new MessageBlog;
        msg.updateBlog(false);

        var dadosAlterados = this.dadosBlog.updateBlog(id, nome, email, texto);
        if (dadosAlterados.id != undefined) {
            this.total = { "total": "1" };
            msg.updateBlog(true);
        }

        this.obj = {... { "dadosBlog": dadosAlterados }, ...msg.message, ...this.total };
        return this.obj;
    }

    deleteBlog(id) {

        let dadosDeletado = { "dadosBlog": { "id": id } };
        var msg = new MessageBlog;
        msg.deleteBlog(false);

        var deletarDados = this.dadosBlog.deleteBlog(id);
        console.log(deletarDados)
        if (deletarDados) {
            this.total = { "total": "1" };
            msg.deleteBlog(true);
        }
        this.obj = {...dadosDeletado, ...msg.message, ...this.total }

        return this.obj;
    }
}