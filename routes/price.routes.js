const priceController = require("../controllers/updatePrice.controller");
const express = require("express");
const router = express.Router();

router.post("/", priceController.addNewPrice);
router.get("/", priceController.getPrice);
router.put("/:id", priceController.updatePrice);

module.exports = router;
