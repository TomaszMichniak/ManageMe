import { Role } from './enums/roleEnum';

export type User = {
	id: number;
	firstName: string;
	lastName: string;
	role: Role;
};
