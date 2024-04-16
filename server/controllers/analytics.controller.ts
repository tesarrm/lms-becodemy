import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import { generateLast12MonthsDate } from "../utils/analytics.generator";
import userModel from "../models/user.model";
import OrderModel from "../models/order.model";
import CourseModel from "../models/course.model";


// get uses analytics -- only for admin
export const getUserAnalytics = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await generateLast12MonthsDate(userModel)

            res.status(200).json({
                success: true,
                users,
            })
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 500))
        }
    }
)

// get course analytics -- only for admin
export const getCourseAnalytics = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const courses = await generateLast12MonthsDate(CourseModel)

            res.status(200).json({
                success: true,
                courses,
            })
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 500))
        }
    }
)

// get order analytics -- only for admin
export const getOrderAnalytics = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const orders = await generateLast12MonthsDate(OrderModel)

            res.status(200).json({
                success: true,
                orders,
            })
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 500))
        }
    }
)