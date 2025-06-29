import mongoose, { Schema } from "mongoose";
import { ICourse } from "./course.interface";

const CourseSchema = new Schema<ICourse>(
    {
        thumbnail: { type: String, required: true, trim: true },
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true },
        instructors: [{
            instructor: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            subject: { type: String, required: true }
        }],
        price: { type: Number, required: true },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },
        duration: { type: String, required: true },
        discountPrice: { type: Number },
        class: { type: String, required: true },
        subject: [{
            name: { type: String, required: true }
        }],
        classLevel: {
            type: String,
            enum: ["Beginner", "Intermediate", "Advanced"],
            required: true,
        },
        status: {
            type: String,
            enum: ["Ongoing", "Upcoming", "Completed"],
            default: "Upcoming"
        },

        lessons: [
            {
                title: { type: String, required: true },
                videoUrl: { type: String, required: true },
                isView: { type: Boolean, default: false },
                duration: { type: String },
            },
        ],

        whatYouWillLearn: [{ type: String }],

        faqs: [
            {
                question: { type: String, required: true },
                answer: { type: String, required: true },
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
                    required: true,
                },
                comment: { type: String, required: true },
                rating: {
                    type: Number,
                    required: true,
                    min: 1,
                    max: 5,
                },
                date: { type: Date, default: Date.now },
            },
        ],
    },
    { timestamps: true }
);

const CourseModel = mongoose.model<ICourse>("Course", CourseSchema);

export default CourseModel;
