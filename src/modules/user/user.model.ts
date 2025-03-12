import mongoose, { Schema } from "mongoose";
import { IUser } from "./user.interface";

const UserSchema = new Schema<IUser>(
    {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      role: {
        type: String,
        enum: ["student", "instructor", "admin"],
        default : "student"
      },
      enrolledCourses: [{ 
        type: mongoose.Schema.Types.ObjectId,
         ref: "Course" }],
    },
    { timestamps: true }
  );
  
  const User = mongoose.model<IUser>("User", UserSchema);
  
  export default User;