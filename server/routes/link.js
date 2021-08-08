/** POST */
const orderService = require("../services/orderService");

const status = {
  error: "error",
  success: "success",
};

exports.linkClientToOrder = (req, res) => {
  const idOrder = Number(req.body.idOrder);
  const idClient = Number(req.body.idClient);

  try {
    if (!idOrder || !idClient) {
      throw new Error("Invalid <data> in body");
    }

    const client = orderService.linkClientToOrder(idOrder, idClient);

    return res.json({
      status: status.success,
      message: "Client was linked",
      data: client,
    });
  } catch (err) {
    return res.json({
      status: status.error,
      message: err.message,
    });
  }
};

/** POST */
exports.unlinkClientFromOrder = (req, res) => {
  const idOrder = Number(req.body.idOrder);
  const idClient = Number(req.body.idClient);

  try {
    if (!idOrder || !idClient) {
      throw new Error("Invalid <data> in body");
    }

    orderService.unlinkClientFromOrder(idOrder, idClient);

    return res.json({
      status: status.success,
      message: "Client was unlinked",
    });
  } catch (err) {
    return res.json({
      status: status.error,
      message: err.message,
    });
  }
};
