import express from "express";
import { config } from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import cors from 'cors';

config({
    path:"./data/config.env",
})


export const app=express();
//Using Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        credentials:true,
        methods:["GET","POST","PUT","DELETE"],
        origin:[process.env.FRONTEND_URI_1,process.env.FRONTEND_URI_2]
    })
)

app.get("/",(req,res,next)=>{
    res.send("working");
});
//import routes

import user from './routes/user.js'
import product from './routes/product.js'
import order from './routes/orders.js'

app.use("/api/v1/user",user);
app.use("/api/v1/product",product);
app.use("/api/v1/order",order);
//Using Error Middleware
app.use(errorMiddleware)
