import signUpSchema from '../schemas/signUp.schema.js';
import signInSchema from '../schemas/signIn.schema.js';

async function validateSignUp(request, response, next) {
  const signUp = request.body;
  const validation = signUpSchema.validate(signUp);

  if (validation.error) {
    return response.status(422).send('Invalid signup infos');
  }

  next();
};

async function validateSignIn(request, response, next) {
  const signIn = request.body;
  const validation = signInSchema.validate(signIn);

  if (validation.error) {
    return response.status(422).send('Invalid signin infos');
  }

  next();
};

export { validateSignUp, validateSignIn };
