import db from '../../server.js'
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { ObjectId } from 'mongodb';

async function signUp(request, response) {
  const data = request.body;

  try {
    const salt = 10;

    const passwordHash = bcrypt.hashSync(data.password, salt)

    if (await db.collection('users').findOne({ email: data.email })) {
      return response.status(409).send('User already exists');
    }

    await db.collection('users').insertOne({ ...data, password: passwordHash });

    return response.status(201).send('CREATED');
  } catch (error) {
    console.log('BAD REQUEST: ', error);
    return response.sendStatus(500);
  }
};

async function signIn(request, response) {
  const data = request.body;

  try {
    const user = await db.collection('users').findOne({ email: data.email });

    if (!user || !bcrypt.compareSync(data.password, user.password)) {
      return response.status(403).send('User not found');
    }

    const token = uuid();

    const previousSession = await db.collection('sessions').findOne({ 'userId': user._id });

    if (previousSession) {
      await db.collection('sessions').updateOne(
        { 'userId': ObjectId(user._id) },
        { $set: { token } },
      );

      return response.status(201).send(token);
    }

    await db.collection('sessions').insertOne({ 'userId': user._id, token });

    return response.status(201).send(token);
  } catch (error) {
    console.log('Error: ', error);
    return response.sendStatus(500);
  }
};

async function getSessions(request, response) {
  try {
    const sessions = await db.collection('sessions').find({}).toArray();

    return response.status(200).send(sessions);
  } catch (error) {
    console.log('Error: ', error);
    return response.sendStatus(500);
  }
};

export { signUp, signIn, getSessions };
