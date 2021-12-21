//const { Router } = require('express');
import { Router } from 'express'
import fs from 'fs';

const routers = Router();

// Requisições via post
routers.get('/:code', (req, res) => {
    var id = 0;
    var code = req.params.code;
    const token = code + "_token";
    let data = new Date();
    var msg = { "msg": "Token enviado com sucesso!" };
    var dadosToken = [];
    var atualizaToken = [];
    var obj = { "code": code, "token": token, "data": data };
    var validaCode = false;

    if (fs.existsSync(`./validation/token`)) {

        dadosToken = JSON.parse(fs.readFileSync(`./validation/token`));

        dadosToken.filter(function(retornoDados) {
            if (code == retornoDados.code) {
                validaCode = true;
                atualizaToken.push(obj);
            } else {
                atualizaToken.push({ "code": retornoDados.code, "token": retornoDados.token, "data": retornoDados.data });
            }
            if (id == retornoDados.length) {
                return obj;
            }
            id++;
        });
    }
    if (!validaCode) {
        let dadosCode = JSON.parse(fs.readFileSync(`./validation/code`));
        dadosCode.filter(function(retornoDados) {
            if (code == retornoDados.code) {

                dadosToken.push(obj);
                fs.writeFileSync(`./validation/token`, JSON.stringify(dadosToken));
                validaCode = true
            }
        });

        if (!validaCode) {
            obj = {};
            msg = { "msg": "Code inexistente!" }
        }
    }
    obj = {...obj, ...msg };
    res.send(obj);
});

//module.exports = routers
export default routers;