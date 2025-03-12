import mongoose from "mongoose";


export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: "student" | "instructor" | "admin";
    enrolledCourses: mongoose.Types.ObjectId[];
  }