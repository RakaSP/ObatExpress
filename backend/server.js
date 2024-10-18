require("dotenv").config();

const Hapi = require("@hapi/hapi");
const Jwt = require("@hapi/jwt");
const Inert = require("@hapi/inert");
const mysql = require("mysql2/promise");
const path = require("path");

const adminApi = require("./src/api/admin");
const AdminService = require("./src/services/AdminService");

const driverApi = require("./src/api/driver");
const DriverService = require("./src/services/DriverService");

// const adminApi = require("./src/api/admin");
// const AdminService = require("./src/services/AdminService");

const init = async () => {
  // Create the Hapi server instance
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  // Create the MySQL connection pool
  const pool = mysql.createPool({
    host: process.env.SQLHOST,
    user: process.env.SQLUSER,
    password: process.env.SQLPASSWORD,
    database: process.env.SQLDATABASE,
    port: process.env.SQLPORT,
  });

  // Attach the connection pool to the server's app object
  server.app.db = pool;

  // Error handling middleware
  server.ext("onPreResponse", (request, h) => {
    const { response } = request;
    if (response instanceof Error) {
      if (!response.isServer) {
        return h.continue;
      }

      const newResponse = h.response({
        status: "error",
        message: "An error occurred on our server",
      });
      newResponse.code(500);
      return newResponse;
    }

    return h.continue;
  });

  // Register plugins
  await server.register([
    {
      plugin: Jwt,
    },
    {
      plugin: Inert,
    },
  ]);

  await server.register([
    {
      plugin: adminApi,
      options: {
        adminService: AdminService,
      },
    },
  ]);

  // Start the server
  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

// Initialize the server
init().catch((err) => {
  console.error("Error starting server:", err);
});
