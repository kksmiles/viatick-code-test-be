"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./api/routes"));
const init_1 = __importDefault(require("./db/init"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
var jsonParser = body_parser_1.default.json();
const port = process.env.PORT;
(0, init_1.default)();
app.get("/", (req, res) => {
    res.send("Hello Viatick");
});
app.use(jsonParser);
app.use("/api", routes_1.default);
try {
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
    });
}
catch (error) {
    console.log(`Error occurred: ${error.message}`);
}
