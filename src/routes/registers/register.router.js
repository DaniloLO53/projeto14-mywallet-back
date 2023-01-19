import express from 'express';
import { validateRegister } from '../../middewares/register.middleware.js';
import { addRegister, getRegisters } from './register.controller.js';

const registerRouter = express.Router();

registerRouter.get('/home', getRegisters);
registerRouter.post('/nova-entrada', validateRegister, addRegister);
registerRouter.post('/nova-saida', validateRegister, addRegister);

export default registerRouter;
