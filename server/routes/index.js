const router = require("express").Router();
const orderController = require("./order");
const linkController = require("./link");
const clientController = require("./client");

router.get("/orders", orderController.getOrders);
router.get("/orders/:id", orderController.getOrder);
router.get("/orders/:id/clients", orderController.getOrderClients);
router.post("/orders/:id/clients", orderController.createOrderClients);

router.post("/link/add", linkController.linkClientToOrder);
router.post("/link/remove", linkController.unlinkClientFromOrder);

router.get("/clients", clientController.getClients);

module.exports = router;
