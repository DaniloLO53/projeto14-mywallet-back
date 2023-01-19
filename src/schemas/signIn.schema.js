import joi from 'joi';

const signInSchema = joi.object({
  email: joi.string().email().trim().required(),
  password: joi.string().trim().required(),
});

export default signInSchema;
