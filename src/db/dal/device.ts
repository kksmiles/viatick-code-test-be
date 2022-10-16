import Device from "../models/device";
import { DeviceInput, DeviceOutput } from "../models/device";

export const create = async (payload: DeviceInput): Promise<DeviceOutput> => {
  const device = await Device.create(payload);
  return device;
};

export const update = async (
  id: number,
  payload: Partial<DeviceInput>
): Promise<DeviceOutput> => {
  const device = await Device.findByPk(id);
  if (!device) {
    var err = new Error("Device not found");
    err.code = 404;
    throw err;
  }
  const updatedDevice = await (device as Device).update(payload);
  return updatedDevice;
};

export const updateBySlug = async (
  slug: string,
  payload: Partial<DeviceInput>
): Promise<DeviceOutput> => {
  const device = await Device.findOne({
    where: {
      slug,
    },
  });
  if (!device) {
    var err = new Error("Device not found");
    err.code = 404;
    throw err;
  }
  const updatedDevice = await (device as Device).update(payload);
  return updatedDevice;
};

export const getById = async (id: number): Promise<DeviceOutput> => {
  const device = await Device.findByPk(id);
  if (!device) {
    var err = new Error("Device not found");
    err.code = 404;
    throw err;
  }
  return device;
};

export const getBySlug = async (slug: string): Promise<DeviceOutput> => {
  const device = await Device.findOne({
    where: {
      slug,
    },
  });
  if (!device) {
    var err = new Error("Device not found");
    err.code = 404;
    throw err;
  }
  return device;
};

export const deleteById = async (id: number): Promise<boolean> => {
  const deletedDeviceCount = await Device.destroy({
    where: { id },
  });
  return !!deletedDeviceCount;
};

export const deleteBySlug = async (slug: string): Promise<boolean> => {
  const deletedDeviceCount = await Device.destroy({
    where: { slug },
  });
  return !!deletedDeviceCount;
};

export const getAll = async (): Promise<DeviceOutput[]> => {
  return Device.findAll();
};
