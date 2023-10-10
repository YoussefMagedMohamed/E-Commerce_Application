export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(
      {
        ...req.body,
        ...req.params,
        ...req.query,
      },
      { abortEarly: false }
    );
    let errors = [];
    if (error) {
      error.details.forEach((element) => {
        errors.push({ message: element.message, field: element.path[0] });
      });
      res.status(400).json(errors);
      console.log(error.details);
      res.json(errors);
    } else {
      next();
    }
  };
};
