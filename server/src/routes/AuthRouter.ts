import express from "express";
import {

  EmployeeLogin,
  
} from "../controllers/AuthControllers";

export let authRouter = express.Router();


authRouter.post("/auth/employee/login", EmployeeLogin);
