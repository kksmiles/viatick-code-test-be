import User from "../models/user";
import { UserInput, UserOutput } from "../models/user";

export const create = async (payload: UserInput): Promise<UserOutput> => {
  const user = await User.create(payload);
  return user;
};

export const update = async (
  id: number,
  payload: Partial<UserInput>
): Promise<UserOutput> => {
  const user = await User.findByPk(id);
  if (!user) {
    var err = new Error("User not found");
    err.code = 404;
    throw err;
  }
  const updatedUser = await (user as User).update(payload);
  return updatedUser;
};

export const updateBySlug = async (
  slug: string,
  payload: Partial<UserInput>
): Promise<UserOutput> => {
  const user = await User.findOne({
    where: {
      slug,
    },
  });
  if (!user) {
    var err = new Error("User not found");
    err.code = 404;
    throw err;
  }
  const updatedUser = await (user as User).update(payload);
  return updatedUser;
};

export const getById = async (id: number): Promise<UserOutput> => {
  const user = await User.findByPk(id);
  if (!user) {
    var err = new Error("User not found");
    err.code = 404;
    throw err;
  }
  return user;
};

export const getBySlug = async (slug: string): Promise<UserOutput> => {
  const user = await User.findOne({
    where: {
      slug,
    },
  });
  if (!user) {
    var err = new Error("User not found");
    err.code = 404;
    throw err;
  }
  return user;
};

export const deleteById = async (id: number): Promise<boolean> => {
  const deletedUserCount = await User.destroy({
    where: { id },
  });
  return !!deletedUserCount;
};

export const deleteBySlug = async (slug: string): Promise<boolean> => {
  const deletedUserCount = await User.destroy({
    where: { slug },
  });
  return !!deletedUserCount;
};

export const getAll = async (): Promise<UserOutput[]> => {
  return User.findAll();
};
