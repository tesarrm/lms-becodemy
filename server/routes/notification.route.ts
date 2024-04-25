import express from "express"
import { authorizeRoles, isAuthenticated } from "../middleware/auth"
import { getNotifications, updateNotification } from "../controllers/notificatioin.controller"
import { updateAccessToken } from "../controllers/user.controller"

const notificationRoute = express.Router()

notificationRoute.get("/get-all-notifications", isAuthenticated, authorizeRoles("admin"), getNotifications)
notificationRoute.put("/update-notification/:id", updateAccessToken, isAuthenticated, authorizeRoles("admin"), updateNotification)

export default notificationRoute