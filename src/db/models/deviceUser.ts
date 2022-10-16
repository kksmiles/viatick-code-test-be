import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";
import Device from "./device";
import DeviceUserHistory from "./deviceUserHistory";

interface DeviceUserAttributes {
  id: number;
  deviceData?: string;
  UserId?: number;
  DeviceId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface DeviceUserInput
  extends Optional<
    DeviceUserAttributes,
    "id" | "deviceData" | "UserId" | "DeviceId"
  > {}
export interface DeviceUserOutput extends Required<DeviceUserAttributes> {}

class DeviceUser
  extends Model<DeviceUserAttributes, DeviceUserInput>
  implements DeviceUserAttributes
{
  public id!: number;
  public deviceData!: string;
  public UserId!: number;
  public DeviceId!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

DeviceUser.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    deviceData: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    hooks: {
      beforeValidate: (deviceUser: DeviceUser) => {
        deviceUser.deviceData = JSON.stringify(deviceUser.deviceData);
      },
    },
    indexes: [
      {
        unique: true,
        fields: ["deviceId", "userId"],
      },
    ],
  }
);
DeviceUser.hasMany(DeviceUserHistory);

export default DeviceUser;
