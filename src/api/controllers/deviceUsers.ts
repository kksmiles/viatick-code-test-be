import { RequestHandler } from "express";
import * as deviceUserDal from "../../db/dal/deviceUser";
import * as deviceUserHistoryDal from "../../db/dal/deviceUserHistory";
import { DeviceUserInput } from "../../db/models/deviceUser";

export const index: RequestHandler = async (req, res, next) => {
  deviceUserDal
    .getAll()
    .then((deviceUsers) => {
      return res.status(200).json({
        message: "DeviceUsers fetched successfully",
        data: deviceUsers,
      });
    })
    .catch((err) => {
      return res.status(500).json({ message: "Internal server error" });
    });
};

export const store: RequestHandler = async (req, res, next) => {
  const payload = req.body as DeviceUserInput;
  deviceUserDal
    .updateOrCreate(payload)
    .then((deviceUser) => {
      return res
        .status(201)
        .json({ message: "DeviceUser created successfully", data: deviceUser });
    })
    .catch((err) => {
      return res.status(err.code).json({ message: err.message });
    });
};

export const destroy: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  deviceUserDal.deleteById(parseInt(id)).then((isDeleted) => {
    if (isDeleted) {
      return res
        .status(200)
        .json({ message: "DeviceUser deleted successfully" });
    }
    return res.status(404).json({ message: "DeviceUser not found" });
  });
};

export const indexUserDevices: RequestHandler = async (req, res, next) => {
  const { userSlug } = req.params;

  deviceUserDal
    .getUserDevices(userSlug)
    .then((devices) => {
      return res.status(200).json({
        message: "User devices fetched successfully",
        data: devices,
      });
    })
    .catch((err) => {
      return res.status(err.code).json({ message: err.message });
    });
};

export const indexHistoriesByDeviceId: RequestHandler = async (
  req,
  res,
  next
) => {
  const { id } = req.params;
  const { fromTime, toTime } = req.query;

  deviceUserHistoryDal
    .getHistoriesByDeviceId(parseInt(id), fromTime, toTime)
    .then((deviceUserHistories) => {
      return res.status(200).json({
        message: "Device User Histories fetched successfully",
        data: deviceUserHistories,
      });
    })
    .catch((err) => {
      return res.status(err.code).json({ message: err.message });
    });
};
