export const globalError = (err, req, res, next) => {
  let error = err.message;
  let errorCode = err.statusCode || 500;
  process.env.MODE == "development"
    ? res.status(errorCode).json({ error, stack: err.stack })
    : res.status(errorCode).json({ error });
};
