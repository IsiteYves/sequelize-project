const swaggerDocs = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = {
  openapi: "1.0.0",
  definition: {
    components: {},
    info: {
      title: "User management app",
      description:
        "This is a backend server for managing users and allowing their authentication.\n\nMade with ❤️ by Yves ISITE",
      version: "1.0.0",
    },
    consumes: [
      "application/x-www-form-urlencoded",
      "application/json",
      "multipart/form-data",
    ],
    produces: ["application/json"],
    basePath: "/",
  },
  apis: ["./routes/*.js"],
};

const swaggerJsdoc = swaggerDocs(options);

exports.swaggerJsdoc = swaggerJsdoc;
exports.swaggerUi = swaggerUi;
