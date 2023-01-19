import joi from 'joi';

const signUpSchema = joi.object({
  name: joi.string().trim().required(),
  email: joi.string().email().trim().required(),
  password: joi.string().trim().required(),
  confirmPassword: joi.ref('password'),
});

export default signUpSchema;
