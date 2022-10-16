import { RequestHandler } from "express";

import * as deviceDal from "../../db/dal/device";
import { DeviceInput } from "../../db/models/device";

export const index: RequestHandler = async (req, res, next) => {
  deviceDal
    .getAll()
    .then((devices) => {
      return res
        .status(200)
        .json({ message: "Devices fetched successfully", data: devices });
    })
    .catch((err) => {
      return res.status(500).json({ message: "Internal server error" });
    });
};

export const show: RequestHandler = async (req, res, next) => {
  const { slug } = req.params;
  deviceDal
    .getBySlug(slug)
    .then((device) => {
      return res
        .status(200)
        .json({ message: "Device fetched successfully", data: device });
    })
    .catch((err) => {
      return res.status(err.code).json({ message: err.message });
    });
};

export const store: RequestHandler = async (req, res, next) => {
  deviceDal
    .create(req.body as DeviceInput)
    .then((device) => {
      return res
        .status(201)
        .json({ message: "Device created successfully", data: device });
    })
    .catch((err) => {
      return res.status(422).json({ message: err.message });
    });
};

export const destroy: RequestHandler = async (req, res, next) => {
  const { slug } = req.params;
  deviceDal.deleteBySlug(slug).then((isDeleted) => {
    if (isDeleted) {
      return res.status(200).json({ message: "Device deleted successfully" });
    }
    return res.status(404).json({ message: "Device not found" });
  });
};

export const update: RequestHandler = async (req, res, next) => {
  const { slug } = req.params;
  deviceDal
    .updateBySlug(slug, req.body as DeviceInput)
    .then((device) => {
      return res
        .status(200)
        .json({ message: "Device updated successfully", data: device });
    })
    .catch((err) => {
      return res.status(err.code).json({ message: err.message });
    });
};
