import { Types } from "mongoose";

export interface ICourse {
    title: string;
    description: string;
    instructor: Types.ObjectId;
    price: number;
    category: string;
    language: string;
    lessons: {
        title: string;
        videoUrl: string;
    }[];
    studentsEnrolled: Types.ObjectId[];
    rating: number;
    reviews: {
        student: Types.ObjectId;
        comment: string;
        rating: number;
    }[];
}
