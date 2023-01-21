import registerSchema from "../schemas/register.schema.js";

async function validateRegister(request, response, next) {
  const register = request.body;
  console.log('Register: ', register);
  const validation = registerSchema.validate(register);

  if (validation.error) {
    // console.log(`Invalid register data: ${validation.error}`)
    return response.status(422).send(`Invalid register data: ${validation.error}`);
  }

  // console.log('Valid register data');

  next();
};

export { validateRegister };
