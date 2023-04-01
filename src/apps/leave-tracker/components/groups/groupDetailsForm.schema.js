import Joi from 'joi';

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  description: Joi.string().allow('')
}).options({ allowUnknown: true });

export default schema;
