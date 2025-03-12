import { Request, Response } from "express";
import { QuizServices } from "./quiz.service";
import catchAsync from "../../utils/catchAsync";
import Quiz from "./quiz.model";

const createQuiz = catchAsync(async (req, res) => {
    const quiz = await QuizServices.createQuiz(req.body);
    res.status(201).json({
        success: true,
        message: "Quiz created successfully",
        data: quiz,
    });
})

const getAllQuizzes = catchAsync(async (req, res) => {
    const quizzes = await QuizServices.getAllQuizFromDB();
    res.status(200).json({
        success: true,
        message: "Quizzes retrieved successfully",
        data: quizzes
    });
})

const getSingleQuiz = catchAsync(async (req, res) => {
    const { id } = req.params;
    const quiz = await QuizServices.getSingleQuiz(id);
    res.status(200).json({
        success: true,
        message: "Quiz retrieved successfully",
        data: quiz
    });

})

//* update quiz
const updateQuiz = catchAsync(async (req, res) => {
    const { id } = req.params;
    const course = await QuizServices.updateQuiz(id, req?.body);
    res.status(200).json({
        success: true,
        message: "Quiz update successfully",
        data: course,
    });
});

//* delete quiz
const deleteQuiz = catchAsync(async (req, res) => {
    const { id } = req.params;
    const isExistQuiz = await Quiz.findById(id)
    if (!isExistQuiz) {
        throw new Error("Quiz not found!")
    }
    await QuizServices.deleteQuizFromDB(id);
    res.status(200).json({
        success: true,
        message: "Quiz delete successfully"
    });
});

export const QuizControllers = {
    createQuiz,
    getAllQuizzes,
    getSingleQuiz,
    updateQuiz,
    deleteQuiz
}
