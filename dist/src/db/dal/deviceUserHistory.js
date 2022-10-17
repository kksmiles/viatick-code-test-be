"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHistoriesByDeviceId = exports.create = void 0;
const sequelize_1 = require("sequelize");
const deviceUser_1 = __importDefault(require("../models/deviceUser"));
const deviceUserHistory_1 = __importDefault(require("../models/deviceUserHistory"));
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const deviceUserHistory = yield deviceUserHistory_1.default.create(payload);
    return deviceUserHistory;
});
exports.create = create;
const getHistoriesByDeviceId = (id, fromTime, toTime) => __awaiter(void 0, void 0, void 0, function* () {
    let takenAt = {
        [sequelize_1.Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)),
        [sequelize_1.Op.lte]: new Date(new Date().setHours(23, 59, 59, 999)),
    };
    if (fromTime != null || toTime != null) {
        takenAt = {
            [sequelize_1.Op.gte]: fromTime,
            [sequelize_1.Op.lte]: toTime,
        };
    }
    const deviceUser = yield deviceUser_1.default.findOne({
        where: { id: id },
        include: {
            model: deviceUserHistory_1.default,
            where: {
                takenAt: takenAt,
            },
        },
    });
    if (!deviceUser) {
        var err = new Error("No histories for device user was found");
        err.code = 404;
        throw err;
    }
    const deviceUserHistories = deviceUser.DeviceUserHistories;
    return deviceUserHistories;
});
exports.getHistoriesByDeviceId = getHistoriesByDeviceId;
