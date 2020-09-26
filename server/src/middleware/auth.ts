import { compare } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { Context, Middleware, Next } from "koa";
import { config } from "../config/config";
import { BoardUser } from "../entity/BoardUser";

export const generateAccessToken = (user: BoardUser) => {
    return sign({ userId: user.id, userGroup: user.group }, config.jwtAccessPrivateKey, {
        expiresIn: "10m"
    });
}

export const generateRefreshToken = (user: BoardUser) => {
    return sign({ userId: user.id, tokenVersion: user.tokenVersion, userGroup: user.group }, config.jwtRefreshPrivateKey, {
        expiresIn: "2d"
    });
}

export const setRefreshToken = (ctx: Context, token: string) => {
    ctx.cookies.set("jat", token, {
        httpOnly: true,
        path: "tokens/refresh",
        maxAge: 172800000
    });
}

export const validateAuthHeader = (ctx: Context) => {
    const authorization = ctx.headers.authorization;

    if (!authorization) {
        ctx.throw(400, "Authorization header and token shall be submitted!")
    }

    try {
        const token = authorization.split(" ")[1];
        const payload = verify(token, config.jwtAccessPrivateKey) as any;
        return payload;
    } catch (error) {
        ctx.throw(400, `Authentication failed for ${error.message}`);
    }
}
export const authenticate: Middleware<Context> = async (ctx: Context, next: Next) => {
    try {
        validateAuthHeader(ctx);
    } catch (error) {
        ctx.throw(400, error.message);
    }

    return next();
}

export const isAdmin: Middleware<Context> = (ctx: Context, next: Next) => {
    try {
        const { userGroup } = validateAuthHeader(ctx);
        if (userGroup !== 'admin') {
            ctx.throw(400, "Administrator access not granted!")
        }
    } catch (error) {
        ctx.throw(400, error.message);
    }

    return next();
}

export const login = async (ctx: Context) => {
    const { email, password } = ctx.request.body;
    const user = await BoardUser.findOne({ where: { email } });

    if (!user) ctx.throw(400, "User not found!");

    const valid = await compare(password, user.password);

    if (!valid) ctx.throw(400, "Can't match the user credentials!");

    try {
        setRefreshToken(ctx, generateRefreshToken(user));

        ctx.message = `${user.name}, you have logged in!`;
        ctx.body = {
            accessToken: generateAccessToken(user),
            user
        }
    } catch (error) {
        ctx.throw(401, `Login failed for ${error.message}`);
    }
}