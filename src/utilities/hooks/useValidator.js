import { useCallback, useState } from 'react';
import Joi from 'joi';

export default function useValidator(data, schema) {
  const [errors, setErrors] = useState({});
  const validateForm = useCallback(() => {
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      const errorData = {};
      error.details.forEach((errDetail) => {
        errorData[errDetail.path] = errDetail.message;
      });
      setErrors({ ...errorData });
      return error;
    }
  }, [data, schema]);

  const validateProperty = useCallback(
    (name) => {
      const propertySchema = Joi.object({ [name]: schema.extract(name) });
      const { error } = propertySchema.validate({ [name]: data[name] });
      if (!error) {
        setErrors((prevErrors) => {
          const errorData = { ...prevErrors };
          delete errorData[name];
          return errorData;
        });
        return;
      }
      setErrors((prevErrors) => ({ ...prevErrors, [name]: error.details[0].message }));
    },
    [data, schema]
  );
  return [errors, validateForm, validateProperty, setErrors];
}
