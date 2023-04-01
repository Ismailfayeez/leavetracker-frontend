import Joi from 'joi';
import moment from 'moment';

const schema = Joi.object({
  title: Joi.string(),
  message: Joi.string(),
  expiryDate: Joi.date().min(moment().add(1, 'days').format('YYYY-MM-DD')).required().messages({
    'date.min': 'expiry date cannot be lesser than or equal to the current date'
  }),
  priority: Joi.string(),
  teams: Joi.array().min(1).messages({ 'array.min': 'atleast one group should be added' })
}).options({ allowUnknown: true });

export default schema;
