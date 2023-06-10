import { ReactElement } from "react";
import { Priority } from "./constants";

export type TTypePriority = {
  [key in Priority]: string;
};

export type IScheduleEntity = {
  id: number;
  title: string;
  startTime: Date;
  endTime: Date;
  tag?: ITag;
  isTask: boolean;
};

export type AppointmentModel = {
  title: string;
  startDate: Date;
  endDate: Date;
  color?: string;
  isTask: boolean;
};

export type IUser = {
  id?: number;
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  beginDayHour?: number;
  endDayHour?: number;
};

export type IUserResponse = {
  token: string;
  user: IUser;
};

export interface IProfileAction {
  id: number;
  icon?: ReactElement;
  text: string;
  displayArrow?: boolean;
  route?: string;
}
