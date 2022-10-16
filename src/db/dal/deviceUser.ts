import User from "../../db/models/user";
import Device from "../../db/models/device";
import DeviceUser from "../models/deviceUser";
import DeviceUserHistory from "../../db/models/deviceUserHistory";

import { getById as deviceGetById } from "./device";
import { getById as userGetById } from "./user";
import { DeviceUserInput, DeviceUserOutput } from "../models/deviceUser";

export const create = async (
  payload: DeviceUserInput
): Promise<DeviceUserOutput> => {
  const deviceUser = await DeviceUser.create(payload);
  return deviceUser;
};

export const update = async (
  id: number,
  payload: Partial<DeviceUserInput>
): Promise<DeviceUserOutput> => {
  const deviceUser = await DeviceUser.findByPk(id);
  if (!deviceUser) {
    var err = new Error("DeviceUser not found");
    err.code = 404;
    throw err;
  }
  const updatedDeviceUser = await (deviceUser as DeviceUser).update(payload);
  return updatedDeviceUser;
};

export const getById = async (id: number): Promise<DeviceUserOutput> => {
  const deviceUser = await DeviceUser.findByPk(id);
  if (!deviceUser) {
    var err = new Error("DeviceUser not found");
    err.code = 404;
    throw err;
  }
  return deviceUser;
};

export const deleteById = async (id: number): Promise<boolean> => {
  const deletedDeviceUserCount = await DeviceUser.destroy({
    where: { id },
  });
  return !!deletedDeviceUserCount;
};

export const getAll = async (): Promise<DeviceUserOutput[]> => {
  return DeviceUser.findAll();
};

export const updateOrCreate = async (
  payload: DeviceUserInput
): Promise<DeviceUserOutput> => {
  const device = await deviceGetById(payload.DeviceId ?? 0).catch((err) => {
    throw err;
  });
  const user = await userGetById(payload.UserId ?? 0).catch((err) => {
    throw err;
  });

  const deviceUser = await DeviceUser.findOne({
    where: { DeviceId: payload.DeviceId, UserId: payload.UserId },
  });
  if (deviceUser) {
    return update(deviceUser.id, payload);
  }
  return create(payload);
};

export const getUserDevices = async (userSlug: string) => {
  const user: any = await User.findOne({
    where: {
      slug: userSlug,
    },
    include: Device,
  });
  if (!user) {
    var err = new Error("User not found");
    err.code = 404;
    throw err;
  }
  const devices = user.Devices;
  return devices;
};
