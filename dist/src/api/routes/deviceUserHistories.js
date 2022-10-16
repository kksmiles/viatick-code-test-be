"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const deviceUserHistories_1 = require("../controllers/deviceUserHistories");
const router = (0, express_1.Router)();
router.post("/", deviceUserHistories_1.store);
exports.default = router;
