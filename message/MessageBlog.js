export default class MessageBlog {

    insertSuccess = "Registro inserido com sucesso!";
    insertError = "Erro ao inserir registro!";
    selectSuccess = "Registros encontrados!";
    selectError = "Registro não encontrado!";
    updateSuccess = "Registro alterado com sucesso!";
    updateError = "Erro ao alterar registro!";
    deleteSuccess = "Registro deletado com sucesso!";
    deleteErro = "Erro ao deletar registro!";
    message = {};

    constructor(tipo, valor) {
        switch (tipo) {
            case "insert":
                (valor) ? this.message = { "mensagem": this.insertSuccess }: this.message = { "mensagem": this.insertError };
                break;
            case "select":
                (valor) ? this.message = { "mensagem": this.selectSuccess }: this.message = { "mensagem": this.selectError };
                break;
            case "update":
                (valor) ? this.message = { "mensagem": this.updateSuccess }: this.message = { "mensagem": this.updateError };
                break;
            case "delete":
                (valor) ? this.message = { "mensagem": this.deleteSuccess }: this.message = { "mensagem": this.deleteError };
                break;
        }
        return this.message;
    }

    insertBlog(valor) {
        console.log(valor)
            (valor) ? this.message = { "mensagem": this.insertSuccess } : this.message = { "mensagem": this.insertError };
        return this.message;
    }

    selectBlog() {
        (valor) ? this.message = { "mensagem": this.selectSuccess }: this.message = { "mensagem": this.selectError };
        return this.message;
    }

    updateBlog() {
        (valor) ? this.message = { "mensagem": this.updateSuccess }: this.message = { "mensagem": this.updateError };
        return this.message;
    }

    deleteBlog() {
        (valor) ? this.message = { "mensagem": this.deleteSuccess }: this.message = { "mensagem": this.deleteError };
        return this.message;
    }
}