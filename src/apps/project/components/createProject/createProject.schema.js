import Joi from "joi";

const schema = Joi.object({
  name: Joi.string().min(5).max(25),
  description: Joi.string().max(100).allow(""),
}).options({ allowUnknown: true });

export default schema;
