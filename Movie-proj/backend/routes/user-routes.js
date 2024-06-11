import express from "express";
import { deleteuser, getAllUsers, login, signup, updateUser } from "../controllers/user-controllers";
 
const userrouter = express.Router();

userrouter.get("/", getAllUsers);
userrouter.post("/signup", signup);
userrouter.put("/:id", updateUser);
userrouter.delete("/:id",deleteuser);
userrouter.post("/login",login)


export default userrouter