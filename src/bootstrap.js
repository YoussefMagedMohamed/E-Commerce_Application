export const bootstrap = (app) => {
  app.get("/", (req, res) => res.send("Hello World!"));
};
