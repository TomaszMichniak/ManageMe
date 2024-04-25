import { Role } from './enums/roleEnum';

export type User = {
	id: number;
	login:string;
	password:string;
	firstName: string;
	lastName: string;
	role: Role;
};
