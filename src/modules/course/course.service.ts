import { ICourse } from "./course.interface";
import CourseModel from "./course.mode";

const createCourseIntoDB = async (courseData: ICourse) => {
    const course = await CourseModel.create(courseData);
    return course;
}
const getAllCoursesFromDB = async () => {
    const courses = await CourseModel.find().populate("instructor").populate("studentsEnrolled").populate('reviews.student');
    return courses;
};

const updateCourseIntoDB = async(id : string, data : ICourse)=>{
    const result = await CourseModel.findByIdAndUpdate(id, data,{
        new : true
    })
    return result;
}

const deleteCourseFromDB = async(id : string)=>{
    const result = await CourseModel.findByIdAndDelete(id)
    return result;
}

export const CourseServices ={
    createCourseIntoDB,
    getAllCoursesFromDB,
    updateCourseIntoDB,
    deleteCourseFromDB
}