import { Project } from './types/projectType';
export class ProjectService {
	private projects: Project[];
	constructor() {
		this.projects = JSON.parse(localStorage.getItem('projects') || '[]');
	}

	getAllProjects(): Project[] {
		return this.projects;
	}

	getProjectById(id: number): Project | undefined {
		return this.projects.find((project) => project.id === id);
	}

	createProject(name: string, description: string): Project {
		const id = this.projects[this.projects.length - 1].id + 1;
		const project: Project = { id, name, description };
		this.projects.push(project);
		this.saveProjects();
		return project;
	}

	updateProject(id: number, updatedProject: Partial<Project>): boolean {
		const index = this.projects.findIndex((project) => project.id === id);
		if (index !== -1) {
			this.projects[index] = { ...this.projects[index], ...updatedProject };
			this.saveProjects();
			return true;
		}
		return false;
	}

	deleteProject(id: number): void {
		this.projects = this.projects.filter((project) => project.id !== id);
		this.saveProjects();
	}

	private saveProjects(): void {
		localStorage.setItem('projects', JSON.stringify(this.projects));
	}
}
