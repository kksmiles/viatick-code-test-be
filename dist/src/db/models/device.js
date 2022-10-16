"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
const slugify_1 = __importDefault(require("../helper/slugify"));
class Device extends sequelize_1.Model {
}
Device.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    slug: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isUnique(value) {
                return Device.findOne({ where: { slug: value } }).then((device) => {
                    if (device) {
                        var err = new Error("Device name is already taken");
                        err.code = 422;
                        throw err;
                    }
                });
            },
        },
    },
    icon: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    fields: {
        type: sequelize_1.DataTypes.TEXT,
    },
}, {
    timestamps: true,
    sequelize: config_1.default,
    hooks: {
        beforeValidate: (device) => {
            const slug = (0, slugify_1.default)(device.name);
            device.slug = slug;
        },
    },
});
exports.default = Device;
