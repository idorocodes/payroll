 import express, { Request, Response } from "express";
import cors from "cors";
import { sendResponse, HttpResponse } from "./types/HttpResponse"; 
import { router } from "./routes/routes";
import { error404 } from "./middlewares/Error404";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1",router)

app.get("/api/v1/health", (req: Request, res: Response) => {
  const resp: HttpResponse = {
    statusCode: 200,
    message: "Payroll Backend working well !",
    success: true
  };

  sendResponse(req, res, resp);
});




app.use(error404)
export default app;
