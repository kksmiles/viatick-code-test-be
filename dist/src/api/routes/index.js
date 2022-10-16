"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const devices_1 = __importDefault(require("./devices"));
const users_1 = __importDefault(require("./users"));
const deviceUsers_1 = __importDefault(require("./deviceUsers"));
const deviceUserHistories_1 = __importDefault(require("./deviceUserHistories"));
const router = (0, express_1.Router)();
router.use("/devices", devices_1.default);
router.use("/users", users_1.default);
router.use("/device_users", deviceUsers_1.default);
router.use("/device_user_histories", deviceUserHistories_1.default);
exports.default = router;
