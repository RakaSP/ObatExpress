const autoBind = require("auto-bind");

class AdminHandler {
  constructor(adminService) {
    this._service = adminService;

    autoBind(this);
  }

  async postGenerateDBHandler() {
    await this._service.generateDB();
    const response = h.response({
      status: "success",
      message: "Database generated successfully",
    });
    response.code(200);
    return response;
  }

  async postGenerateOrdersHandler() {
    await this._service.generateOrders();
    const response = h.response({
      status: "success",
      message: "Orders generated successfully",
    });
    response.code(200);
    return response;
  }

  async postGenerateVehiclesHandler() {
    await this._service.generateVehicles();
    const response = h.response({
      status: "success",
      message: "Vehicles generated successfully",
    });
    response.code(200);
    return response;
  }

  async postGenerateDeliversHandler() {
    await this._service.generateDB();
    const response = h.response({
      status: "success",
      message: "Deliveries generated successfully",
    });
    response.code(200);
    return response;
  }

  async getDashboardMetricsHandler() {
    const todayDeliveryCount = await this._service.getTodayDeliveryCount();
    const monthlyDeliveryCount = await this._service.getMonthlyDeliveryCount();
    const deliveryIssueCount = await this._service.getDeliveryIssueCount();
    const totalDeliveryCount = await this._service.getTotalDeliveryCount();

    return {
      status: "success",
      data: {
        todayDeliveryCount,
        monthlyDeliveryCount,
        deliveryIssueCount,
        totalDeliveryCount,
      },
    };
  }

  async getDeliveryListHandler() {
    const deliveryList = await this._service.getDeliveryList();
    return {
      status: "success",
      data: {
        deliveryList,
      },
    };
  }

  async getEmployeeMetricsHandler() {
    const employeeCount = await this._service.getEmployeeCount();
    const adminCount = await this._service.getAdminCount();
    const driverCount = await this._service.getDriverCount();
    const packerCount = await this._service.getPackerCount();

    return {
      status: "success",
      data: {
        employeeCount,
        adminCount,
        driverCount,
        packerCount,
      },
    };
  }

  async getEmployeeListHandler() {
    const employeeList = await this._service.getEmployeeList();
    return {
      status: "success",
      data: {
        employeeList,
      },
    };
  }

  async postEmployeeHandler(request, h) {
    const {
      name,
      birthday,
      language,
      gender,
      address,
      phoneNumber,
      email,
      nationality,
      role,
      employmentType,
    } = request.params;

    await this._service.addEmployee(
      name,
      birthday,
      language,
      gender,
      address,
      phoneNumber,
      email,
      nationality,
      role,
      employmentType
    );

    const response = h.response({
      status: "success",
      message: "Employee added successfully",
    });
    response.code(201);
    return response;
  }

  async getVehicleListHandler() {
    const vehicleList = await this._service.getVehicleLists();
    return {
      message: "success",
      data: {
        vehicleList,
      },
    };
  }

  async getDeliveryDetailHandler(request) {
    const { deliveryId } = request.params;
    const deliveryDetail = await this._service.getDeliveryDetail(deliveryId);
    return {
      message: "success",
      data: { deliveryDetail },
    };
  }

  async getOrderListHandler(request) {
    const { deliveryId } = request.params;
    const { deliveryList } = await this._service.getOrderList(deliveryId);
    return {
      message: "success",
      data: { deliveryList },
    };
  }
}

module.exports = AdminHandler;
