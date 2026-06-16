import { Router } from "express";
import { SignUp } from "../auth/SignUp.js";
import { Login } from "../auth/Login.js";

let route = Router();
route.post("/signup", SignUp);
route.post("/login", Login);

export default route;
