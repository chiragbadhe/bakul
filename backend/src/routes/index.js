const express = require("express");
const router = express.Router();
const ipfsController = require("../controllers/ipfsController");
const ethereumController = require("../controllers/ethereumController");

router.get("/", (req, res) => res.send("Hello World"));
router.post(
  "/generateEthTransferBlink",
  ethereumController.generateEthTransferBlinkCtrl
);
router.post(
  "/generateERC20TransferBlink",
  ethereumController.generateErc20TransferBlinkCtrl
);
router.post("/storeToIpfs", ipfsController.storeToIpfsCtrl);

module.exports = router;
