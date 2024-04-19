import React, { useEffect, useState } from 'react';
import { Task } from '../types/taskType';
import { TaskService } from '../service/taskService';
import { Status } from '../types/enums/statusEnum';
import TaskForm from './form/taskForm';
import { useParams } from 'react-router-dom';
import SetUserTaskForm from './form/setUserTaskForm';

export default function TaskList() {
	const [tasks, setTasks] = useState<Task[] | null>(null);
	const [createMode, setCreateMode] = useState<boolean>(false);
	const [userMode, setUserMode] = useState<boolean>(false);
	useEffect(() => {
		(async () => {
			getSetTasks();
		})();
	}, []);
	let { storyId } = useParams<{ storyId: string }>();
	if (storyId === undefined) {
		throw new Error('undefined Parms');
	}
	const storyIdNumber = Math.abs(parseInt(storyId));
	const getSetTasks = () => {
		const data = TaskService.getAllStoryTasks(storyIdNumber);
		setTasks(data);
	};
	const TodoTasks: React.FC = () => {
		return (
			<div>
				{tasks?.map((task) =>
					task.status === Status.todo ? (
						<div key={task.id} className='border-t '>
							<p>{task.description}</p>
							<p>{task.priority}</p>
							<p>{task.addDate}</p>
							<button
								className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded'
								//onClick={() => handleCreate()}
							>
								edit
							</button>
							<button
								className='m-1 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded'
								onClick={() => handleSetUser()}
							>
								set user
							</button>
							<button
								className='m-1 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded'
								onClick={() => handleDelete(task.id)}
							>
								X
							</button>
						</div>
					) : null
				)}
			</div>
		);
	};
	const handleDelete = async (taskId: number) => {
		TaskService.deleteTask(taskId);
		getSetTasks();
	};
	const DoingTasks: React.FC = () => {
		return (
			<div>
				{tasks?.map((task) =>
					task.status === Status.doing ? (
						<div key={task.id} className='border-t border-l'>
							<p>{task.description}</p>
							<p>{task.priority}</p>
							<p>{task.addDate}</p>
							<p>start: {task.startDate}</p>
							<p>{/* user: {task.user?.firstName} {task.user?.lastName} */}</p>
							<button
								className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded'
								//onClick={() => handleCreate()}
							>
								edit
							</button>
							<button
								className='m-1 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded'
								//onClick={() => handleCreate()}
							>
								Done
							</button>
							<button
								className='m-1 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded'
								onClick={() => handleDelete(task.id)}
							>
								X
							</button>
						</div>
					) : null
				)}
			</div>
		);
	};
	const DoneTasks: React.FC = () => {
		return (
			<div className=''>
				{tasks?.map((task) =>
					task.status === Status.done ? (
						<div key={task.id} className='border-t border-l'>
							<p>{task.description}</p>
							<p>{task.priority}</p>
							<p>{task.addDate}</p>
							<p>start: {task.startDate}</p>
							<p>end: {task.endDate}</p>
							<p>{/* user: {task.user?.firstName} {task.user?.lastName} */}</p>
						</div>
					) : null
				)}
			</div>
		);
	};
	const handleCreateNewTask = async (newTask: Task) => {
		TaskService.addTask(newTask);
		getSetTasks();
		setCreateMode(false);
	};
	const handleCreate = () => {
		setCreateMode(!createMode);
	};
	const handleSetUser = () => {
		setUserMode(!userMode);
	};
	return (
		<div className='mx-2 '>
			<div className='text-right '>
				<button
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
					onClick={() => handleCreate()}
				>
					Add
				</button>
			</div>
			<div className='text-center bg-white rounded-xl '>
				<div className=' flex mt-2 rounded'>
					<div className='w-1/3 py-5 '>ToDo</div>
					<div className='w-1/3 py-5 border-l'>Doing</div>
					<div className='w-1/3 py-5 border-l '>Done</div>
				</div>
				<div className='flex rounded'>
					<div className='w-1/3 '>
						<TodoTasks />
					</div>
					<div className='w-1/3 '>
						<DoingTasks />
					</div>
					<div className='w-1/3'>
						<DoneTasks />
					</div>
				</div>
			</div>
			{createMode && (
				<TaskForm
					handleCloseCreateMenu={() => setCreateMode(false)}
					handleCreate={handleCreateNewTask}
					storyId={storyIdNumber}
				/>
			)}
			{userMode && <SetUserTaskForm />}
		</div>
	);
}
