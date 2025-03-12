import { IUser } from "./user.interface";
import User from "./user.model";


const registerUser = async(user : IUser)=>{
    const result  = await User.create(user)
    return result;
}

export const UserServices = {
    registerUser
}