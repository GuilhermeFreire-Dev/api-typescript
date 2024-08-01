import express from "express";
import "./shared/services/TranslationsYup";
import { router } from "./routes";
import "./database";

const server = express();

server.use(express.json());
server.use(router);

export { server };