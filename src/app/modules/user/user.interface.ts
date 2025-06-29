import mongoose, { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";


export interface IUser extends Document {
  name: string;
  photo: string;
  email: string;
  password: string;
  role: "student" | "instructor" | "admin";
  enrolledCourses: mongoose.Types.ObjectId[];
}

export interface UserModel extends Model<IUser> {
  isUserExistsByCustomEmail(email : string) : Promise<IUser>;
  isPasswordMatched(plaintextPassword: string, hashPassword: string): Promise<boolean>;
}

export type IUserRole = keyof typeof USER_ROLE;