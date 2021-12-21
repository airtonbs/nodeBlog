import { Router } from 'express'
import express from 'express'

const routers = Router();

routers.use('/imgs', express.static('./public/imgs'));

export default routers;