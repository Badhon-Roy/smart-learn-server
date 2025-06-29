import { z } from "zod";
export const createCourseValidationSchema = z.object({
  body: z.object({
    thumbnail: z.string().url("Invalid thumbnail URL"),
    title: z.string().min(3, "Title must be at least 3 characters long"),
    description: z.string().min(10, "Description must be at least 10 characters long"),
    instructors: z.array(
      z.object({
        instructor: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid instructor ID"),
        subject: z.string().min(5, "Subject name must be at least 2 characters long"),
      })
    ),
    category: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid category ID"),
    duration: z.string().min(1, "Duration is required"),
    price: z.number().min(0, "Price must be a positive number"),
    discountPrice: z.number().min(0, "Discount price must be a positive number").optional(),

    class: z.string().min(1, "Class is required"),
    subject: z.array(
      z.object({
        name: z.string().min(2, "Subject name must be at least 3 characters long")
      })
    ),

    classLevel: z.enum(["Beginner", "Intermediate", "Advanced"]),
    status: z.enum(["Ongoing", "Upcoming", "Completed"]).default("Upcoming"),
    lessons: z.array(
      z.object({
        title: z.string().min(3, "Lesson title must be at least 3 characters long"),
        videoUrl: z.string().url("Invalid video URL"),
        isView: z.boolean().default(false),
        duration: z.string().optional(),
      })
    ).min(1, "At least one lesson is required"),

    whatYouWillLearn: z.array(z.string()).optional(),

    faqs: z.array(
      z.object({
        question: z.string().min(5, "Question must be at least 5 characters long"),
        answer: z.string().min(5, "Answer must be at least 5 characters long"),
      })
    ).optional(),

    isApproved: z.boolean().default(false),

    studentsEnrolled: z.array(
      z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid student ID")
    ).optional(),

    rating: z.number().min(0).max(5).default(0),

    reviews: z.array(
      z.object({
        student: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid student ID"),
        comment: z.string().min(5, "Comment must be at least 5 characters long"),
        rating: z.number().min(1).max(5),
        date: z.string().optional(),
      })
    ).optional(),
  })
});

export const CourseValidation = {
  createCourseValidationSchema
}
