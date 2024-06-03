import axios from 'axios';
import { Task } from '../types/taskType';

export async function getAllTasks() {
	return axios
		.get(`http://localhost:3001/tasks`)
		.then((response) => response.data);
}
export async function addTask(task: Task) {
	return axios.post('http://localhost:3001/tasks', { task });
}

export async function getTaskById(taskId: string) {
	return await axios
		.get(`http://localhost:3001/tasks/${taskId}`)
		.then((response) => response.data);
}
export async function updateTask(task: Task) {
	return await axios.put(`http://localhost:3001/tasks/${task._id}`, task);
}
export async function deleteTask(taskId: string) {
	return await axios.delete(`http://localhost:3001/tasks/${taskId}`);
}
export async function getAllStoryTasks(storyId: string) {
	return axios
		.get(`http://localhost:3001/tasks/${storyId}`)
		.then((response) => response.data);
}
