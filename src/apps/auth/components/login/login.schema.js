import Joi from 'joi';

const schema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string().min(8).max(15).required().label('Password')
}).options({ allowUnknown: true });

export default schema;
