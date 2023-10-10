// {
//     "title":"Xiaomi S9",
//     "description":"Good",
//     "price": 1000,
//     "stock":20,
//     "priceAfterDiscount":200,
//     "sold":5,
//     "category":"652159ebd5676ff857a45846",
//     "subCategory":"6522a37d250262d596d834ac",
//     "brand":"6522a854252f17c731c7dac1",
//     "rateingAvg":4,
//     "rateingCount":25
// }

import Joi from "joi";

let idValidation = Joi.string().hex().length(24).required();

const addProductValidation = Joi.object({
  title: Joi.string().required().min(3).trim(),
//   category: idValidation,
//   subCategory: idValidation,
//   brand: idValidation,
//   description: Joi.string().required().min(3).max(100).trim(),
//   price: Number().required().min(0),
//   stock: Number().required().min(0),
//   priceAfterDiscount: number().required().min(0),
//   sold: Number().required().min(0),
//   rateingAvg: Number().min(1).max(5),
//   rateingCount: Number().min(0),
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
