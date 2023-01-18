import { ObjectId } from "bson";
import { addUser, getUser } from "../models/users.model.js";
import db from "../server.js";

async function httpAddUser(request, response) {
  const user = request.body;
  const alreadyExistHttpCode = 409;

  if (await addUser(user) === alreadyExistHttpCode) {
    return response.sendStatus(alreadyExistHttpCode);
  }

  console.log(user);

  return response.status(201).send({ ...user, wallet: [] });
};

async function getAllUsers(request, response) {
  try {
    const users = await db.collection('users').find().toArray();

    return response.status(200).send(users);
  } catch (error) {
    console.log('Error on: ', error);

    return response.sendStatus(403);
  }
};

async function httpGetUser(request, response) {
  const { email, password } = request.headers;


  try {
    const user = await db.collection('users').findOne({ email });
    console.log(user.password, Number(password))

    if (!user || Number(password) !== Number(user.password)) return response.status(403).send('User not found');

    return response.status(200).send(user);
  } catch (error) {
    console.log('Error on: ', error);

    return response.sendStatus(400);
  }
};

async function httpUpdateWallet(request, response) {
  const { data } = request.body;

  console.log(request.body)

  try {
    const result = await db
      .collection("users")
      .updateOne({ email: data.email }, { $set: { 'wallet': data.wallet } });

    console.log('user:', await db.collection("users").find({ email: data.email }).toArray())

    if (result.modifiedCount === 0) return response.status(404).send("non-existent wallet");

    const userUpdated = await db.collection("users").find({ email: data.email }).toArray();

    console.log(userUpdated[0].wallet)

    return response.status(200).json(userUpdated[0].wallet);
  } catch (error) {
    return response.status(500).send(error.message);
  }
};

export { httpAddUser, httpGetUser, getAllUsers, httpUpdateWallet };
