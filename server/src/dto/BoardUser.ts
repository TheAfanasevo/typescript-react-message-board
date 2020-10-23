import { Group } from "./Group";
import { Post } from "./Post";

export class BoardUser{
    id: number;
    username: string;
    email: string;
    name: string;
    age: number;
    password: string;
    group: Group;
    tokenVersion: number;
    posts: Post[]

}