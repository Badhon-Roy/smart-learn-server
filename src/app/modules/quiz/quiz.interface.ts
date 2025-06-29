import { Types } from "mongoose";

export interface IQuestion {
    question: string;
    options: string[];
    correctAnswer: string;
  }
  
  export interface IQuiz {
    course: Types.ObjectId;
    questions: IQuestion[];
  }
  