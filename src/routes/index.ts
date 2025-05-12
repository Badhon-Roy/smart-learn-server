import { Router } from "express";
import { userRouter } from "../modules/user/user.route";
import { authRouter } from "../modules/auth/auth.route";
import { courseRouter } from "../modules/course/course.route";
import { quizRouter } from "../modules/quiz/quiz.route";
import { categoryRouter } from "../modules/category/category.route";

const router = Router();

const moduleRoutes = [
    {
        path: "/users",
        route: userRouter
    },
    {
        path: "/auth",
        route: authRouter
    },
    {
        path: "/courses",
        route: courseRouter
    },
    {
        path: "/quizzes",
        route: quizRouter
    },
    {
        path: "/categories",
        route: categoryRouter
    }
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router;