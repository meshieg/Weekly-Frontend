import { TTypePriority } from "./types";

export enum fieldsTypes {
  TextField,
  Autocomplete,
  Checkbox,
  DatePicker,
  // FileUpload,
  Password,
  TimePicker,
}

export enum Priority {
  HIGH = 1,
  MEDIUM,
  LOW,
}

export const PriorityLabels: TTypePriority = {
  [Priority.HIGH]: "high",
  [Priority.MEDIUM]: "medium",
  [Priority.LOW]: "low",
};

export enum ItemType {
  TASK = "TASK",
  EVENT = "EVENT",
}

export const DEFAULT_TAG: ITag = { id: 0, name: "None", color: "#AFAFAF" };

export enum UserState {
  SIGNED,
  NOT_SIGNED
}

export const defaultRoutes = {
  [UserState.SIGNED]: "/",
  [UserState.NOT_SIGNED]: "/login",
};

export enum EditScreensState {
  ADD,
  EDIT_LOCAL,
  EDIT
}

export enum Direction {
  ASC = "ASC",
  DESC = "DESC"
}