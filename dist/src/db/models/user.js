"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
const device_1 = __importDefault(require("./device"));
const deviceUser_1 = __importDefault(require("./deviceUser"));
const slugify_1 = __importDefault(require("../helper/slugify"));
class User extends sequelize_1.Model {
}
User.init({
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
                return User.findOne({ where: { slug: value } }).then((user) => {
                    if (user) {
                        var err = new Error("User name is already taken");
                        err.code = 422;
                        throw err;
                    }
                });
            },
        },
    },
}, {
    timestamps: true,
    sequelize: config_1.default,
    hooks: {
        beforeValidate: (user) => {
            const slug = (0, slugify_1.default)(user.name);
            user.slug = slug;
        },
    },
});
User.belongsToMany(device_1.default, { through: deviceUser_1.default });
exports.default = User;
