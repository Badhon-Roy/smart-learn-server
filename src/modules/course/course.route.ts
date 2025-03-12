import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CourseValidation } from "./course.validation";
import { CourseControllers } from "./course.controller";

const router = Router();
router.post('/', validateRequest(CourseValidation.createCourseValidationSchema), CourseControllers.createCourseController)
router.get('/', CourseControllers.getAllCoursesController)
router.patch('/:id', CourseControllers.updateSingleCourse)
router.delete('/:id', CourseControllers.deleteSingleCourse)

export const courseRouter = router;