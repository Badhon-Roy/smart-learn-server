import { z } from "zod";

const createQuizValidation = z.object({
    body: z.object({
        course: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid course ID"),
        questions: z.array(
            z.object({
                question: z.string().min(5, "Question must be at least 5 characters"),
                options: z.array(z.string()).min(2, "At least two options are required"),
                correctAnswer: z.string().min(1, "Correct answer is required"),
            })
        ),
    })
});

export const QuizValidation = {
    createQuizValidation
}
