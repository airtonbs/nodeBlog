//const { Router } = require('express');
import { Router } from 'express'
import fs from 'fs';

const routers = Router();

// Requisições via post
routers.post('/:code', (req, res) => {
    var code = req.params.code;
    let data = new Date();
    let retornoCode = [];
    var msg = { "msg": "Code inserido com sucesso!" };
    var validaCode = false;
    var obj = {};

    if (fs.existsSync(`./validation/code`)) {
        retornoCode = JSON.parse(fs.readFileSync(`./validation/code`));
        retornoCode.filter(function(dados) {
            if (code == dados.code) {
                msg = { "msg": "Code já existe!" };
                validaCode = true;
                obj = { "code": dados.code, "data": dados.data }
                return obj;
            }
        });
    }
    if (validaCode != true) {
        retornoCode.push({ "code": code, "data": data });
        fs.writeFileSync(`./validation/code`, JSON.stringify(retornoCode));
        obj = { "code": code, "data": data };
    }

    obj = {...obj, ...msg };

    res.send(obj);
});

//module.exports = routers
export default routers;