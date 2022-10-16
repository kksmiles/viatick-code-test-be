import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";
import slugify from "../helper/slugify";

interface DeviceAttributes {
  id: number;
  name: string;
  slug: string;
  icon: string;
  fields?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface DeviceInput
  extends Optional<
    DeviceAttributes,
    "id" | "name" | "slug" | "icon" | "fields"
  > {}
export interface DeviceOutput extends Required<DeviceAttributes> {}

class Device
  extends Model<DeviceAttributes, DeviceInput>
  implements DeviceAttributes
{
  public id!: number;
  public name!: string;
  public slug!: string;
  public icon!: string;
  public fields!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Device.init(
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
          return Device.findOne({ where: { slug: value } }).then((device) => {
            if (device) {
              var err = new Error("Device name is already taken");
              err.code = 422;
              throw err;
            }
          });
        },
      },
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fields: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    hooks: {
      beforeValidate: (device: Device) => {
        const slug = slugify(device.name);
        device.slug = slug;
      },
    },
  }
);

export default Device;
