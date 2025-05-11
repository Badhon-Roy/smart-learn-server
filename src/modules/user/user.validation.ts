import { z } from "zod";

const registerUserValidationSchema = z.object({
    body: z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        photo: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Invalid email format"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        role: z.enum(["student", "instructor", "admin"]).default('student'),
        enrolledCourses: z.array(z.string()).optional(),
    })
});

export const userValidationSchema = {
    registerUserValidationSchema
}