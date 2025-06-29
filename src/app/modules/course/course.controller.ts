import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import CourseModel from "./course.model";
import { CourseServices } from "./course.service";


const createCourseController = catchAsync(async (req, res) => {
    const { title } = req?.body;
    const isExistCourse = await CourseModel.findOne({ title })
    if (isExistCourse) {
        throw new AppError(409, "This course is already exist!")
    }
    const course = await CourseServices.createCourseIntoDB(req.body);
    res.status(201).json({
        success: true,
        message: "Course created successfully",
        data: course,
    });
});


const getAllCoursesController = catchAsync(async (req, res) => {
    const courses = await CourseServices.getAllCoursesFromDB();
    res.status(200).json({
        success: true,
        message: "Courses retrieved successfully",
        data: courses,
    });
});
const getSingleCourseController = catchAsync(async (req, res) => {
    const { id } = req.params;
    const courses = await CourseServices.getSingleCourseFromDB(id);
    res.status(200).json({
        success: true,
        message: "Course retrieved successfully",
        data: courses,
    });
});

//* update single Course
const updateSingleCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const course = await CourseServices.updateCourseIntoDB(id, req?.body);
    res.status(200).json({
        success: true,
        message: "Course update successfully",
        data: course,
    });
});

//* delete single Course
const deleteSingleCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const isExistCourse = await CourseModel.findById(id)
    if (!isExistCourse) {
        throw new Error("Course not found!")
    }
    await CourseServices.deleteCourseFromDB(id);
    res.status(200).json({
        success: true,
        message: "Course delete successfully"
    });
});


export const addLesson = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const lesson = req.body;
    if (!lesson?.title || !lesson?.videoUrl) {
        throw new Error("Title and videoUrl are required")
    }
    const updatedCourse = await CourseServices.addLessonToCourseFromDB(courseId, lesson);
    if (!updatedCourse) {
        throw new Error("Course not found")
    }
    res.status(200).json({
        success: true,
        message: "Lesson added successfully",
        data: updatedCourse,
    });

})


const updateCourseApproval = catchAsync(async (req, res) => {

    const { courseId } = req.params;
    const { isApproved } = req.body;

    const updatedCourse = await CourseServices.updateCourseApproval(courseId, isApproved);

    res.status(200).json({
        success: true,
        message: `Course approval updated successfully`,
        data: updatedCourse,
    });
})

const updateCourseStatus = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const { status } = req.body;
    const updatedCourse = await CourseServices.updateCourseStatus(courseId, status);
    res.status(200).json({
        success: true,
        message: `Course status updated successfully`,
        data: updatedCourse,
    });
}
);

export const CourseControllers = {
    createCourseController,
    getAllCoursesController,
    getSingleCourseController,
    updateSingleCourse,
    deleteSingleCourse,
    addLesson,
    updateCourseApproval,
    updateCourseStatus
}