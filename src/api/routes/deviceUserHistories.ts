import { Router } from "express";

import { store } from "../controllers/deviceUserHistories";

const router = Router();

router.post("/", store);

export default router;
