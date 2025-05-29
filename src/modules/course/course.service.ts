import { ICourse } from "./course.interface";
import CourseModel from "./course.mode";

const createCourseIntoDB = async (courseData: ICourse) => {
    const course = await CourseModel.create(courseData);
    return course;
}
const getAllCoursesFromDB = async () => {
    const courses = await CourseModel.find().populate("instructors.instructor").populate("category").populate("studentsEnrolled").populate('reviews.student');
    return courses;
};
const getSingleCourseFromDB = async (id: string) => {
    const course = await CourseModel.findById(id).populate("instructors.instructor").populate("category").populate("studentsEnrolled").populate('reviews.student');
    return course;
};

const updateCourseIntoDB = async (id: string, data: ICourse) => {
    const result = await CourseModel.findByIdAndUpdate(id, data, {
        new: true
    })
    return result;
}

const deleteCourseFromDB = async (id: string) => {
    const result = await CourseModel.findByIdAndDelete(id)
    return result;
}

const addLessonToCourseFromDB = async (
    courseId: string,
    lesson: {
        title: string;
        videoUrl: string;
        isView?: boolean;
        duration?: string;
    }
) => {
    const updatedCourse = await CourseModel.findByIdAndUpdate(
        courseId,
        { $push: { lessons: lesson } },
        { new: true }
    );

    return updatedCourse;
};

const updateCourseApproval = async (courseId: string, isApproved: boolean) => {

    const updatedCourse = await CourseModel.findByIdAndUpdate(
        courseId,
        { isApproved },
        { new: true }
    );

    if (!updatedCourse) {
        throw new Error("Course not found");
    }

    return updatedCourse;
};

const updateCourseStatus = async (courseId: string, status: "Ongoing" | "Upcoming" | "Completed") => {
    const updatedCourse = await CourseModel.findByIdAndUpdate(courseId, { status }, { new: true });
    if (!updatedCourse) {
        throw new Error("Course not found");
    }
}

export const CourseServices = {
    createCourseIntoDB,
    getAllCoursesFromDB,
    getSingleCourseFromDB,
    updateCourseIntoDB,
    deleteCourseFromDB,
    addLessonToCourseFromDB,
    updateCourseApproval,
    updateCourseStatus
}