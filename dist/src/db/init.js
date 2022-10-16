"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = __importDefault(require("./models/device"));
const deviceUser_1 = __importDefault(require("./models/deviceUser"));
const deviceUserHistory_1 = __importDefault(require("./models/deviceUserHistory"));
const user_1 = __importDefault(require("./models/user"));
const isDev = process.env.NODE_ENV === "development";
const dbInit = () => {
    device_1.default.sync({ alter: isDev });
    user_1.default.sync({ alter: isDev });
    deviceUser_1.default.sync({ alter: isDev });
    deviceUserHistory_1.default.sync({ alter: isDev });
};
exports.default = dbInit;
