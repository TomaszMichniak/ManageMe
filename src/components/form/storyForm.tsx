import { Story } from '../../types/storyType';
import { useEffect, useState } from 'react';
import { FormEvent } from 'react';
import moment from 'moment';
import { Status } from '../../types/enums/statusEnum';
import { Priority } from '../../types/enums/priorityEnum';
import { ProjectService } from '../../service/projectService';
import { UserService } from '../../service/userService';
interface Props {
	handleCloseCreateMenu: () => void;
	handleCreate: (newStory: Story) => void;
	story?: Story;
	projectId: number;
}
export default function StoryForm({
	handleCloseCreateMenu,
	handleCreate,
	projectId,
	story,
}: Props) {
	const [formData, setFormData] = useState({
		name: '',
		description: '',
		status: Status.todo,
		priority: Priority.low,
	});

	useEffect(() => {
		if (story) {
			setFormData({
				name: story.name,
				description: story.description,
				status: story.status,
				priority: story.priority,
			});
		}
	}, [story]);
	const user = UserService.loginUser();
	const project = ProjectService.getProjectById(projectId);
	const handleCreateStory = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let newStory: Story = {
			id: story ? story.id : Math.floor(Date.now() / 100),
			name: formData.name,
			description: formData.description,
			status: formData.status,
			priority: formData.priority,
			createDate: story ? story.createDate : moment().format('DD-MM-YYYY'),
			userId: user.id,
			project: project!,
		};
		if (newStory.name == '' || newStory.description == '') return;
		await handleCreate(newStory);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};
	const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedStatus = e.target.value as unknown as Status;
		if (Object.values(Status).includes(selectedStatus)) {
			setFormData({ ...formData, status: selectedStatus });
		}
	};
	const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedPriority = e.target.value as unknown as Priority;
		if (Object.values(Priority).includes(selectedPriority)) {
			setFormData({ ...formData, priority: selectedPriority });
		}
	};

	return (
		<div className='background-form w-screen h-screen fixed top-0 left-0'>
			<div className=' flex h-screen w-11/12 items-center mx-auto '>
				<div className='bg-white rounded mx-auto '>
					<div className='flex justify-center mx-auto items-center text-xl py-2 px-3'>
						<p className='ml-auto'>{story ? 'Edit story' : 'Add new story'}</p>
						<button
							onClick={handleCloseCreateMenu}
							className='rounded ml-auto bg-gray-100 p-3'
						>
							X
						</button>
					</div>
					<form onSubmit={handleCreateStory}>
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
							<div>
								<label htmlFor='status'>Status:</label>
								<select
									id='status'
									value={formData.status}
									onChange={handleStatusChange}
								>
									{Object.values(Status).map((status) => (
										<option key={status} value={status}>
											{status}
										</option>
									))}
								</select>
							</div>
							<div>
								<label htmlFor='priority'>Priority:</label>
								<select
									id='priority'
									value={formData.priority}
									onChange={handlePriorityChange}
								>
									{Object.values(Priority).map((priority) => (
										<option key={priority} value={priority}>
											{priority}
										</option>
									))}
								</select>
							</div>

							<button
								type='submit'
								className='my-1 ml-auto flex-no-shrink shadow bg-white py-2 px-4 border-2 rounded text-teal  '
							>
								{story ? 'Save' : 'Add'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
