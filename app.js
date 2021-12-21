// Importando express
// const express = require('express'); //(programação com require)
// Para funcionar o import deve ter no arquivo package.json a linha "type": "module",
import express from 'express';
// Importando rotas
//const postRouter = require('./routers/post.router'); //(programação com require)
import codeRouter from './routers/code.router.js';
import tokenRouter from './routers/token.router.js';
import postRouter from './routers/post.router.js';
import blogRouter from './routers/blog.router.js';
import staticRouter from './routers/static.router.js';

const app = express();

// Informando ao express que vai receber requisições no body com formato json
app.use(express.json());

app.use('/code', codeRouter);
app.use('/token', tokenRouter);
app.use('/post', postRouter);
app.use('/blog', blogRouter);
app.use(staticRouter);

// FAzendo escutar na porta 3000
app.listen(3000, () => {

    console.log('Rodando na porta 3000');
});