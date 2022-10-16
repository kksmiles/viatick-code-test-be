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
exports.getUserDevices = exports.updateOrCreate = exports.getAll = exports.deleteById = exports.getById = exports.update = exports.create = void 0;
const user_1 = __importDefault(require("../../db/models/user"));
const device_1 = __importDefault(require("../../db/models/device"));
const deviceUser_1 = __importDefault(require("../models/deviceUser"));
const device_2 = require("./device");
const user_2 = require("./user");
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const deviceUser = yield deviceUser_1.default.create(payload);
    return deviceUser;
});
exports.create = create;
const update = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const deviceUser = yield deviceUser_1.default.findByPk(id);
    if (!deviceUser) {
        var err = new Error("DeviceUser not found");
        err.code = 404;
        throw err;
    }
    const updatedDeviceUser = yield deviceUser.update(payload);
    return updatedDeviceUser;
});
exports.update = update;
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deviceUser = yield deviceUser_1.default.findByPk(id);
    if (!deviceUser) {
        var err = new Error("DeviceUser not found");
        err.code = 404;
        throw err;
    }
    return deviceUser;
});
exports.getById = getById;
const deleteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedDeviceUserCount = yield deviceUser_1.default.destroy({
        where: { id },
    });
    return !!deletedDeviceUserCount;
});
exports.deleteById = deleteById;
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return deviceUser_1.default.findAll();
});
exports.getAll = getAll;
const updateOrCreate = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const device = yield (0, device_2.getById)((_a = payload.DeviceId) !== null && _a !== void 0 ? _a : 0).catch((err) => {
        throw err;
    });
    const user = yield (0, user_2.getById)((_b = payload.UserId) !== null && _b !== void 0 ? _b : 0).catch((err) => {
        throw err;
    });
    const deviceUser = yield deviceUser_1.default.findOne({
        where: { DeviceId: payload.DeviceId, UserId: payload.UserId },
    });
    if (deviceUser) {
        return (0, exports.update)(deviceUser.id, payload);
    }
    return (0, exports.create)(payload);
});
exports.updateOrCreate = updateOrCreate;
const getUserDevices = (userSlug) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({
        where: {
            slug: userSlug,
        },
        include: device_1.default,
    });
    if (!user) {
        var err = new Error("User not found");
        err.code = 404;
        throw err;
    }
    const devices = user.Devices;
    return devices;
});
exports.getUserDevices = getUserDevices;
