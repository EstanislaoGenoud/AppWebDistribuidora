import swaggerJSDoc, { Options } from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Gestión de Empresa",
      version: "1.0.0",
      description: "Documentación automática de la API del sistema de gestión",
    },
    servers: [
      {
        url: "http://appwebdistribuidora-production.up.railway.app", // Cambiar si usás HTTPS o puerto distinto
      },
    ],
  },
  // indicá la ruta donde están tus rutas .ts
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };