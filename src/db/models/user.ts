import { DataTypes, Model, Optional } from "sequelize";
import { HasMany } from "sequelize-typescript";
import sequelizeConnection from "../config";
import Device from "./device";
import DeviceUser from "./deviceUser";
import slugify from "../helper/slugify";

interface UserAttributes {
  id: number;
  name: string;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface UserInput
  extends Optional<UserAttributes, "id" | "name" | "slug"> {}
export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: number;
  public name!: string;
  public slug!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isUnique(value: string) {
          return User.findOne({ where: { slug: value } }).then((user) => {
            if (user) {
              var err = new Error("User name is already taken");
              err.code = 422;
              throw err;
            }
          });
        },
      },
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    hooks: {
      beforeValidate: (user: User) => {
        const slug = slugify(user.name);
        user.slug = slug;
      },
    },
  }
);
User.belongsToMany(Device, { through: DeviceUser });

export default User;
