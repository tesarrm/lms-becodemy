require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMidleware } from "./middleware/error";
import userRouter from "./routes/user.route";
import courseRouter from "./routes/course.route";
import orderRouter from "./routes/order.route";
import notificationRoute from "./routes/notification.route";
import analyticsRouter from "./routes/analytics.route";

// body parser
app.use(express.json({ limit: "50mb" }));

// cookie parser
app.use(cookieParser());

// cors => cors origin resource sharing
app.use(
    cors({
        origin: process.env.ORIGIN,
    })
);

// routers
app.use(
    "/api/v1",
    userRouter,
    courseRouter,
    orderRouter,
    notificationRoute,
    analyticsRouter
)

// testing api
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        success: true,
        message: "API is working",
    });
});

// unknown route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Router ${req.originalUrl} not found`) as any;
    err.statusCode = 404;
    next(err);
})

app.use(ErrorMidleware)