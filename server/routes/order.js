const orderService = require("../services/orderService");

const status = {
  error: "error",
  success: "success",
};

/** GET */
exports.getOrders = (req, res) => {
  try {
    const orders = orderService.getOrders();

    return res.json({
      status: status.success,
      data: orders,
    });
  } catch (err) {
    return res.json({
      status: status.error,
      message: err.message,
    });
  }
};

/** GET */
exports.getOrder = (req, res) => {
  const id = Number(req.params.id);

  try {
    if (!id) {
      throw new Error("Invalid <id> parameter");
    }

    const order = orderService.getOrder(id);

    return res.json({
      status: status.success,
      data: order,
    });
  } catch (err) {
    return res.json({
      status: status.error,
      message: err.message,
    });
  }
};

/** GET */
exports.getOrderClients = (req, res) => {
  const id = Number(req.params.id);

  try {
    if (!id) {
      throw new Error("Invalid <id> parameter");
    }

    const client = orderService.getOrderClients(id);

    res.json({
      status: status.success,
      data: client,
    });
  } catch (err) {
    res.json({
      status: status.error,
      message: err.message,
    });
  }
};

/** POST */
exports.createOrderClients = (req, res) => {
  const id = Number(req.params.id);
  const { password, data } = req.body;
  try {
    if (!id) {
      throw new Error("Invalid <id> parameter");
    } else if (!data) {
      throw new Error("Invalid <data> in body");
    } else if (orderService.user.password !== password) {
      throw new Error("Incorrect password");
    }
    const client = orderService.createOrderClients(id, data);

    return res.json({
      status: status.success,
      data: client,
      message: "Client was created",
    });
  } catch (err) {
    return res.json({
      status: status.error,
      message: err.message,
    });
  }
};
