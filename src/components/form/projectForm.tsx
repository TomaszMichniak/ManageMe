import { useEffect, useState, FormEvent } from 'react';
import { Project } from '../../types/projectType';
interface Props {
	handleCloseCreateMenu: () => void;
	handleCreate: (newProject: Project) => void;
	project?: Project;
}
export default function ProjectForm({
	handleCreate,
	handleCloseCreateMenu,
	project,
}: Props) {
	const [formData, setFormData] = useState({ name: '', description: '' });

	useEffect(() => {
		if (project) {
			setFormData({ name: project.name, description: project.description });
		}
	}, [project]);

	const handleCreateProject = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let newProject: Project = {
			id: project ? project.id : Math.floor(Date.now() / 100),
			name: formData.name,
			description: formData.description,
		};
		if (newProject.name == '' || newProject.description == '') return;
		await handleCreate(newProject);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	return (
		<div className='background-form w-screen h-screen absolute top-0 left-0'>
			<div className=' flex h-screen w-11/12 items-center mx-auto '>
				<div className='bg-white rounded mx-auto '>
					<div className='flex justify-center mx-auto items-center text-xl py-2 px-3'>
						<p className='ml-auto'>
							{project ? 'Edit project' : 'Add new project'}
						</p>
						<button
							onClick={handleCloseCreateMenu}
							className='rounded ml-auto bg-gray-100 p-3'
						>
							X
						</button>
					</div>
					<form onSubmit={handleCreateProject}>
						<div className='flex-col py-5  items-center mx-5'>
							<input
								type='text'
								name='name'
								value={formData.name}
								onChange={handleInputChange}
								className='my-1 shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker'
								placeholder='Name'
							/>
							<input
								type='text'
								name='description'
								value={formData.description}
								onChange={handleInputChange}
								className='my-1 shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker'
								placeholder='Description'
							/>
							<button
								type='submit'
								className='my-1 ml-auto flex-no-shrink shadow bg-white py-2 px-4 border-2 rounded text-teal  '
							>
								{project ? 'Save' : 'Add'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
