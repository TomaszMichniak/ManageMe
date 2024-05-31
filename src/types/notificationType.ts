import { Priority } from "./enums/priorityEnum";

export type NotificationType = {
  id:number,
  title: string,
  message: string,
  date: ISOString,
  priority: Priority,
  read: boolean
  }
type ISOString = string;
