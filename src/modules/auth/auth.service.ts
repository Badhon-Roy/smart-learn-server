import config from "../../config";
import User from "../user/user.model";
import { createToken } from "./auth.utils";
import { ILoginUser } from "./auth.interface";
import AppError from "../../errors/AppError";

const loginUser = async (payload: ILoginUser) => {
    const user = await User.findOne({ email: payload?.email })
    if (!user) {
        throw new AppError(404, "User not found!")
    }
    const isPasswordMatched = await User.isPasswordMatched(payload?.password, user?.password)

    if (!isPasswordMatched) {
        throw new AppError(403, "Password doesn't matched!")
    }
    const jwtPayload = {
        userId: user?._id,
        email: user?.email,
        role: user?.role
    }

    const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, config.jwt_access_secret_expire_in as string)
    const refreshToken = createToken(jwtPayload, config.jwt_refresh_secret as string, config.jwt_refresh_secret_expire_in as string)

    return {
        accessToken,
        refreshToken
    }
}
const refreshToken = async(token :string)=>{

}



export const AuthServices = {
    loginUser,
    refreshToken
}