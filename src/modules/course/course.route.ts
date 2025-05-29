import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CourseValidation } from "./course.validation";
import { CourseControllers } from "./course.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();
router.post('/', auth(USER_ROLE.instructor), validateRequest(CourseValidation.createCourseValidationSchema), CourseControllers.createCourseController)
router.get('/', CourseControllers.getAllCoursesController)
router.get('/:id', CourseControllers.getSingleCourseController)
router.patch('/:id', auth(USER_ROLE.instructor), CourseControllers.updateSingleCourse)
router.patch('/:courseId/add-lesson', auth(USER_ROLE.instructor), CourseControllers.addLesson)
router.patch("/approve/:courseId", auth(USER_ROLE.admin), CourseControllers.updateCourseApproval);
router.patch("/status/:courseId", auth(USER_ROLE.instructor), CourseControllers.updateCourseStatus);
router.delete('/:id', auth(USER_ROLE.instructor, USER_ROLE.admin), CourseControllers.deleteSingleCourse)

export const courseRouter = router;