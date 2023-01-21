import db from "../../server.js";
import { ObjectId } from 'mongodb';

async function getRegisters(request, response) {
  const { authorization } = request.headers;
  const token = authorization?.replace('Bearer ', '');

  console.log('Register request with token: ', token);

  try {
    const session = await db.collection('sessions').findOne({ token });
    console.log('Current session: : ', session);

    console.log('List of sessions: ', await db.collection('sessions').find().toArray());
    // console.log('Session: ', session, token);

    // if (!session || !token) return response.sendStatus(401);


    const registers = await db.collection('registers').find({ userId: ObjectId(session.userId) }).toArray();

    // console.log('User registers: ', registers[0].registers);

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
    console.log('Token from addRegister: ', token)
    const session = await db.collection('sessions').findOne({ token });

    console.log('Session: ', session);
    console.log('UserId from session: ', session.userId)

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

  try {
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

export { getRegisters, addRegister, editRegister };
