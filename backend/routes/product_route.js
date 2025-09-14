import express from "express";
import * as productController from "../controller/product_controller.js";
const router = express.Router();
router.get("/", productController.getAll);

router.post("/", productController.save);

router.delete("/:id", productController.del);

router.put("/:id", productController.update);

export default router;
