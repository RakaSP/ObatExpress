const { nanoid } = require("nanoid");
const { exec } = require("child_process");
const util = require("util");
const ExecutionError = require("../exceptions/ExecutionError");
const NotFoundError = require("../exceptions/NotFoundError");
const execPromise = util.promisify(exec);

class AdminService {
  constructor(pool) {
    this._pool = pool;
  }

  async generateDB() {
    const { stdout, stderr } = await execPromise(
      "cd ../obatexpress_vrp3d && python rebuild_database.py"
    );

    if (stderr) {
      throw new ExecutionError("Error executing Python script");
    }

    console.log("Python script executed successfully");
  }

  async generateOrders() {
    const { stdout, stderr } = await execPromise(
      "cd ../obatexpress_vrp3d && generate_orders.py "
    );

    if (stderr) {
      throw new ExecutionError("Error executing Python script");
    }

    console.log("Python script executed successfully");
  }

  async generateVehicles() {
    const { stdout, stderr } = await execPromise(
      "cd ../obatexpress_vrp3d && python generate_vehicles.py"
    );

    if (stderr) {
      throw new ExecutionError("Error executing Python script");
    }

    console.log("Python script executed successfully");
  }

  async generateDelivers() {
    const { stdout, stderr } = await execPromise(
      "cd ../obatexpress_vrp3d && python deliver_orders.py"
    );

    if (stderr) {
      throw new ExecutionError("Error executing Python script");
    }

    console.log("Python script executed successfully");
  }

  async getTodayDeliveryCount() {
    // result = {count: num}
    const query = `QUERY`;
    const result = await this._pool.execute(query);
    if (!result.rowCount) {
      throw new NotFoundError(
        "Failed fetching Today's Delivery Count, Today's Delivery Count is not found."
      );
    }
    return result[0].count;
  }

  async getMonthlyDeliveryCount() {
    // result = {count: num}
    const query = `QUERY`;
    const result = await this._pool.execute(query);
    if (!result.rowCount) {
      throw new NotFoundError(
        "Failed fetching Monthly Delivery Count, Monthly Delivery Count is not found."
      );
    }
    return result[0].count;
  }

  async getDeliveryIssueCount() {
    // result = {count: num}
    const query = `QUERY`;
    const result = await this._pool.execute(query);
    if (!result.rowCount) {
      throw new NotFoundError(
        "Failed fetching Delivery Issue Count, Delivery Issue Count is not found."
      );
    }
    return result[0].count;
  }

  async getTotalDeliveryCount() {
    // result = {count: num}
    const query = `QUERY`;
    const result = await this._pool.execute(query);
    if (!result.rowCount) {
      throw new NotFoundError(
        "Failed fetching Total Delivery Count, Total Delivery Count is not found."
      );
    }
    return result[0].count;
  }

  async getDeliveryList() {
    /* result = [delivery1, delivery2] 
    delivery = 
    {
      id, 
      departureDate, 
      estimationCompletion, 
      completionDate,
      driverName,
      status(canceled, delivered, delayed, on progress, etc)
    }
    */ const query = `QUERY`;
    const [result] = await this._pool.execute(query);
    if (!result.rowCount) {
      throw new NotFoundError(
        "Failed fetching Delivery List, Delivery List is not found"
      );
    }
    return result;
  }

  // Employees page
  async getEmployeeCount() {
    // result = {count: num}
    const query = `QUERY`;
    const result = await this._pool.execute(query);
    if (!result.rowCount) {
      throw new NotFoundError(
        "Failed fetching Employee Count, Employee Count is not found."
      );
    }
    return result[0].count;
  }

  async getAdminCount() {
    // result = {count: num}
    const query = `QUERY`;
    const result = await this._pool.execute(query);
    if (!result.rowCount) {
      throw new NotFoundError(
        "Failed fetching Admin Count, Admin Count is not found."
      );
    }
    return result[0].count;
  }

  async getDriverCount() {
    // result = {count: num}
    const query = `QUERY`;
    const result = await this._pool.execute(query);
    if (!result.rowCount) {
      throw new NotFoundError(
        "Failed fetching Driver Count, Driver Count is not found."
      );
    }
    return result[0].count;
  }

  async getPackerCount() {
    // result = {count: num}
    const query = `QUERY`;
    const result = await this._pool.execute(query);
    if (!result.rowCount) {
      throw new NotFoundError(
        "Failed fetching Packer Count, Packer Count is not found."
      );
    }
    return result[0].count;
  }

  async getEmployeeList() {
    /* result = [employee1, employee2]
    employee = {
      id,
      name,
      email,
      adress,
      phone,
      age,
      gender,
      role(admin, driver, packer),
      employmentType(full-time, part-time)
    }
    */
    const query = `QUERY`;
    const result = await this._pool.execute(query);
    if (!result.rowCount) {
      throw new NotFoundError(
        "Failed fetching Employee List, Employee List is not found"
      );
    }
    return result;
  }

  async addEmployee(
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
  ) {
    const employeeId = nanoid(16);

    // Bisa dihilangin kalo ada data yang ga sesuai db, contoh klo ga ada birthday hapus aja
    // 2nd argument of pool.execute inserted into values on query in orders
    const query = `
      INSERT INTO employees (
        id, name, ...
      ) VALUES (?, ?, )
    `;
    const result = await this._pool.execute(query, [employeeId, name]);

    if (!result.rowCount) {
      throw new Error(
        "Failed to add employee, insertion did not affect any rows"
      );
    }
    return result[0].employeeId;
  }

  // Vehicle page
  async getVehicleList() {
    /*
    result = [vehicle1, vehicle2]
    vehicle = {
      id,
      type(truck, scooter, etc),
      plateNumber,
      status(ready, maintenance, on-delivery),
      weight,
      maxWeight
    }
    */
    const query = `QUERY`;
    const result = await this._pool.execute(query);
    if (!result.rowCount) {
      throw new NotFoundError(
        "Failed fetching Vehicle List, Vehicle List is not found"
      );
    }
    return result;
  }

  // Shipment page
  async getDeliveryDetail(deliveryId) {
    // Untuk sekarang ignore aja dlu ini
    const query = `SELECT * FROM Delivery WHERE id = ?`;
    const result = await this._pool.execute(query, [deliveryId]);
    if (!result.rowCount) {
      throw new NotFoundError(
        "Failed fetching Delivery List, Delivery List is not found"
      );
    }
    return result;
  }

  // Order page
  async getOrderList(deliveryId) {
    /*
    result = [order1, order2]
    order = {
      id,
      orderDate,
      ETA,
      status(processing, confirmed, preparation, on-delivery, delivered),
      address,
      customerId,
      itemsId: [itemId1, itemId2, itemId3]
    }
    */
    const query = `QUERY`;
    const result = await this._pool.execute(query, [deliveryId]);
    if (!result.rowCount) {
      throw new NotFoundError(
        "Failed fetching Order List, Order List is not found"
      );
    }
    return result;
  }
}

module.exports = AdminService;
