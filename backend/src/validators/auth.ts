import Joi from "joi";
//Registrera användare
export const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Måste vara en giltig e-postadress",
    "any.required": "E-post är obligatorisk",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Lösenordet måste vara minst 6 tecken",
  }),
});
// Logga in användare
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
