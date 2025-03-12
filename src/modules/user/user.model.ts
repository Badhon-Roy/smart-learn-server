import mongoose, { Schema } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt"
import config from "../../config";

const UserSchema = new Schema<IUser, UserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["student", "instructor", "admin"],
      default: "student"
    },
    enrolledCourses: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course"
    }],
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(
      user?.password,
      Number(config.bcrypt_salt_rounds))
  }
  next();
});

UserSchema.post('save', async function (doc, next) {
  doc.password = ''
  next();
})

UserSchema.statics.isUserExistsByCustomEmail = async function (email: string) {
  return await User.findOne({ email })
}
UserSchema.statics.isPasswordMatched = async function (plaintextPassword: string, hashPassword: string) {
  return await bcrypt.compare(plaintextPassword, hashPassword);
}



const User = mongoose.model<IUser, UserModel>("User", UserSchema);

export default User;