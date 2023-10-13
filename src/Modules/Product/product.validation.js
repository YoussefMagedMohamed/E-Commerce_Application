import Joi from "joi";

let idValidation = Joi.string().hex().length(24).required();

const addProductValidation = Joi.object({
  title: Joi.string().required().min(3).trim(),
});

const updateProductValidation = Joi.object({
  name: Joi.string().min(3),
  id: idValidation,
});

const deleteProductValidation = Joi.object({
  id: idValidation,
});

export {
  addProductValidation,
  updateProductValidation,
  deleteProductValidation,
};
