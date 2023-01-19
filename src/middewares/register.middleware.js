import registerSchema from "../schemas/register.schema.js";

async function validateRegister(request, response, next) {
  const register = request.body;
  const validation = registerSchema.validate(register);

  if (validation.error) {
    return response.status(422).send('Invalid register data');
  }

  next();
};

export { validateRegister };
