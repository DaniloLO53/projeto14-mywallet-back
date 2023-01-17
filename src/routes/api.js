import express from 'express';
import usersRouter from "./users.router.js";

const api = express.Router();

api.use('/users', usersRouter);

export default api;
