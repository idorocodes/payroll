import type { Response, Request } from "express";

export type HttpResponse = {
  statusCode: number;
  message: string;
  success: boolean;
};

export const sendResponse = (
  req: Request,
  res: Response,
  response: HttpResponse,
) => {
  const { statusCode, message, success } = response;

  return res.status(statusCode).json({
    statusCode,
    success,
    message,
  });
};
