import Joi from "joi";

let idValidation = Joi.string().hex().length(24).required();

const addCategoryValidation = Joi.object({
  name: Joi.string().required().min(3),
});

const updateCategoryValidation = Joi.object({
  name: Joi.string().min(3),
  id: idValidation,
});

const deleteCategoryValidation = Joi.object({
  id: idValidation,
});

export {
  addCategoryValidation,
  updateCategoryValidation,
  deleteCategoryValidation,
};
