import  express from "express"
import { authRouter } from "./AuthRouter";




export let router = express.Router();



router.use(authRouter)

