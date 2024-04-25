import express from "express"
import { addAnswer, addQuestion, addReplyToReview, addReview, deleteCourse, editCourse, generateVideoUrl, getAllCourse, getAllCourses, getCourseByUser, getSingleCourse, uploadCourse } from "../controllers/course.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import { updateAccessToken } from "../controllers/user.controller";
const courseRouter = express.Router()

courseRouter.post(
    "/create-course",
    updateAccessToken,
    isAuthenticated,
    authorizeRoles("admin"),
    uploadCourse
)
courseRouter.put(
    "/edit-course/:id",
    updateAccessToken,
    isAuthenticated,
    authorizeRoles("admin"),
    editCourse
)
courseRouter.get(
    "/get-course/:id",
    getSingleCourse
)
courseRouter.get(
    "/get-courses",
    getAllCourse
)
courseRouter.get(
    "/get-course-content/:id",
    updateAccessToken,
    isAuthenticated,
    getCourseByUser
)
courseRouter.put(
    "/add-question",
    updateAccessToken,
    isAuthenticated,
    addQuestion
)
courseRouter.put(
    "/add-answer",
    updateAccessToken,
    isAuthenticated,
    addAnswer
)
courseRouter.put(
    "/add-review/:id",
    updateAccessToken,
    isAuthenticated,
    addReview
)
courseRouter.put(
    "/add-reply",
    updateAccessToken,
    isAuthenticated,
    authorizeRoles("admin"),
    addReplyToReview
)
courseRouter.get(
    "/get-courses",
    updateAccessToken,
    isAuthenticated,
    authorizeRoles("admin"),
    getAllCourses
)
courseRouter.post(
    "/getVdoCipherOTP",
    generateVideoUrl
)
courseRouter.delete(
    "/delete-course",
    updateAccessToken,
    isAuthenticated,
    authorizeRoles("admin"),
    deleteCourse
)


export default courseRouter