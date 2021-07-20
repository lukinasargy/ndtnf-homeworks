import * as Joi from 'joi';
export const createUserSchema = Joi.object().keys({
  email: Joi.string().min(3).max(150).email().required(),
  password: Joi.string().min(3).max(150).required(),
  firstName: Joi.string().min(1).max(150).optional(),
  lastName: Joi.string().min(1).max(150).optional(),
});
