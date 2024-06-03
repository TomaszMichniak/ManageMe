import { Priority } from './enums/priorityEnum';
import { Status } from './enums/statusEnum';
export type Task = {
	_id: string;
	description: string;
	priority: Priority;
	storyId: string;
	status: Status;
	addDate: string;
	startDate?: string;
	endDate?: string;
	userId?: string;
};
