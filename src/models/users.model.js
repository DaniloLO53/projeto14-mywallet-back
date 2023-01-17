import db from "../server.js";

async function addUser(user) {
  const alreadyExistHttpCode = 409;
  const alreadyExist = await db.collection('users').findOne({ email: user.email });

  if (alreadyExist) return alreadyExistHttpCode;

  return await db.collection('users').insertOne(user);
}

export { addUser };
