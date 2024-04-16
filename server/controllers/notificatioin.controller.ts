import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import NotificationModel from "../models/notification.model";
import cron from "node-cron"

// get all notification by admin
export const getNotifications = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notifications = await NotificationModel.find().sort({ createdAt: -1 })

        res.status(201).json({
            success: true,
            notifications
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
})

// upate notification status by admin
export const updateNotification = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notification = await NotificationModel.findById(req.params.id)
        if (!notification) {
            return next(new ErrorHandler("Notification not found", 404))
        } else {
            notification.status
                ? (notification.status = "read")
                : notification?.status
        }

        await notification.save()

        const notifications = await NotificationModel.find().sort({ createdAt: -1 })

        res.status(201).json({
            success: true,
            notifications
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
})

// delete notification --- only admin
cron.schedule("*/5 * * * * *", async () => {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    await NotificationModel.deleteMany({ status: "read", createAt: { $lt: thirtyDaysAgo } })
    console.log('Delete read notifications')
})