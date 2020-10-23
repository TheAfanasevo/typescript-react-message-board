import { Board } from "./Board";

export class BoardRepository implements ICrudRepository {
    async getOne(id: number) {
        let board = await Board.findOne({ id });
        return board;
    }
    getAll(): any[] {
        throw new Error("Method not implemented.");
    }
    save(data: any) {
        throw new Error("Method not implemented.");
    }
    update(id: number, data: any) {
        throw new Error("Method not implemented.");
    }
    delete(id: number) {
        throw new Error("Method not implemented.");
    }
    
}