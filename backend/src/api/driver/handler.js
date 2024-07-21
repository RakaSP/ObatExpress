const autoBind = require("auto-bind");

class DriverHandler {
  constructor(driverService) {
    this._service = driverService;

    autoBind(this);
  }

  async getDashboardMetricsHandler(request) {
    const { DriverID } = request.params;
    const completedOrderCount = await this._service.getCompletedOrderCount(
      DriverID
    );
    const onTimeDeliveryCount = await this._service.getOnTimeDeliveryCount(
      DriverID
    );
    const driverStatus = await this._service.getDriverStatus(DriverID);

    return {
      status: "success",
      data: {
        completedOrderCount,
        onTimeDeliveryCount,
        driverStatus,
      },
    };
  }

  async getRecentDeliveryListHandler(request) {
    const { DriverID } = request.params;
    const recentDeliveryList = await this._service.getRecentDeliveries(
      DriverID
    );
    return {
      status: "success",
      data: {
        recentDeliveryList,
      },
    };
  }

  async getDeliveryRouteHandler(request) {
    const { DeliveryID } = request.params;
    const { route } = await this._service.getDeliveryRoute(DeliveryID);
    return {
      status: "success",
      data: {
        route,
      },
    };
  }

  async postReportHandler(request, h) {
    const { DriverID, Description, Date, Time, Location } = request.params;

    await this._service.addReport(DriverID, Description, Date, Time, Location);

    const response = h.response({
      status: "success",
      message: "Report added successfully",
    });
    response.code(201);
    return response;
  }

  async getDriverInfoHandler(request) {
    const { DriverID } = request.params;

    const driverPersonalInfo = await this._service.getDriverPersonalInfo(
      DriverID
    );
    return {
      message: "success",
      data: {
        driverPersonalInfo,
      },
    };
  }
}

module.exports = DriverHandler;
