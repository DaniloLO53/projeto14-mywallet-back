import db from "../../server.js";
import { ObjectId } from 'mongodb';

async function getRegisters(request, response) {
  const { authorization } = request.headers;
  const token = authorization?.replace('Bearer ', '');

  try {
    const session = await db.collection('sessions').findOne({ token });

    if (!session) {
      return response.status(401).send('Não autorizado');
    };

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

    await db.collection('registers').updateOne({
      userId: ObjectId(session.userId)
    },
      {
        $push: { registers: register },
        $set: { userId: session.userId },
      },
      { upsert: true },
    );

    return response.status(201).send({
      token,
      userId: ObjectId(session.userId),
    });
  } catch (error) {
    console.log('Error: ', error);
    return response.sendStatus(500);
  }
};

async function editRegister(request, response) {
  const {
    now,
    value,
    description,
    type,
    userId,
    index: registerIndex,
  } = request.body;
  const { authorization } = request.headers;
  const token = authorization?.replace('Bearer ', '');
  const session = await db.collection('sessions').findOne({ token });

  try {
    if (!session || !token) {
      return response.status(401).send('Não autorizado');
    };
    const userRegisters = await db.collection('registers').find({
      userId: ObjectId(userId),
    }).toArray();

    userRegisters[0].registers[registerIndex] = { now, value, description, type };

    await db.collection('registers').updateOne(
      { userId: ObjectId(userId) },
      {
        $set: { userId: ObjectId(userId), registers: userRegisters[0].registers },
      },
      { upsert: true },
    )

    return response.status(201).send(userId);
  } catch (error) {
    console.log('Error: ', error);
    return response.status(500).send(error);
  }
};

async function deleteRegister(request, response) {
  const {
    userId,
    name: registerIndex,
  } = request.body;
  const { authorization } = request.headers;
  const token = authorization?.replace('Bearer ', '');
  const session = await db.collection('sessions').findOne({ token });

  try {
    if (!session || !token) {
      return response.status(401).send('Não autorizado');
    };
    const userRegisters = await db.collection('registers').find({
      userId: ObjectId(userId),
    }).toArray();

    const registersFiltered = userRegisters[0].registers.filter((register, index) => index !== Number(registerIndex));

    await db.collection('registers').updateOne(
      { userId: ObjectId(userId) },
      {
        $set: { userId: ObjectId(userId), registers: registersFiltered },
      },
      { upsert: true },
    );

    const registers = await db.collection('registers').find({ userId: ObjectId(userId) }).toArray();

    return response.status(201).send(registers);
  } catch (error) {
    console.log('Error: ', error);
    return response.status(500).send(error);
  }
};


export { getRegisters, addRegister, editRegister, deleteRegister };
