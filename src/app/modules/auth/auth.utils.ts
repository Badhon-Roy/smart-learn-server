import jwt, { JwtPayload, SignOptions } from "jsonwebtoken"

export const createToken = (
    jwtPayload: JwtPayload,
    secret: string,
    expiresIn: any
): string => {
    const options: SignOptions = {
        expiresIn,
    };

    return jwt.sign(jwtPayload, secret, options);
}
