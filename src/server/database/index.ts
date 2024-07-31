import { AppDataSource } from "./data-source";

AppDataSource.initialize()
.then(() => {
  console.log('Database has initialized');
  
})
.catch((error) => console.log(error))

export { AppDataSource };