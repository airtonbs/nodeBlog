import EncapsulamentoBlog from '../encapsulamento/EncapsulamentoBlog';
import MenssageBlog from '../message/MessageBlog';
export default class Blog {

    msg = {};
    obj = {};

    constructor() {

        let dadosBlog = new EncapsulamentoBlog;
        this.obj = dadosBlog;
        // console.log(this.obj)

        return this.obj;
    }



}