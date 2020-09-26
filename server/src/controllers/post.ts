import { Context } from "koa";
import { Board } from "../entity/Board";
import { BoardUser } from "../entity/BoardUser";

export const getPostsOfUser = async (ctx: Context) => {
    try {
        const { userId } = ctx.params;
        const user = await BoardUser.findOne({ id: userId }, { relations: ["posts"] });
        const posts = user?.posts;

        ctx.status = 200;
        ctx.message = `Posts by user ${user?.username}`
        ctx.body = { posts };
    } catch (error) {
        ctx.throw(400, error.message);
    }
}

export const getPostsOfBoard = async (ctx: Context) => {
    try {
        const { id } = ctx.params;
        const board = await Board.findOne({ id }, { relations: ["posts"] });
        const posts = board?.posts;

        ctx.status = 200;
        ctx.message = `Posts under the category of ${board?.category}`;
        ctx.body = { posts };
    } catch (error) {
        ctx.throw(400, error.message);
    }
}
