import { HttpResponse, sendResponse } from "../types/HttpResponse";
import type { Request, Response } from "express";
import { checkValidEmail } from "../utils/valueChecker";
import { db } from "../config/db";
import bcrypt from "bcrypt";
import { generateEmployeeToken } from "../utils/jwt";

export let EmployeeLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;


    if (!email || !password) {
      const response: HttpResponse = {
        statusCode: 400,
        message: "All fields must be supplied",
        success: false,
      };
      return sendResponse(req, res, response); 
    }

    
    if (!checkValidEmail(email)) {
      const response: HttpResponse = {
        statusCode: 400,
        message: "Invalid email format",
        success: false,
      };
      return sendResponse(req, res, response); 
    }


    const user = await db.user.findUnique({
      where: { email },
      include: {
        memberships: {
          include: { company: true },
        },
      },
    });

 
    if (!user) {
      const response: HttpResponse = {
        statusCode: 401,
        message: "Invalid Credentials",
        success: false,
      };
      return sendResponse(req, res, response); 
    }


    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      const response: HttpResponse = {
        statusCode: 401,
        message: "Invalid Credentials",
        success: false,
      };
      return sendResponse(req, res, response); // 👈 Added return
    }

   
    const token = generateEmployeeToken(user);

   
    const response: HttpResponse = {
      statusCode: 200,
      message: "Employee logged in successfully",
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          memberships: user.memberships,
        },
      },
    };

    return sendResponse(req, res, response);
  } catch (error) {
    const response: HttpResponse = {
      statusCode: 500,
      success: false,
      message: String(error),
    };

    return sendResponse(req, res, response);
  }
};