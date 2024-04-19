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
}