import Device from "./models/device";
import DeviceUser from "./models/deviceUser";
import DeviceUserHistory from "./models/deviceUserHistory";
import User from "./models/user";
const isDev = process.env.NODE_ENV === "development";

const dbInit = () => {
  Device.sync({ alter: isDev });
  User.sync({ alter: isDev });
  DeviceUser.sync({ alter: isDev });
  DeviceUserHistory.sync({ alter: isDev });
};
export default dbInit;
