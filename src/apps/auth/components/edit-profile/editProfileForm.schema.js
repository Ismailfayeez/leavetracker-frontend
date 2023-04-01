import Joi from 'joi';

const schema = Joi.object({
  username: Joi.string().min(3).max(30).label('name').required(),
  timezone: Joi.string().required(),
  country: Joi.string().required()
}).options({ allowUnknown: true });

export default schema;
