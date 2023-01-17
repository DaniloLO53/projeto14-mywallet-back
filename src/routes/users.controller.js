import { ObjectId } from "bson";
import { addUser, getUser } from "../models/users.model.js";
import db from "../server.js";

async function httpAddUser(request, response) {
  const user = request.body;
  const alreadyExistHttpCode = 409;

  if (await addUser(user) === alreadyExistHttpCode) {
    return response.sendStatus(alreadyExistHttpCode);
  }

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
  const { email } = request.headers;

  console.log('Email: ', email);

  try {
    const user = await db.collection('users').findOne({ email });

    if (!user) return response.status(403).send('User not found');

    return response.status(200).send(user);
  } catch (error) {
    console.log('Error on: ', error);

    return response.sendStatus(400);
  }
};

async function httpUpdateWallet(request, response) {
  const { wallet, email } = request.headers;

  console.log(await db.collection("users").find().toArray());
  console.log(wallet)
  console.log(email)

  try {
    const result = await db
      .collection("users")
      .updateOne({ email }, { $set: { 'wallet': wallet } });

    if (result.modifiedCount === 0) return response.status(404).send("non-existent wallet");

    return response.status(204).send('Wallet successfully updated');
  } catch (error) {
    return response.status(500).send(error.message);
  }
};

export { httpAddUser, httpGetUser, getAllUsers, httpUpdateWallet };
