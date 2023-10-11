import Joi from "joi";

let idValidation = Joi.string().hex().length(24).required();

const addBrandValidation = Joi.object({
  name: Joi.string().required().min(3),
});

const updateBrandValidation = Joi.object({
  name: Joi.string().min(3),
  id: idValidation,
});

const deleteBrandValidation = Joi.object({
  id: idValidation,
});

export {
  addBrandValidation,
  updateBrandValidation,
  deleteBrandValidation,
};
