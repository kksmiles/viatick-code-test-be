import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import routes from "./api/routes";
import dbInit from "./db/init";
import bodyParser from "body-parser";

dotenv.config();

const app: Express = express();
var jsonParser = bodyParser.json();
const port = process.env.PORT;

dbInit();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Viatick");
});
app.use(jsonParser);
app.use("/api", routes);

try {
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  });
} catch (error: any) {
  console.log(`Error occurred: ${error.message}`);
}