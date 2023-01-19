import joi from 'joi';

const registerSchema = joi.object({
  date: joi.number().integer().required(),
  value: joi.number().required(),
  description: joi.string().required(),
  type: joi.string().valid('income', 'outcome').required(),
});

export default registerSchema;
