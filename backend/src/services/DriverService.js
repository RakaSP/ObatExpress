const { nanoid } = require("nanoid");
const NotFoundError = require("../exceptions/NotFoundError");
const InvariantError = require("../exceptions/InvariantError");

class DriverService {
  constructor(pool) {
    this._pool = pool;
  }

  async getCompletedOrderCount(DriverID) {
    //result = {count}
    const query = `QUERY`;
    const result = await this._pool.query(query, [DriverID]);
  }

  async getOnTimeDeliveryCount(DriverID) {
    // result = {count}
    const query = `QUERY`;
    const result = await this._pool.query(query, [DriverID]);
  }
  async getDriverStatus(DriverID) {
    //result = {status(in route, etc), DeliveryID}
    // DeliveryID nandain delivery yang sedang di-handle sama driver
    const query = `QUERY`;
    const result = await this._pool.query(query, [DriverID]);
    if (!result.rowCount) {
      throw new NotFoundError("Failed to find driver " + DriverID + " status");
    }

    if (!result[0].DeliveryID) {
      result[0].notInRoute = true;
    }

    return result[0];
  }

  async getRecentDeliveries(DriverID) {
    /* result = {delivery1, delivery2}
        delivery = 
        {
            id,
            Date,
            TotalCustomer,
            TotalDistance,
            TotalWeight
            (kalo ada rekomendasi data yang mau ditambahin ke tabel infokan)
        }
        */
  }

  async getDeliveryRoute(DeliveryID) {
    /* RESULT = {order1, order2}
    GudangAwal = ....
    gudangAkhir = ....
    detail gudangAwal sama gudangAkhir nanti ae
    
    order = 
    {
      id,
      OrderDate,
      ETA,
      CustomerName,
      CustomerAddress (opsi = lat coordinate + lgn coordinate / address text),
      Status(delivered, onProgress),
      deliverySequence (kalo bisa sorted, order1 yang dikirim duluan)
    }
    */
    const query = "QUERY";
    const result = await this._pool.execute(query, [DeliveryID]);

    const queryGudangAwal = "...";
    const gudangAwal = await this._pool.execute(queryGudangAwal);
    const queryGudangAkhir = "...";
    const gudangAkhir = await this._pool.execute(queryGudangAkhir);

    if (!result.rowCount || !gudangAwal.rowCount || !gudangAkhir.rowCount) {
      throw new NotFoundError(
        "Failed fetching data, some required records are not found or query failed"
      );
    }
    return { route: [gudangAwal, gudangAkhir, result] };
  }

  async addReport(DriverID, Description, Date, Time, Location) {
    // date sama time kalo mau digabung infokan
    const reportID = nanoid(16);
    const query = `INSERT INTO ...`;
    const result = await this._pool.execute(query);
    if (!result.rowCount) {
      throw new InvariantError("Failed adding report");
    }
  }

  async getDriverPersonalInfo(DriverID) {
    /* 
    result = 
    {
        id, 
        name, 
        gender, 
        birthday,
        age, 
        employmentDate, 
        employmentType(fulltime/parttime),
        email,
        phoneNumber,
        address
    }
    */
    const query = `SELECT ... FROM ... WHERE id = ?`;
    const result = await this._pool.query(query, [DriverID]);
    if (!result.rowCount) {
      throw new NotFoundError(
        "Failed fetching driver detail, driver ID: " + DriverID + "is not found"
      );
    }
    return result;
  }
}

module.exports = DriverService;
