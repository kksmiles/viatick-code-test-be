import { RequestHandler } from "express";

import * as userDal from "../../db/dal/user";
import { UserInput } from "../../db/models/user";

export const index: RequestHandler = async (req, res, next) => {
  userDal
    .getAll()
    .then((users) => {
      return res
        .status(200)
        .json({ message: "Users fetched successfully", data: users });
    })
    .catch((err) => {
      return res.status(500).json({ message: "Internal server error" });
    });
};

export const show: RequestHandler = async (req, res, next) => {
  const { slug } = req.params;
  userDal
    .getBySlug(slug)
    .then((user) => {
      return res
        .status(200)
        .json({ message: "User fetched successfully", data: user });
    })
    .catch((err) => {
      return res.status(err.code).json({ message: err.message });
    });
};

export const store: RequestHandler = async (req, res, next) => {
  userDal
    .create(req.body as UserInput)
    .then((user) => {
      return res
        .status(201)
        .json({ message: "User created successfully", data: user });
    })
    .catch((err) => {
      return res.status(err.code).json({ message: err.message });
    });
};

export const destroy: RequestHandler = async (req, res, next) => {
  const { slug } = req.params;
  userDal.deleteBySlug(slug).then((isDeleted) => {
    if (isDeleted) {
      return res.status(200).json({ message: "User deleted successfully" });
    }
    return res.status(404).json({ message: "User not found" });
  });
};

export const update: RequestHandler = async (req, res, next) => {
  const { slug } = req.params;
  userDal
    .updateBySlug(slug, req.body as UserInput)
    .then((user) => {
      return res
        .status(200)
        .json({ message: "User updated successfully", data: user });
    })
    .catch((err) => {
      return res.status(err.code).json({ message: err.message });
    });
};
