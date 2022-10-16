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
exports.getAll = exports.deleteBySlug = exports.deleteById = exports.getBySlug = exports.getById = exports.updateBySlug = exports.update = exports.create = void 0;
const user_1 = __importDefault(require("../models/user"));
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.create(payload);
    return user;
});
exports.create = create;
const update = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findByPk(id);
    if (!user) {
        var err = new Error("User not found");
        err.code = 404;
        throw err;
    }
    const updatedUser = yield user.update(payload);
    return updatedUser;
});
exports.update = update;
const updateBySlug = (slug, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({
        where: {
            slug,
        },
    });
    if (!user) {
        var err = new Error("User not found");
        err.code = 404;
        throw err;
    }
    const updatedUser = yield user.update(payload);
    return updatedUser;
});
exports.updateBySlug = updateBySlug;
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findByPk(id);
    if (!user) {
        var err = new Error("User not found");
        err.code = 404;
        throw err;
    }
    return user;
});
exports.getById = getById;
const getBySlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({
        where: {
            slug,
        },
    });
    if (!user) {
        var err = new Error("User not found");
        err.code = 404;
        throw err;
    }
    return user;
});
exports.getBySlug = getBySlug;
const deleteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedUserCount = yield user_1.default.destroy({
        where: { id },
    });
    return !!deletedUserCount;
});
exports.deleteById = deleteById;
const deleteBySlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedUserCount = yield user_1.default.destroy({
        where: { slug },
    });
    return !!deletedUserCount;
});
exports.deleteBySlug = deleteBySlug;
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return user_1.default.findAll();
});
exports.getAll = getAll;
