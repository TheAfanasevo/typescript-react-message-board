import { Context } from "koa";
import Router from "koa-router";
import { getPostsOfUser } from "../controllers/post";

const router = new Router();

router.post("/:userid", async (ctx: Context) => {
    await getPostsOfUser(ctx);
});

export default router;