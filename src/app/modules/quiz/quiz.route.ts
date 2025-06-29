import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { QuizValidation } from "./quiz.validation";
import { QuizControllers } from "./quiz.controller";

const router = express.Router();

router.post("/", validateRequest(QuizValidation.createQuizValidation), QuizControllers.createQuiz);
router.get("/", QuizControllers.getAllQuizzes);
router.get("/:id", QuizControllers.getSingleQuiz);
router.patch("/:id", QuizControllers.updateQuiz);
router.delete("/:id", QuizControllers.deleteQuiz);

export const quizRouter = router;
