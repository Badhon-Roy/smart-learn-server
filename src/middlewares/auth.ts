import { NextFunction, Request, Response } from "express";
import config from "../config";
import AppError from "../errors/AppError";
import { IUserRole } from "../modules/user/user.interface";
import User from "../modules/user/user.model";
import catchAsync from "../utils/catchAsync";
import jwt, { Jwt, JwtPayload } from "jsonwebtoken"


const auth = (...requiredRoles: IUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization
        if (!token) {
            throw new AppError(404, "You are not authorized!")
        }
        let decoded;
        try {
            decoded = jwt.verify(
                token,
                config.jwt_access_secret as string
            ) as JwtPayload;
        } catch (error) {
            console.log(error);
            throw new AppError(401, "Unauthorized")
        }
        const { role, email } = decoded;
        const isExistsUser = await User.isUserExistsByCustomEmail(email)
        if (!isExistsUser) {
            throw new AppError(404, 'User is not found!');
        }
        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError(401, 'You are not authorized!');
        }
        req.user = decoded as JwtPayload;
        next();
    })
}

export default auth;