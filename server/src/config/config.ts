import dotenv from 'dotenv';
dotenv.config();

interface Config {
    port: string;
    jwtAccessPrivateKey: string;
    jwtRefreshPrivateKey: string;
}

export const config: Config = {
    port: process.env.PORT || "3040",
    jwtAccessPrivateKey: process.env.JWT_ACCESS_PRIVATE_KEY || "",
    jwtRefreshPrivateKey: process.env.JWT_REFRESH_PRIVATE_KEY || ""
}