import fs from 'fs';
import MessageBlog from '../message/MessageBlog';

export default class EncapsulamentoBlog {

    dadosBlog = [];
    msg = {};
    total = { "total": "0" };
    obj = {};

    constructor() {
        if (fs.existsSync(`./blog/blog`)) {
            this.dadosBlog = JSON.parse(fs.readFileSync(`./blog/blog`));
            this.msg = new MessageBlog('select', true);
            (this.dadosBlog.length > 0) ? this.total = { "total": this.dadosBlog.length }: false;
        } else {

            this.msg = new MessageBlog('select', false);
        }
        this.obj = {...this.dadosBlog, ...this.msg, ...this.total };
        return this.obj;
    }
}