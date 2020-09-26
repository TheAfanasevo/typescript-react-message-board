import { Context } from "koa";
import Router from "koa-router";
import { refreshToken, revokeTokens } from "../controllers/token";

const router = new Router();

router.post('/refresh', async (ctx: Context) => {
    await refreshToken(ctx);
});

router.post('/revoke/:id', (ctx: Context) => {
    revokeTokens(ctx);
});

export default router;