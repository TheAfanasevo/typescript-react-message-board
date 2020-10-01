import { validate, validateOrReject, IsNotEmpty, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from "class-validator";
import { Group } from '../entity/BoardUser';

export class SignupRequest {

    @Length(5, 20)
    username: string;

    @Length(3, 50)
    name: string;

    @Length(8)
    password: string;

    @IsInt()
    age: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    group?: Group
}