import Joi from "joi";

const schema = Joi.object({
  email: Joi.string(),
  role: Joi.string().allow(""),
  domain: Joi.string().allow(""),
}).options({ allowUnknown: true });

export default schema;
