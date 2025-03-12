import mongoose, { Schema } from "mongoose";
import { IQuiz } from "./quiz.interface";

const QuestionSchema = new Schema({
    question: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswer: { type: String, required: true },
});

const QuizSchema = new Schema<IQuiz>({
    course: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Course"
    },
    questions: { type: [QuestionSchema], required: true },
});

const Quiz = mongoose.model<IQuiz>("Quiz", QuizSchema);

export default Quiz;
