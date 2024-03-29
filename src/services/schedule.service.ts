import { AxiosInstance } from "../config/axios";
import { IScheduleEntity } from "../utils/types";

const schedulePrefix = `${process.env.REACT_APP_BACKEND_URL}/schedule`;

export class ScheduleService {
  static getSchedule = async (
    minDate?: Date,
    maxDate?: Date
  ): Promise<IScheduleEntity[]> => {
    const url = schedulePrefix + "/week";
    return await AxiosInstance.get(url, {
      params: {
        minDate,
        maxDate,
      },
    })
      .then((res) => {
        return res.data.map((scheduleEntity: IScheduleEntity) => {
          return {
            ...scheduleEntity,
          } as IScheduleEntity;
        });
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  static generateSchedule = async (
    tasks?: ITask[],
    events?: IEvent[]
  ): Promise<any> => {
    const url = schedulePrefix;

    return AxiosInstance.post(url, { tasks, events })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };
}
