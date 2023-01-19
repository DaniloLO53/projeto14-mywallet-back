import db from "../../server.js";
import { ObjectId } from 'mongodb';

async function getRegisters(request, response) {
  const { authorization } = request.headers;
  const token = authorization?.replace('Bearer ', '');

  try {
    const session = await db.collection('sessions').findOne({ token });

    console.log(session);

    // if (!session || !token) return response.sendStatus(401);

    const registers = await db.collection('registers').find({ userId: ObjectId(session.userId) }).toArray();

    return response.status(200).send(registers);
  } catch (error) {
    console.log('Error: ', error);
    return response.sendStatus(500);
  }
}

async function addRegister(request, response, next) {
  const register = request.body;
  const { authorization } = request.headers;
  const token = authorization?.replace('Bearer ', '');

  try {
    const session = await db.collection('sessions').findOne({ token });

    if (!session || !token) return response.sendStatus(401);

    await db.collection('registers').insertOne({ token, register, userId: ObjectId(session.userId) });

    return response.sendStatus(201);
  } catch (error) {
    console.log('Error: ', error);
    return response.sendStatus(500);
  }
};

export { getRegisters, addRegister };
