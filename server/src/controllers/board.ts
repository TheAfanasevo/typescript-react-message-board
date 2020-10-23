import { Context } from "koa";
import { Board } from "../entity/Board";
import { BoardRepository } from "../entity/BoardRepository";

export const getBoards = async (ctx: Context) => {
    try {
        const boards = await Board.find();

        if (boards === []) ctx.throw(400, 'No board found!');

        ctx.status = 200;
        ctx.message = 'Boards found!';
        ctx.body = { boards };
    } catch (error) {
        ctx.throw(400, error.message);
    }
}

export const getOneBoard = async (ctx: Context) => {
    try {
        const { id } = ctx.params;
        const board = await new BoardRepository().getOne(id);

        if (!board) ctx.throw(400, 'No board found!');

        ctx.status = 200;
        ctx.message = 'Board found!';
        ctx.body = { board };
    } catch (error) {
        ctx.throw(400, error.message);
    }
}

export const createBoard = async (ctx: Context) => {
    try {
        const category = ctx.request.body.category;

        const board = new Board();
        board.category = category;

        await board.save();

        ctx.status = 200;
        ctx.message = `New board created with title ${category}`;
        ctx.body = { board };
    } catch (error) {
        ctx.throw(400, error.message);
    }
}