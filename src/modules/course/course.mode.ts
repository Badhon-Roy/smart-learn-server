import mongoose, { Schema } from "mongoose";
import { ICourse } from "./course.interface";

const CourseSchema = new Schema<ICourse>(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true },
        instructor: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        price: { type: Number, required: true },
        category: { type: String, required: true },
        language: { type: String, required: true },
        lessons: [
            {
                title: { type: String, required: true },
                videoUrl: { type: String, required: true },
            },
        ],
        isApproved: { type: Boolean, default: false },
        studentsEnrolled: [{ type: Schema.Types.ObjectId, ref: "User" }],
        rating: { type: Number, default: 0 },
        reviews: [
            {
                student: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                    required: true
                },
                comment: { type: String, required: true },
                rating: {
                    type: Number,
                    required: true,
                    min: 1, max: 5
                },
            },
        ],
    },
    { timestamps: true }
);

const CourseModel = mongoose.model<ICourse>("Course", CourseSchema);

export default CourseModel;
