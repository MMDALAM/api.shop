const express = require("express");
const app = express();
const http = require("http");
const mongoose = require("mongoose");
const path = require("path");
const swaggerUI = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const morgan = require("morgan");
const { AllRouters } = require("./router/router");
const createError = require("http-errors");
const cors = require("cors");

module.exports = class Application {
  #DB_URL;
  #PORT;
  constructor(PORT, DB_URL) {
    this.#PORT = PORT;
    this.#DB_URL = DB_URL;
    this.configApplication();
    this.createServer();
    this.connectMongoDB();
    this.createRouter();
    this.errorHandling();
  }

  configApplication() {
    app.use(cors());
    app.use(morgan("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, "..", "public")));
    app.use(
      "/api-doc",
      swaggerUI.serve,
      swaggerUI.setup(
        swaggerJsdoc({
          swaggerDefinition: {
            info: {
              title: "Boto start store ",
              version: "2.0.0",
              description:
                "بزرگترین مرجع اموزش برنامه نویسی و فروش محصولات جذاب برای برنامه نویسان",
              contact: {
                name: "mmdalam",
                url: "https://mmdalam.ir",
                email: "mmmohammadalam@gmail.com",
              },
            },
            servers: [{ url: "http://localhost:5000" }],
          },
          apis: ["./app/router/**/*.js"],
        })
      )
    );
  }
  createServer() {
    http.createServer(app).listen(this.#PORT, () => {
      console.log("run http://localhost:" + this.#PORT);
    });
  }
  connectMongoDB() {
    try {
      mongoose.Promise = global.Promise;
      mongoose.set("strictQuery", false);
      mongoose.connect(this.#DB_URL);
      mongoose.connection.on("connected", () => {
        console.log("mongoose connected to DB");
      });
      mongoose.connection.on("disconnected", () => {
        console.log("mongoose disconnected");
      });
      process.on("SIGINT", async () => {
        await mongoose.connection.close();
        console.log("disconnected");
        process.exit(0);
      });
    } catch (error) {
      if (error) return console.log("faild to connected to MongoDB");
    }
  }
  createRouter() {
    app.use(AllRouters);
  }
  errorHandling() {
    app.use((req, res, next) => {
      next(createError.NotFound("آدرس مورد نظر یافت نشد"));
    });
    app.use((error, req, res, next) => {
      const serverError = createError.InternalServerError();
      const statusCode = error.status || serverError.status;
      const message = error.message || serverError.message;
      return res.status(statusCode).json({
        data: null,
        errors: {
          statusCode,
          message,
        },
      });
    });
  }
};
