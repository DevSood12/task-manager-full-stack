import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Manager API",
      version: "1.0.0",
      description: "API documentation for Task Management System",
    },

    servers: [
      {
        url: "http://localhost:5000",
        description: "Local server",
      },
      {
        url: "https://task-manager-full-stack-dcau.onrender.com",
        description: "Render server",
      },
    ],

    // ✅ Add JWT Authorization support in Swagger
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },

  // ✅ Swagger will scan these files for docs
  apis: ["./src/routes/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);
