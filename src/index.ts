import "dotenv/config";
import { server } from "./server/Server";
import "reflect-metadata";
import { AppDataSource } from "./server/database";

AppDataSource.initialize()
.then(() => {
  console.log('Database has initialized');
})
.catch((error) => {
  console.error(error);
});

server.listen(process.env.PORT || 3333, () => {
  console.log("Application started. Listening port: %d", process.env.PORT || 3333);
});