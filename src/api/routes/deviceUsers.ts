import { Router } from "express";

import {
  index,
  store,
  destroy,
  indexUserDevices,
  indexHistoriesByDeviceId,
} from "../controllers/deviceUsers";

const router = Router();

router.post("/", store);
router.get("/", index);
router.delete("/:id", destroy);
router.get("/:id/histories", indexHistoriesByDeviceId);

router.get("/:userSlug/devices", indexUserDevices);

export default router;
