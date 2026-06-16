import { Router } from "express";
import { createCategory, DeleteCategory, getAllCategory, UpdateCategory } from "../controllers/categoryController.js";
import { isAdmin, verifyToken } from "../middlewares/AuthMiddleware.js";


let route = Router();
route.post("/category",verifyToken, isAdmin, createCategory);
route.get("/category", getAllCategory);
route.put("/category/:id", verifyToken, isAdmin, UpdateCategory);
route.delete("/category/:id", verifyToken, isAdmin, DeleteCategory);


export default route;
