const NotFoundError = require("../exceptions/NotFoundError");

class PackerService {
  constructor(pool) {
    this._pool = pool;
  }

  async getDeliveryIDList() {
    const query = "QUERY";
    const result = await this._pool.execute(query);
    if (!result.rowCount) {
      throw new NotFoundError(
        "Failed fetching delivery ID list, delivery ID List is not found"
      );
    }
    return result;
  }

  async getCardboardIDList(deliveryID) {
    // RESULT = [deliveryID1, deliveryID2]
    const query = "QUERY";
    const result = await this._pool.execute(query, [deliveryID]);
    if (!result.rowCount) {
      throw new NotFoundError(
        "Failed fetching cardboard ID List, cardboard ID List is not found"
      );
    }
    return result;
  }

  async getPackingData() {
    /*
    RESULT = {
        ID,
        type(VehicleContainer/Container/Item),
        SizeX,
        SizeY,
        SizeZ,
    }
    
    RESULT2 untuk itemList
    RESULT2 = [
        {
            ID,
            Type(Container/Item)
            SizeX,
            SizeY,
            SizeZ,
            PosX,
            PosY,
            PosZ,
            OrderID
        }
    ]
    */
    const query = "QUERY";
    const result = await this._pool.execute(query, [deliveryID]);
    if (!result.rowCount) {
      throw new NotFoundError("Pack data is not found");
    }
    return result;
  }
}

module.exports = PackerService;
