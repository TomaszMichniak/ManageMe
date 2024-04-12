import { Project } from './projectType';
import { Priority } from './enums/priorityStatus';
import { Status } from './enums/statusEnum';

export type Story = {
	id: number;
	name: string;
	description: string;
	priority: Priority;
	project: Project;
	createDate: string;
	status: Status;
	owner: number;
};
