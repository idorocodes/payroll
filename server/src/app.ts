 import express, { Request, Response } from "express";
import cors from "cors";
import { sendResponse, HttpResponse } from "./types/HttpResponse"; 

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/v1/health", (req: Request, res: Response) => {
  const resp: HttpResponse = {
    statusCode: 200,
    message: "Payroll Backend working well !",
    success: true
  };

  sendResponse(req, res, resp);
});

export default app;
