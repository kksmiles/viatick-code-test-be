import { Op } from "sequelize";
import DeviceUser from "../models/deviceUser";
import DeviceUserHistory from "../models/deviceUserHistory";
import {
  DeviceUserHistoryInput,
  DeviceUserHistoryOutput,
} from "../models/deviceUserHistory";

export const create = async (
  payload: DeviceUserHistoryInput
): Promise<DeviceUserHistoryOutput> => {
  const deviceUserHistory = await DeviceUserHistory.create(payload);
  return deviceUserHistory;
};

export const getHistoriesByDeviceId = async (
  id: number,
  fromTime: any,
  toTime: any
) => {
  let takenAt = {
    [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)),
    [Op.lte]: new Date(new Date().setHours(23, 59, 59, 999)),
  };

  if (fromTime != null || toTime != null) {
    takenAt = {
      [Op.gte]: fromTime,
      [Op.lte]: toTime,
    };
  }

  const deviceUser: any = await DeviceUser.findOne({
    where: { id: id },
    include: {
      model: DeviceUserHistory,
      where: {
        takenAt: takenAt,
      },
    },
  });
  if (!deviceUser) {
    var err = new Error("No histories for device user was found");
    err.code = 404;
    throw err;
  }
  const deviceUserHistories = deviceUser.DeviceUserHistories;
  return deviceUserHistories;
};
