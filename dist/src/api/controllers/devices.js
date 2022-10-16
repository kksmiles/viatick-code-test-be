"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.destroy = exports.store = exports.show = exports.index = void 0;
const deviceDal = __importStar(require("../../db/dal/device"));
const index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    deviceDal
        .getAll()
        .then((devices) => {
        return res
            .status(200)
            .json({ message: "Devices fetched successfully", data: devices });
    })
        .catch((err) => {
        return res.status(500).json({ message: "Internal server error" });
    });
});
exports.index = index;
const show = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    deviceDal
        .getBySlug(slug)
        .then((device) => {
        return res
            .status(200)
            .json({ message: "Device fetched successfully", data: device });
    })
        .catch((err) => {
        return res.status(err.code).json({ message: err.message });
    });
});
exports.show = show;
const store = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    deviceDal
        .create(req.body)
        .then((device) => {
        return res
            .status(201)
            .json({ message: "Device created successfully", data: device });
    })
        .catch((err) => {
        return res.status(422).json({ message: err.message });
    });
});
exports.store = store;
const destroy = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    deviceDal.deleteBySlug(slug).then((isDeleted) => {
        if (isDeleted) {
            return res.status(200).json({ message: "Device deleted successfully" });
        }
        return res.status(404).json({ message: "Device not found" });
    });
});
exports.destroy = destroy;
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    deviceDal
        .updateBySlug(slug, req.body)
        .then((device) => {
        return res
            .status(200)
            .json({ message: "Device updated successfully", data: device });
    })
        .catch((err) => {
        return res.status(err.code).json({ message: err.message });
    });
});
exports.update = update;
