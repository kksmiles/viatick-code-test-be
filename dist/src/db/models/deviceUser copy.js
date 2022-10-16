"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
class DeviceUser extends sequelize_1.Model {
}
DeviceUser.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    deviceData: {
        type: sequelize_1.DataTypes.TEXT,
    },
}, {
    timestamps: true,
    sequelize: config_1.default,
});
exports.default = DeviceUser;
