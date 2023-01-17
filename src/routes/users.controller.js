import { addUser } from "../models/users.model.js";

async function httpAddUser(request, response) {
  const user = request.body;
  const alreadyExistHttpCode = 409;

  if (await addUser(user) === alreadyExistHttpCode) {
    return response.sendStatus(alreadyExistHttpCode);
  }

  return response.status(201).send(user);
};

export { httpAddUser };
