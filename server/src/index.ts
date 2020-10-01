import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from '@koa/cors';
import logger from 'koa-logger';
import "reflect-metadata";

import routesIndex from './routes/index';

import { createConnection } from "typeorm";
import { config } from "./config/config";

createConnection()
    .then(async (connection) => {
        await connection.runMigrations();
        const app = new Koa();

        app.use(bodyParser());
        app.use(logger());
        app.use(
            cors({
                origin: "http://localhost:3000",
                credentials: true
            })
        );

        app.use(routesIndex.routes()).use(routesIndex.allowedMethods());

        app
            .listen(config.port, async () => {
                console.info(`Running on port ${config.port}`);
            })
            .on("error", (err) => {
                console.info(err);
            });
    })
    .catch((error) => console.log(error));
