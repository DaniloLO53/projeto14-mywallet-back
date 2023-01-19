import express from 'express';
import { validateSignUp } from '../../middewares/user.middleware.js';
import { getSessions, signIn, signUp } from './user.controller.js'

const userRouter = express.Router();

userRouter.post('/cadastro', validateSignUp, signUp);
userRouter.post('/', signIn);
userRouter.get('/', getSessions);

export default userRouter;
