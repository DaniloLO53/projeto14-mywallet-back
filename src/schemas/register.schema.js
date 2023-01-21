import joi from 'joi';

const registerSchema = joi.object({
  now: joi.string().required(),
  value: joi.number().required(),
  description: joi.string().required(),
  type: joi.string().valid('income', 'outcome').required(),
});

export default registerSchema;
