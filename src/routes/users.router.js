import express from 'express';
import { httpAddUser } from "./users.controller.js";

const usersRouter = express.Router();

usersRouter.post('/', httpAddUser);

export default usersRouter;
