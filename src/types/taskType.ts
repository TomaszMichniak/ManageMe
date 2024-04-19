import { Priority } from './enums/priorityEnum';
import { Status } from './enums/statusEnum';
import { User } from './userType';
export type Task = {
	id: number;
	description: string;
	priority: Priority;
	storyId: number;
	status: Status;
	addDate: string;
	startDate?: string;
	endDate?: string;
	userId?: number;
};
