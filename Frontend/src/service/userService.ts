import { ApiService } from '../service/apiService';
import { User } from '../types/userType';
const api = new ApiService('user');
export class UserService {
	static loginUser(): User {
		const user = this.getAllUsers();
		return user[0];
	}
	static getAllUsers(): User[] {
		return api.getAll();
	}
	static getUser(): User {
		const users = this.getAllUsers();
		return users[0];
	}
	static addUser(user: User) {
		api.clear();
		api.add(user);
	}
}
