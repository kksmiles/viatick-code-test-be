import { RequestHandler } from "express";

import * as deviceUserHistoryDal from "../../db/dal/deviceUserHistory";
import { DeviceUserHistoryInput } from "../../db/models/deviceUserHistory";

export const store: RequestHandler = async (req, res, next) => {
  deviceUserHistoryDal
    .create(req.body as DeviceUserHistoryInput)
    .then((history) => {
      return res
        .status(201)
        .json({ message: "History created successfully", data: history });
    })
    .catch((err) => {
      return res.status(err.code).json({ message: err.message });
    });
};
