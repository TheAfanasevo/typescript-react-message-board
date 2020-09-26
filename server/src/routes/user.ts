import { Context } from "koa";
import Router from "koa-router";
import { createUser, getOneUser, getUsers } from "../controllers/user";
import { authenticate, isAdmin, login } from "../middleware/auth";

const router = new Router();

router.get("/", authenticate, async (ctx: Context) => {
    await getUsers(ctx);
});

router.get("/:id", isAdmin, async (ctx: Context) => {
    await getOneUser(ctx);
});

router.post("/register", async (ctx: Context) => {
    await createUser(ctx);
});

router.post("/login", async (ctx: Context) => {
    await login(ctx);
});

export default router;