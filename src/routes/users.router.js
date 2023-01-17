import express from 'express';
import { httpUpdateWallet, httpAddUser, httpGetUser } from "./users.controller.js";

const usersRouter = express.Router();

usersRouter.post('/', httpAddUser);
usersRouter.get('/', httpGetUser);
usersRouter.put('/', httpUpdateWallet);

export default usersRouter;
