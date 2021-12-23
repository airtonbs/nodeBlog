export default class MessageBlog {

    insertSuccess = "Registro inserido com sucesso!";
    insertError = "Erro ao inserir registro!";
    selectSuccess = "Registros encontrados!";
    selectError = "Registro não encontrado!";
    updateSuccess = "Registro alterado com sucesso!";
    updateError = "Erro ao alterar registro!";
    deleteSuccess = "Registro deletado com sucesso!";
    deleteError = "Erro ao deletar registro!";
    message = {};

    constructor() {

    }

    insertBlog(valor) {
        (valor) ? this.message = { "mensagem": this.insertSuccess }: this.message = { "mensagem": this.insertError };
        return this.message;
    }

    selectBlog(valor) {
        (valor) ? this.message = { "mensagem": this.selectSuccess }: this.message = { "mensagem": this.selectError };
        return this.message;
    }

    updateBlog(valor) {
        (valor) ? this.message = { "mensagem": this.updateSuccess }: this.message = { "mensagem": this.updateError };
        return this.message;
    }

    deleteBlog(valor) {
        (valor) ? this.message = { "mensagem": this.deleteSuccess }: this.message = { "mensagem": this.deleteError };
        return this.message;
    }
}