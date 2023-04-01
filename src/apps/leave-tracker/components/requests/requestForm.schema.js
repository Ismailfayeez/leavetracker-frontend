import Joi from 'joi';
import moment from 'moment';

const schema = Joi.object({
  from: Joi.date().min(moment().format('YYYY-MM-DD')).required().messages({
    'date.min': 'from date should  be greater than the current date'
  }),
  to: Joi.date()
    .min(moment().format('YYYY-MM-DD'))
    .when('from', { is: Joi.exist(), then: Joi.date().min(Joi.ref('from')) })
    .messages({
      'date.min': 'to date should be greater than or equal to from date'
    }),
  leaveType: Joi.string().label('leave type'),
  leaveDuration: Joi.string().label('leave duration'),
  reachoutPerson: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label('reachout person'),
  leaveReason: Joi.string().allow('')
}).options({ allowUnknown: true });

export default schema;
