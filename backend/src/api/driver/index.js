const DriverHandler = require("./handler");
const routes = require("./routes");

module.exports = {
  name: "driver",
  version: "1.0.0",
  register: async (server, { driverService }) => {
    const adminHandler = new DriverHandler(driverService);
    server.route(routes(driverHandler));
  },
};
