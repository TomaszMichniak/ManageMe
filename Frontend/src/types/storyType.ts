import { Priority } from './enums/priorityEnum';
import { Status } from './enums/statusEnum';

export type Story = {
	_id: string;
	name: string;
	description: string;
	priority: Priority;
	project: string;
	createDate: string;
	status: Status;
	userId: string;
};
