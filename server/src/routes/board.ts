import { Context } from "koa";
import Router from "koa-router";
import { createBoard, getBoards, getOneBoard } from "../controllers/board";
import { getPostsOfBoard } from "../controllers/post";

const router = new Router();

router.get("/", async (ctx: Context) => {
    await getBoards(ctx);
});

router.get("/:category", async (ctx: Context) => {
    await getOneBoard(ctx);
});

router.get("/:id", async (ctx: Context) => {
    await getPostsOfBoard(ctx);
});

router.post("/create", async (ctx: Context) => {
    await createBoard(ctx);
});

export default router;