"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const deviceUsers_1 = require("../controllers/deviceUsers");
const router = (0, express_1.Router)();
router.post("/", users_1.store);
router.get("/", users_1.index);
router.get("/:slug", users_1.show);
router.put("/:slug", users_1.update);
router.delete("/:slug", users_1.destroy);
router.get("/:slug/devices", deviceUsers_1.index);
exports.default = router;
