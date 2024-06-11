import express from "express";
import Admin from "../models/Admin";
import { addAdmin, getAdmins, loginAdmin } from "../controllers/Admin-controllers";
const adminrouter = express.Router();

adminrouter.post("/login",loginAdmin);
adminrouter.post("/signup",addAdmin);
adminrouter.get("/ ",getAdmins);


export default adminrouter