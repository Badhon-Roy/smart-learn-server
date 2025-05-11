import { Types } from "mongoose";

export interface ICourse {
    thumbnail: string;
    title: string;
    description: string;
    instructors: {
        instructor: Types.ObjectId;
        subject: string;
    }[];
    price: number;
    discountPrice?: number;
    class: string;
    subject: {
        name: string
    }[];
    classLevel: 'Beginner' | 'Intermediate' | 'Advanced';
    lessons: {
        title: string;
        videoUrl: string;
        isView: boolean;
        duration?: string;
    }[];
    isApproved: boolean;
    studentsEnrolled?: Types.ObjectId[];
    rating?: number;
    reviews?: {
        student: Types.ObjectId;
        comment: string;
        rating: number;
        date: Date;
    }[];
    whatYouWillLearn?: string[];
    faqs?: {
        question: string;
        answer: string;
    }[];
    status: "Ongoing" | "Upcoming" | "Completed",
}
