import { z } from "zod";
const createCourseValidationSchema = z.object({
    body: z.object({
        title: z.string().min(3, "Title must be at least 3 characters long"),
        description: z.string().min(10, "Description must be at least 10 characters long"),
        instructor: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid instructor ID"),
        price: z.number().min(0, "Price must be a positive number"),
        category: z.string().min(3, "Category must be at least 3 characters long"),
        language: z.string().min(2, "Language must be at least 2 characters long"),
        lessons: z.array(
            z.object({
                title: z.string().min(3, "Lesson title must be at least 3 characters long"),
                videoUrl: z.string().url("Invalid video URL"),
            })
        ).min(1, "At least one lesson is required"),
        studentsEnrolled: z.array(z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid student ID")).optional(),
        rating: z.number().min(0).max(5).default(0),
        reviews: z.array(
            z.object({
                student: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid student ID"),
                comment: z.string().min(5, "Comment must be at least 5 characters long"),
                rating: z.number().min(1).max(5),
            })
        ).optional(),
    })
});

export const CourseValidation = {
    createCourseValidationSchema
}
