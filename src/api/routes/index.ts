import { Router } from "express";
import devicesRouter from "./devices";
import usersRouter from "./users";
import deviceUsersRouter from "./deviceUsers";
import deviceUserHistoriesRouter from "./deviceUserHistories";

const router = Router();

router.use("/devices", devicesRouter);
router.use("/users", usersRouter);
router.use("/device_users", deviceUsersRouter);
router.use("/device_user_histories", deviceUserHistoriesRouter);

export default router;
