import { verify } from "jsonwebtoken";
import { Context } from "koa";
import { config } from "../config/config";
import { BoardUser } from "../entity/BoardUser";
import { generateAccessToken } from "../middleware/auth";

export const refreshToken = async (ctx: Context) => {
    const token = ctx.cookies.get('jat');

    if (!token) ctx.throw(400, 'No token provided!');

    let payload;
    if (typeof token === 'string') {
        try {
            payload = verify(token, config.jwtRefreshPrivateKey) as any;
        } catch (error) {
            ctx.throw(400, error.message);
        }
    }

    const user = await BoardUser.findOne({ id: payload.userId });

    if (!user) ctx.throw(400, 'User not found!');

    if (user.tokenVersion !== payload.tokenVersion) ctx.throw(400, 'Token is not valid!');

    // TODO: Refreshing refresh tokens??
    ctx.status = 201;
    ctx.body = {
        accessToken: generateAccessToken(user),
    }
};

export const revokeTokens = async (ctx: Context) => {
    const userId = ctx.params.id;

    await BoardUser.getRepository().increment({id: userId}, "tokenVersion", 1);

    return true;
};