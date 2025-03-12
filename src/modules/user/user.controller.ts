import { UserServices } from "./user.service"
import catchAsync from "../../utils/catchAsync"
import User from "./user.model";


const registerUser = catchAsync(async (req, res) => {
    const result = await UserServices.registerUser(req?.body)
    res.status(200).json({
        success: true,
        message: "User register Successfully",
        data: result
    })
})

//* get all users 
const getAllUsers = catchAsync(async (req, res) => {
    const users = await UserServices.getAllUserFromDB();
    res.status(200).json({
        success: true,
        message: "Users retrieved successfully",
        data: users,
    });
});
//* get single user
const getSingleUser = catchAsync(async (req, res) => {
    const { id } = req.params;
    const user = await UserServices.getSingleUserFromDB(id);
    res.status(200).json({
        success: true,
        message: "User retrieved successfully",
        data: user,
    });
});

//* update single user
const updateSingleUser = catchAsync(async (req, res) => {
    const { id } = req.params;
    const user = await UserServices.updateUserIntoDB(id, req?.body);
    res.status(200).json({
        success: true,
        message: "User update successfully",
        data: user,
    });
});

//* delete single user
const deleteSingleUser = catchAsync(async (req, res) => {
    const { id } = req.params;
    const isExistUser = await User.findById(id)
    if (!isExistUser) {
        throw new Error("User not found!")
    }
    await UserServices.deleteUserFromDB(id);
    res.status(200).json({
        success: true,
        message: "User delete successfully"
    });
});



export const UserControllers = {
    registerUser,
    getAllUsers,
    getSingleUser,
    updateSingleUser,
    deleteSingleUser
}