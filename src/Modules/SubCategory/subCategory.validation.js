import Joi from "joi";

let idValidation = Joi.string().hex().length(24).required();

const addSubCategoryValidation = Joi.object({
  name: Joi.string().required().min(3),
  category: idValidation,
});

const updateSubCategoryValidation = Joi.object({
  name: Joi.string().min(3),
  id: idValidation,
});

const deleteSubCategoryValidation = Joi.object({
  id: idValidation,
});

export {
  addSubCategoryValidation,
  updateSubCategoryValidation,
  deleteSubCategoryValidation,
};
