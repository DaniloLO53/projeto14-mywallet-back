import db from "../server.js";

async function addUser(user) {
  const userSignedUp = await db.collection('users').findOne({ email: user.email });
  const alreadyExistHttpCode = 409;

  if (userSignedUp) return alreadyExistHttpCode;

  return await db.collection('users').insertOne({ ...user, wallet: [] });
};

async function getUser(user) {
  const userSignedUp = await db.collection('users').findOne({ email: user.email });
  const accessDeniedCode = 403;

  if (!userSignedUp) return accessDeniedCode;

  return userSignedUp;
};

export { addUser, getUser };
