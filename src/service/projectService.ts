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
		let projects = this.getAllProjects();
		projects = projects.filter((project) => project.id !== id);
		api.remove(projects);
	}
	static updateProject(updateProject: Project) {
		let projects = this.getAllProjects();
		projects = projects.map((project) =>
			project.id === updateProject.id ? updateProject : project
		);
		api.update(projects);
	}
	static getProjectById(id: number) {
		let projects = this.getAllProjects();
		let project = projects.find((project) => project.id == id);
		return project;
	}
}
