import { IQuiz } from "./quiz.interface";
import Quiz from "./quiz.model";


const createQuiz = async (quiz: IQuiz) => {
    const result = await Quiz.create(quiz);
    return result;
}
const getAllQuizFromDB = async () => {
    const result = await Quiz.find().populate("course", "_id title")
    return result;
};

const getSingleQuiz = async(id : string)=>{
    const result = await Quiz.findById(id).populate("course", "_id title")
    return result;
}
const updateQuiz = async(id : string, data : IQuiz)=>{
    const result = await Quiz.findByIdAndUpdate(id, data,{
        new : true
    })
    return result;
}

const deleteQuizFromDB = async(id : string)=>{
    const result = await Quiz.findByIdAndDelete(id)
    return result;
}

export const QuizServices = {
    createQuiz,
    getAllQuizFromDB,
    getSingleQuiz,
    updateQuiz,
    deleteQuizFromDB
}