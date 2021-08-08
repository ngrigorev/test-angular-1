const orderService = require("../services/orderService");
const status = {
  error: "error",
  success: "success",
};

/** GET */
exports.getClients = (req, res) => {
  const filter = req.query.filter?.toLowerCase();

  try {
    const clients = orderService.getClients(filter);

    res.json({
      status: status.success,
      data: clients,
    });
  } catch (err) {
    res.json({
      status: status.error,
      message: err.message,
    });
  }
};
