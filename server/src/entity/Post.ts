import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from "typeorm";
import { BoardUser } from "./BoardUser";
import { Board } from "./Board";

@Entity()
export class Post extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    title: string;

    @Column("timestamp with time zone", { default: () => 'now()' })
    time: Date

    @ManyToOne(type => BoardUser, user => user.posts)
    user: BoardUser

    @ManyToOne(type => Board, board => board.posts)
    board: Board

}