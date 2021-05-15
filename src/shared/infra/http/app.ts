import "reflect-metadata";

import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";

import path from "path";

import swaggerUi from "swagger-ui-express";
import swaggerFile from "../../../swagger.json";

import "@shared/container";
import createConnection from "../typeorm";

import appRouter from "@shared/infra/http/routes";
import AppError from "@shared/errors/AppError";

createConnection();

export const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(
  "/files/avatar",
  express.static(path.resolve(__dirname, "..", "tmp", "avatar"))
);

app.use(appRouter);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Intarnal server error - ${err.message}`,
    });
  }
);

