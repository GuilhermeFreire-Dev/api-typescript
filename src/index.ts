import { server } from "./server/Server";
import "dotenv/config";
import "reflect-metadata";

server.listen(process.env.PORT || 3333, () => {
  console.log("Application started. Listening port: %d", process.env.PORT || 3333);
});