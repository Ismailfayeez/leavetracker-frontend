import Joi from 'joi';

const schema = Joi.object({
  code: Joi.string().length(4),
  name: Joi.string()
}).options({ allowUnknown: true });

export default schema;
