import Joi from "joi";

export const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email' : 'Måste vara en giltig e-postadress',
    'any.required': 'E-post är obligatorisk'
  }),
  password: 
});
