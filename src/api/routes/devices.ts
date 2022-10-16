import { Router } from "express";

import { index, show, store, destroy, update } from "../controllers/devices";

const router = Router();

router.post("/", store);
router.get("/", index);
router.get("/:slug", show);
router.put("/:slug", update);
router.delete("/:slug", destroy);

export default router;
