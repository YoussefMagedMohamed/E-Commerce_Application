import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./Database/dbConnection.js";
import { bootstrap } from "./src/bootstrap.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static("uploads"));
dotenv.config();

// Database connection
dbConnection();

// Bootstrap
bootstrap(app);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
