import { useState, useEffect } from 'react';
import { Project } from '../types/projectType';
import { Link } from 'react-router-dom';
import ProjectForm from './form/projectForm';
import { notificationService } from '../service/notificationService';
import { Priority } from '../types/enums/priorityEnum';
import {
	addProject,
	deleteProject,
	getAllProjects,
	getProjectById,
	updateProject,
} from '../requests/projectRequest';

export default function ProjectList() {
	const [createMode, setCreateMode] = useState<boolean>(false);
	const [editingProject, setEditingProject] = useState<Project | null>(null);
	const [projects, setProjects] = useState<Project[] | null>(null);

	const refreshProjects = async () => {
		const data = await getAllProjects();
		setProjects(data);
	};

	useEffect(() => {
		refreshProjects();
	}, []);
	const handleEdit = async (projectId: string) => {
		let project = await getProjectById(projectId);
		setEditingProject(project!);
	};
	const handleCreateNewProject = async (newProject: Project) => {
		await addProject(newProject);
		const notification = notificationService.createNotification(
			'New project',
			`New project with name: ${newProject.name} was created`,
			Priority.low
		);
		notificationService.send(notification);
		refreshProjects();
		setCreateMode(false);
	};
	const handleEditProject = async (editProject: Project) => {
		await updateProject(editProject);
		const notification = notificationService.createNotification(
			'Edit project',
			` ${editProject.name} was edited`,
			Priority.low
		);
		notificationService.send(notification);

		setEditingProject(null);
		await refreshProjects();
	};
	const handleDelete = async (projectId: string) => {
		await deleteProject(projectId);
		const notification = notificationService.createNotification(
			'Project',
			`Project was removed!`,
			Priority.high
		);
		notificationService.send(notification);
		await refreshProjects();
	};
	const handleCreate = () => {
		setCreateMode(!createMode);
	};
	return (
		<div className='mx-2 overflow-x-au to '>
			<p className='text-center font-bold text-5xl text-white'>All projects</p>
			<div className='text-right m-2'>
				<button
					className='bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold py-2 px-4 rounded'
					onClick={() => handleCreate()}
				>
					Add
				</button>
			</div>
			<div className='bg-white  rounded-lg'>
				<table className=' text-wrap w-full text-sm text-center'>
					<thead className='text-s text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400'>
						<tr>
							<th className='py-3 max-w-10'>Name</th>
							<th className=''>Description</th>
							<th className='w-1/5'>Action</th>
						</tr>
					</thead>
					<tbody>
						{projects?.map((project) => (
							<tr
								className=' border-t dark:bg-gray-400 dark:border-gray-400'
								key={project._id}
							>
								<td className='px-2 py-2 text-xl  '>
									<p className='break-words '>{project.name}</p>
								</td>
								<td className='px-2 py-2 text-xl   '>
									<p>{project.description}</p>
								</td>
								<td className=' px-2 py-2  lg:flex   '>
									<Link
										to={`/project/${project._id}`}
										className='bg-gradient-to-r from-cyan-400 to-blue-600 w-full m-1 text-white  block dark:text-gray-800 font-bold py-2 px-2 rounded-xl dark:bg-gradient-to-r dark:from-gray-300 dark:to-gray-400'
									>
										Stories
									</Link>
									<button
										className=' m-1  text-white font-bold py-2 px-2 rounded'
										onClick={() => handleEdit(project._id)}
									>
										<img
											src='/icons/editIcon.svg'
											alt='Edit'
											className='w-7 md:w-9'
										/>
									</button>
									<button
										className=' m-1  text-white font-bold py-2 px-2 rounded'
										onClick={() => handleDelete(project._id)}
									>
										<img
											src='/icons/binIcon.svg'
											alt='Delete'
											className='w-7 md:w-9'
										/>
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
