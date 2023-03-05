import Joi from 'joi';

const schema=Joi.object({
 name:Joi.string(),
 code:Joi.string().alphanum().length(4)
}).options({allowUnknown: true});

export default schema
