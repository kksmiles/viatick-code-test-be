import { Router } from "express";

import { index, show, store, destroy, update } from "../controllers/users";
import { index as indexDevices } from "../controllers/deviceUsers";

const router = Router();

router.post("/", store);
router.get("/", index);
router.get("/:slug", show);
router.put("/:slug", update);
router.delete("/:slug", destroy);
router.get("/:slug/devices", indexDevices);

export default router;
