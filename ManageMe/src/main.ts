import './style.css';
import { ProjectService } from './projectService.ts';

const projectService = new ProjectService();

const project1 = projectService.createProject('Projekt A', 'A');
const project2 = projectService.createProject('Projekt B', 'B');

const allProjects = projectService.getAllProjects();
console.log('Wszystkie projekty:', allProjects);

projectService.updateProject(project1.id, {
	name: 'Nowa projekt A',
	description: 'A',
});

projectService.deleteProject(project2.id);

const projectById = projectService.getProjectById(project1.id);
console.log('Projekt po ID:', projectById);
