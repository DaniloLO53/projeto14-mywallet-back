import express from 'express';
import { validateRegister } from '../../middewares/register.middleware.js';
import { addRegister, editRegister, getRegisters } from './register.controller.js';

const registerRouter = express.Router();

registerRouter.get('/home', getRegisters);
registerRouter.put('/nova-entrada', validateRegister, addRegister);
registerRouter.put('/nova-saida', validateRegister, addRegister);
registerRouter.put('/editar-entrada/:id', editRegister);

export default registerRouter;
