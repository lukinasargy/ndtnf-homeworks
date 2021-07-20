import * as Joi from 'joi';
export const createBookSchema = Joi.object().keys({
  title: Joi.string().min(3).max(150).required(),
  description: Joi.string().min(3).max(150).optional(),
  authors: Joi.string().min(3).max(150).optional(),
  favorite: Joi.boolean().required(),
  fileCover: Joi.string().min(3).max(150).optional(),
  fileName: Joi.string().min(3).max(150).optional(),
  fileBook: Joi.string().min(3).max(150).optional(),
});
