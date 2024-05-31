import axios from 'axios';
import { ApiService } from '../service/apiService';
import { Project } from '../types/projectType';

const api = new ApiService('projects');
export class ProjectService {
	static getAllProjects() {
		return api.getAll();
	}
	static addProject(project: Project) {
		return axios.post('http://localhost:3001/projects', { project });
		//api.add(project);
	}
	static deleteProject(id: string) {
		//api.remove(id);
	}
	static updateProject(updateProject: Project) {
		//api.update(updateProject);
	}
	static getProjectById(id: number): Project | undefined {
		return api.getById(id);
	}
}
