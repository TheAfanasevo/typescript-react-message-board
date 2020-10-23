import { BoardUser } from "./BoardUser";
import { Board } from "./Board";

export class Post {
    id: number;
    title: string;
    time: Date;
    user: BoardUser;
    board: Board;
}