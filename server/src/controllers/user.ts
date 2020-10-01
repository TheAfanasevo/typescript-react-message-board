import { Context } from "koa";
import { BoardUser } from "../entity/BoardUser";
import bcrypt from "bcrypt";
import { SignupRequest } from "../requests/SignupRequest";

export const getUsers = async (ctx: Context) => {
    const users = await BoardUser.find();
    try {
        ctx.status = 200;
        ctx.message = "Users found!";
        ctx.body = { users };
    } catch (error) {
        ctx.throw(400, error.message);
    }
};

export const getOneUser = async (ctx: Context) => {
    const user = await BoardUser.findOne({ id: ctx.params.id });

    try {
        ctx.status = 200;
        ctx.message = "User found!";
        ctx.body = { user };
    } catch (error) {
        ctx.throw(400, error.message);
    }
};

export const createUser = async (ctx: Context) => {
    try {
        const { username, name, password, age, group, email } = ctx.request.body;

        let signupValidation = new SignupRequest();

        const user = new BoardUser();
        user.username = username;
        user.name = name;
        user.email = email;
        user.age = age;
        user.group = group;

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        ctx.status = 200;
        ctx.message = `New user ${user.username} created with id ${user.id}`;
        ctx.body = { user };
    } catch (error) {
        ctx.throw(400, error.message);
    }
}