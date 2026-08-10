import type { Request, Response } from "express";

export interface HttpResponse<T = any> {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
}

export function sendResponse<T>(
  req: Request,
  res: Response,
  payload: HttpResponse<T>
) {
  return res.status(payload.statusCode).json(payload);
}