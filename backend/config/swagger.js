const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "DevelopersHub API",
      version: "1.0.0",
      description: "API documentation for DevelopersHub Agency",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/*.js"], // IMPORTANT: must match your folder
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;