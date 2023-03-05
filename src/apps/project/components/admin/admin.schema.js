import Joi from "joi";

const schema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }),
  role: Joi.allow(""),
}).options({ allowUnknown: true });

export default schema;
