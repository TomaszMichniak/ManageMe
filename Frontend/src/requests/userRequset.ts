import axios from 'axios';
import { User } from '../types/userType';

export async function register(user: User) {
	return axios.post('http://localhost:3001/register', { user });
}

export async function getUserById(userId: string) {
	return await axios
		.get(`http://localhost:3001/user/${userId}`)
		.then((response) => response.data);
}
export async function updateUser(user: User) {
	return await axios.put(`http://localhost:3001/user/${user._id}`, user);
}
export async function deleteUser(userId: string) {
	return await axios.delete(`http://localhost:3001/user/${userId}`);
}
export async function loginUser(login: string, password: string) {
	return axios.get(`http://localhost:3001/login/${login}/${password}`);
}
export async function getAllUsers() {
	return axios
		.get(`http://localhost:3001/users`)
		.then((response) => response.data);
}
