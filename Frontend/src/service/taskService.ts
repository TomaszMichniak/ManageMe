import { ApiService } from '../service/apiService';
import { Status } from '../types/enums/statusEnum';
import { Task } from '../types/taskType';
const api = new ApiService('tasks');
export class TaskService {
	static getAllTasks(): Task[] {
		return api.getAll();
	}
	static addTask(task: Task) {
		api.add(task);
	}
	static deleteTask(id: number) {
		api.remove(id);
	}
	static updateTask(task: Task) {
		api.update(task);
	}
	static getTaskById(id: number): Task | undefined {
		return api.getById(id);
	}
	static getAllStoryTasks(id: number) {
		return this.getAllTasks().filter((item: Task) => item.storyId == id);
	}
	static setToDoing(task:Task){
		task.status=Status.doing
		this.updateTask(task);
	}
	static setToDone(task:Task){
		task.status=Status.done;
		this.updateTask(task);
	}
}