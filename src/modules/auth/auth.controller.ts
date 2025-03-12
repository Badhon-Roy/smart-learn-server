import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";


const loginUser = catchAsync(async (req,res)=>{
    const user = req?.body;
    const result = await AuthServices.loginUser(user)
    const {accessToken, refreshToken} = result;
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: config.node_env === "production"
    });
    res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
            accessToken
        },
    });
})

const refreshToken = catchAsync(async (req,res)=>{
    const {refreshToken} = req?.cookies;
    const result = await AuthServices.refreshToken(refreshToken)

    res.status(200).json({
        success: true,
        message: "Login successful",
        data:result,
    });
})

export const AuthControllers ={
    loginUser,
    refreshToken
}