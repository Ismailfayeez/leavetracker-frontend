import { useState } from "react";
import Joi from "joi";
export default function useValidator(data, schema) {
  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      const errorData = {};
      error.details.forEach((errDetail) => {
        errorData[errDetail.path] = errDetail.message;
      });
      setErrors({ ...errorData });
      return error;
    }
  };
  const validateProperty = (name) => {
    const propertySchema = Joi.object({ [name]: schema.extract(name) });
    const { error, value } = propertySchema.validate({ [name]: data[name] });
    if (!error) {
      const errorData = { ...errors };
      delete errorData[name];
      setErrors(errorData);
      return;
    }
    setErrors({ ...errors, [name]: error.details[0].message });
  };
  return [errors, setErrors, validateForm, validateProperty];
}
