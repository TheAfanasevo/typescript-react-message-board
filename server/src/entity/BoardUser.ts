import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import { Post } from "./Post";
import { Group } from "../dto/Group";


@Entity()
export class BoardUser extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column({ length: 100 })
    name: string;

    @Column()
    age: number;

    @Column()
    password: string;

    @Column({ type: "enum", enum: Group, default: Group.BASIC })
    group: Group;

    @Column({ default: 0 })
    tokenVersion: number;

    @OneToMany(type => Post, post => post.user)
    posts: Post[]
}
