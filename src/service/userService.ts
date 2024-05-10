import { getToken } from '../requests/tokenRequest';
import { ApiService } from '../service/apiService';
import { User } from '../types/userType';
const api = new ApiService('users');
export class UserService {
	static loginUser(): User {
		const user = this.getAllUsers();
		return user[0];
	}
	static getAllUsers(): User[] {
		return api.getAll();
	}
	static addUser(task: User) {
		api.add(task);
	}
	static deleteUser(id: number) {
		api.remove(id);
	}
	static updateUser(task: User) {
		api.update(task);
	}
	static getUserById(id: number): User | undefined {
		return api.getById(id);
	}
	static async login(login: string, password: string) {
		const user = this.getAllUsers().find((u) => u.login === login);

		if (!user || user.password !== password) {
			return null;
		}
		return await getToken(user.id);
	}
	static getUserName(id:number):string{
		const user =this.getUserById(id)
		return (`${user?.firstName} ${user?.lastName}`)
	}
}
