import { Story } from '../../types/storyType';
import { useEffect, useState } from 'react';
import { FormEvent } from 'react';
import moment from 'moment';
import { Status } from '../../types/enums/statusEnum';
import { Priority } from '../../types/enums/priorityEnum';
import { useNavigate, useLocation } from 'react-router-dom';
import { User } from '../../types/userType';
import { UserService } from '../../service/userService';
interface Props {
	handleCloseCreateMenu: () => void;
	handleCreate: (newStory: Story) => void;
	story?: Story;
	userId?: string;
	projectId: string;
}
export default function StoryForm({
	handleCloseCreateMenu,
	handleCreate,
	projectId,
	story,
}: Props) {
	const navigate = useNavigate();
	const location = useLocation();
	const[user,setUser]=useState<User|null>(null)

	
	const [formData, setFormData] = useState({
		name: '',
		description: '',
		status: Status.todo,
		priority: Priority.low,
	});
	useEffect(() => {
		const data=UserService.getUser();
		if(!data)
			navigate('/login', { state: { from: location } });
		setUser(data);
		if (story) {
			setFormData({
				name: story.name,
				description: story.description,
				status: story.status,
				priority: story.priority,
			});
		}
	}, [story]);

	const handleCreateStory = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (user?._id!=null) {
			let newStory: Story = {
				_id: story ? story._id : '',
				name: formData.name,
				description: formData.description,
				status: formData.status,
				priority: formData.priority,
				createDate: story ? story.createDate : moment().format('DD-MM-YYYY'),
				userId: story ? story.userId : user._id,
				project: projectId,
			};
			if (newStory.name == '' || newStory.description == '') return;
			await handleCreate(newStory);
		}
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
			<div className=' flex h-screen  w-11/12 items-center mx-auto '>
				<div className='bg-white dark:bg-gray-500 dark:text-black rounded mx-auto '>
					<div className='flex justify-center mx-auto items-center text-xl py-2 px-3'>
						<p className='ml-auto'>{story ? 'Edit story' : 'Add new story'}</p>
						<button onClick={handleCloseCreateMenu} className='rounded ml-auto'>
							<img src='../icons/closeIcon.svg' alt='Close' className='w-9' />
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
									className='w-full my-1 shadow bg-white border rounded-lg  py-2 px-4 mr-4'
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
									className='my-1 w-full shadow bg-white border rounded-lg  py-2 px-4 mr-4'
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
								className='my-1 w-full text-white font-bold flex-no-shrink  bg-gradient-to-r from-cyan-400 to-blue-600 py-2 px-4 text-teal  '
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
