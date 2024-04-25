import { ApiService } from '../service/apiService';
import { User } from '../types/userType';
import jwt from 'jsonwebtoken';
const api = new ApiService('users');
const secretKey:string="SecretKey";
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
	static login(login:string,password:string){
		const user = this.getAllUsers().find(u => u.login === login);
		
		if (!user || user.password !== password) {
		  return null;
		}
	
		//const token = jwt.sign({ userId: user.id, login: user.login, role: user.role }, secretKey, { expiresIn: '1h' });
		//return token;
	}
	
}
