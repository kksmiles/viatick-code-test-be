import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

interface DeviceUserHistoryAttributes {
  id: number;
  takenAt?: Date;
  usage?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface DeviceUserHistoryInput
  extends Optional<DeviceUserHistoryAttributes, "id" | "takenAt" | "usage"> {}
export interface DeviceUserHistoryOutput
  extends Required<DeviceUserHistoryAttributes> {}

class DeviceUserHistory
  extends Model<DeviceUserHistoryAttributes, DeviceUserHistoryInput>
  implements DeviceUserHistoryAttributes
{
  public id!: number;
  public takenAt!: Date;
  public usage!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

DeviceUserHistory.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    takenAt: {
      type: DataTypes.DATE,
    },
    usage: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
  }
);

export default DeviceUserHistory;
