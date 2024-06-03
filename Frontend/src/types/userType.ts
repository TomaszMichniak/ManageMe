import { Role } from './enums/roleEnum';

export type User = {
	_id: string;
	login: string;
	password: string;
	firstName: string;
	lastName: string;
	role: Role;
};
