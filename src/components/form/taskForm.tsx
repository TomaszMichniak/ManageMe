import { useEffect, useState, FormEvent } from 'react';
import { Task } from '../../types/taskType';
import { Priority } from '../../types/enums/priorityEnum';
import { Status } from '../../types/enums/statusEnum';
import moment from 'moment';
interface Props {
	handleCloseCreateMenu: () => void;
	handleCreate: (newProject: Task) => void;
	task?: Task;
	storyId: number;
}
export default function TaskForm({
	handleCreate,
	handleCloseCreateMenu,
	task,
	storyId,
}: Props) {
	const [formData, setFormData] = useState({
		description: '',
		priority: Priority.low,
	});

	useEffect(() => {
		if (task) {
			setFormData({
				description: task.description,
				priority: task.priority,
			});
		}
	}, [task]);

	const handleCreateTask = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let newProject: Task = {
			id: task ? task.id : Math.floor(Date.now() / 100),
			priority: task ? task.priority : formData.priority,
			storyId: task ? task.storyId : storyId,
			status: task ? task.status : Status.todo,
			addDate: task ? task.addDate : moment().format('DD-MM-YYYY'),
			description: task ? task.description : formData.description,
		};
		if (newProject.description == '') return;
		await handleCreate(newProject);
	};
	const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedPriority = e.target.value as unknown as Priority;
		if (Object.values(Priority).includes(selectedPriority)) {
			setFormData({ ...formData, priority: selectedPriority });
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	return (
		<div className='background-form w-screen h-screen fixed top-0 left-0'>
			<div className=' flex h-screen w-11/12 items-center mx-auto '>
				<div className='bg-white rounded mx-auto '>
					<div className='flex justify-center mx-auto items-center text-xl py-2 px-3'>
						<p className='ml-auto'>{task ? 'Edit task' : 'Add new task'}</p>
						<button
							onClick={handleCloseCreateMenu}
							className='rounded ml-auto bg-gray-100 p-3'
						>
							X
						</button>
					</div>
					<form onSubmit={handleCreateTask}>
						<div className='flex-col py-5  items-center mx-5'>
							<input
								type='text'
								name='description'
								value={formData.description}
								onChange={handleInputChange}
								className='my-1 shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker'
								placeholder='Description'
							/>
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
								{task ? 'Save' : 'Add'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
