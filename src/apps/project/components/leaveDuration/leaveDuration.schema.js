import Joi from 'joi';

const schema = Joi.object({
  name: Joi.string(),
  code: Joi.string().alphanum().length(4),
  hours: Joi.number()
}).options({ allowUnknown: true });

export default schema;
