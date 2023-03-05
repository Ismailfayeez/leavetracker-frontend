import Joi, { required } from "joi";

const schema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string().min(8).max(15).required().label("Password"),
  confirmPassword: Joi.any()
    .when("password", {
      is: Joi.exist(),
      then: Joi.equal(Joi.ref("password")),
    })
    .label("Confirm password")
    .messages({ "any.only": "{{#label}} does not match" }),
  username: Joi.string(),
  country: Joi.string(),
  timezone: Joi.string(),
}).options({ allowUnknown: true });

export default schema;
