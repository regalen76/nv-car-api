import express, { Application } from "express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import userController from "./controllers/UserController";
import fs from "fs";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
require("dotenv").config();

// set swagger options
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hello World",
      version: "1.0.0",
    },
    tags: [
      {
        name: "Authentication",
        description: "API operations related to user authentication",
      },
    ],
  },
  apis: [`${__dirname}/controllers/*.ts`],
};

//setup swagger and express
const swaggerDocs = swaggerJsDoc(swaggerOptions);
const app: Application = express();
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

if (process.env.VERCEL_ENV !== "production") {
  // add path to swagger, and redirect swagger when hit /
  app.get("/", (_req, res) => {
    res.redirect("/swagger-ui");
  });
  app.use("/swagger-ui", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

  // all router path
  app.use("/user", userController);

  // redirect user when go to undefined path
  app.use((_req, res) => {
    const html = fs.readFileSync(
      `${__dirname}/util/html/redirectSwagger.html`,
      "utf-8",
    );
    res.send(html);
  });
}

export default app;
