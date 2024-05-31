import axios from 'axios';
import { Project } from '../types/projectType';

export async function getAllProjects() {
	return axios
		.get(`http://localhost:3001/projects`)
		.then((response) => response.data);
}
export async function addProject(project: Project) {
	return axios.post('http://localhost:3001/projects', { project });
}

export async function getProjectById(projectId: string) {
	return await axios
		.get(`http://localhost:3001/project/${projectId}`)
		.then((response) => response.data);
}
export async function updateProject(project: Project) {
	return await axios.put(
		`http://localhost:3001/projects/${project._id}`,
		project
	);
}
export async function deleteProject(projectId: string) {
	return await axios.delete(`http://localhost:3001/projects/${projectId}`);
}
