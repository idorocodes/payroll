import { NextFunction, Request, Response } from "express";
import { HttpResponse, sendResponse } from "../types/HttpResponse";

export const error404 = (req: Request, res: Response, next: NextFunction) => {
  let response: HttpResponse = {
    statusCode: 404,
    success: false,
    message: "This resource does not exist on this server",
  };

  sendResponse(req, res, response);

  next();
};
