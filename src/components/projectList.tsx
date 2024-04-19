import { useState, useEffect } from 'react';
import { Project } from '../types/projectType';
import { Link } from 'react-router-dom';
import { ProjectService } from '../service/projectService';
import ProjectForm from './form/projectForm';

export default function ProjectList() {
	const [createMode, setCreateMode] = useState<boolean>(false);
	const [editingProject, setEditingProject] = useState<Project | null>(null);
	const [projects, setProjects] = useState<Project[] | null>(null);
	useEffect(() => {
		(async () => {
			const data = await ProjectService.getAllProjects();
			setProjects(data);
		})();
	}, []);
	const handleEdit = async (projectId: number) => {
		let project = await ProjectService.getProjectById(projectId); // Pamiętaj o używaniu await przy pobieraniu projektu
		setEditingProject(project!);
	};
	const handleCreateNewProject = async (newProject: Project) => {
		ProjectService.addProject(newProject);
		const data = await ProjectService.getAllProjects();
		setProjects(data);
		setCreateMode(false);
	};
	const handleEditProject = async (editProject: Project) => {
		ProjectService.updateProject(editProject);
		const data = await ProjectService.getAllProjects();
		setProjects(data);
		setEditingProject(null);
	};
	const handleDelete = async (projectId: number) => {
		ProjectService.deleteProject(projectId);
		const data = await ProjectService.getAllProjects();
		setProjects(data);
	};
	const handleCreate = () => {
		setCreateMode(!createMode);
	};
	return (
		<div className='mx-2 overflow-x-auto  '>
			<div className='text-right m-2'>
				<button
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
					onClick={() => handleCreate()}
				>
					Add
				</button>
			</div>
			<div className='bg-white shadow-sm shadow-red-900 rounded-lg'>
				<table className=' text-wrap w-full text-sm text-center text-gray-600 dark:text-gray-400'>
					<thead className='text-s text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
						<tr>
							<th className='py-3 max-w-10'>Name</th>
							<th className=''>Description</th>
							<th className='w-1/5'>Action</th>
						</tr>
					</thead>
					<tbody>
						{projects?.map((project) => (
							<tr
								className=' border-t dark:bg-gray-800 dark:border-gray-700'
								key={project.id}
							>
								<td className='px-2 py-4 font-medium text-gray-900 dark:text-white'>
									<p className='break-words'>{project.name}</p>
								</td>
								<td className='px-2 py-4 font-medium text-gray-900  dark:text-white'>
									<p>{project.description}</p>
								</td>
								<td className=' px-2 py-4 font-medium lg:flex text-gray-900  dark:text-white'>
									<Link
										to={`/project/${project.id}`}
										className='w-full m-1 bg-green-400 block text-white font-bold py-2 px-2 rounded'
									>
										Story
									</Link>
									<button
										className='w-full m-1 bg-green-400 block text-white font-bold py-2 px-2 rounded'
										onClick={() => handleEdit(project.id)}
									>
										E
									</button>
									<button
										className='w-full m-1  bg-red-400 block text-white font-bold py-2 px-2 rounded'
										onClick={() => handleDelete(project.id)}
									>
										X
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{createMode && (
				<ProjectForm
					handleCloseCreateMenu={() => setCreateMode(false)}
					handleCreate={handleCreateNewProject}
				/>
			)}
			{editingProject && (
				<ProjectForm
					project={editingProject}
					handleCloseCreateMenu={() => setEditingProject(null)}
					handleCreate={handleEditProject}
				/>
			)}
		</div>
	);
}
