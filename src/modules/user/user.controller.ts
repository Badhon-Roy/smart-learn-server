import { Request, Response } from "express"
import { UserServices } from "./user.service"


const registerUser = async (req: Request, res: Response) => {
    try {
        const result = await UserServices.registerUser(req?.body)

        res.status(200).json({
            success: true,
            message: "User register Successfully",
            data: result
        })
    } catch (error) {
        console.log(error);
    }
}

export const UserControllers = {
    registerUser
}