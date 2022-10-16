"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
const deviceUserHistory_1 = __importDefault(require("./deviceUserHistory"));
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
    hooks: {
        beforeValidate: (deviceUser) => {
            deviceUser.deviceData = JSON.stringify(deviceUser.deviceData);
        },
    },
    indexes: [
        {
            unique: true,
            fields: ["deviceId", "userId"],
        },
    ],
});
DeviceUser.hasMany(deviceUserHistory_1.default);
exports.default = DeviceUser;
