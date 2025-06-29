import { IUser } from "./user.interface";
import User from "./user.model";


const registerUser = async (user: IUser) => {
    const result = await User.create(user)
    return result;
}

const getAllUserFromDB = async () => {
    const result = await User.find();
    return result;
}
const getSingleUserFromDB = async (id: string) => {
    const result = await User.findById(id).populate('enrolledCourses');
    return result;
}
const updateUserIntoDB = async (id: string, data: IUser) => {
    const result = await User.findByIdAndUpdate(id, data, {
        new: true
    })
    return result;
}

const deleteUserFromDB = async (id: string) => {
    const result = await User.findByIdAndDelete(id)
    return result;
}

const updateUserRole = async (id: string, role: 'admin' | 'student' | 'instructor') => {
    const result = await User.findByIdAndUpdate(
        id, { role }, { new: true });
    return result;
}

export const UserServices = {
    registerUser,
    getAllUserFromDB,
    getSingleUserFromDB,
    updateUserIntoDB,
    deleteUserFromDB,
    updateUserRole
}