import { ApiService } from '../service/apiService';
import { Project } from '../types/projectType';

const api = new ApiService('projects');
export class ProjectService {
	static getAllProjects(): Project[] {
		return api.getAll();
	}
	static addProject(project: Project) {
		api.add(project);
	}
	static deleteProject(id: number) {
		api.remove(id);
	}
	static updateProject(updateProject: Project) {
		api.update(updateProject);
	}
	static getProjectById(id: number): Project | undefined {
		return api.getById(id);
	}
}
