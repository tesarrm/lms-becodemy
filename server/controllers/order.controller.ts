import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import { IOrder } from "../models/order.model";
import userModel from "../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import CourseModel from "../models/course.model";
import { newOrder } from "../services/order.service";
import sendMail from "../utils/sendMail";
import path from "path";
import ejs from "ejs"
import NotificationModel from "../models/notification.model";

// create order
export const createOrder = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { courseId, payment_info } = req.body as IOrder

        const user = await userModel.findById(req.user?._id)

        const courseExistsInUser = user?.courses.some((course: any) => course._id.toString() === courseId)

        if (courseExistsInUser) {
            return next(new ErrorHandler("You have already purchased this course", 400))
        }

        const course = await CourseModel.findById(courseId)

        if (!course) {
            return next(new ErrorHandler("Course not found", 404))
        }

        const data: any = {
            courseId: course._id,
            userId: user?._id,
            payment_info,
        }

        const mailData = {
            order: {
                _id: course._id.toString().slice(0, 6),
                name: course.name,
                price: course.price,
                date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
            }
        }

        const html = await ejs.renderFile(path.join(__dirname, '../mails/order-confirmation.ejs'), { order: mailData })

        try {
            if (user) {
                await sendMail({
                    email: user.email,
                    subject: "Order Confirmation",
                    template: "order-confirmation.ejs",
                    data: mailData,
                })
            }

        } catch (error: any) {
            return next(new ErrorHandler(error.message, 500))
        }

        user?.courses.push(course?._id)

        await user?.save()

        await NotificationModel.create({
            user: user?._id,
            title: "New Order",
            message: `You have a new order from ${course?.name}`,
        })

        course.purchased ? course.purchased += 1 : course.purchased = 1

        await course.save()

        newOrder(data, res, next)

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
})