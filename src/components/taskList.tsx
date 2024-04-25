import React, { useEffect, useState } from 'react';
import { Task } from '../types/taskType';
import { TaskService } from '../service/taskService';
import { Status } from '../types/enums/statusEnum';
import TaskForm from './form/taskForm';
import { useParams } from 'react-router-dom';
import TaskDetails from './taskDetails';

export default function TaskList() {
	const [tasks, setTasks] = useState<Task[] | null>(null);
	const [createMode, setCreateMode] = useState<boolean>(false);
	const [task,setTask]=useState<Task|null>(null)
	useEffect(() => {
		(async () => {
			getSetTasks();
		})();
	}, [task]);
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
						<button onClick={()=>handleDetails(task)} key={task.id} className= 'm-1 rounded-lg text-white font-bold border-t w-5/6 p-3 bg-gradient-to-r from-cyan-400 to-blue-500 '>
							{task.description}
							
						</button>
					) : null
				)}
			</div>
		);
	};
	
	const DoingTasks: React.FC = () => {
		return (
			<div>
				{tasks?.map((task) =>
					task.status === Status.doing ? (
						<button onClick={()=>handleDetails(task)} key={task.id} className='m-1 rounded-lg border-t font-bold w-5/6 p-3 text-white bg-gradient-to-r from-amber-300 to-orange-500'>
							<p>{task.description}</p>
						</button>
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
						<button onClick={()=>handleDetails(task)} key={task.id} className='m-1 rounded-lg border-t w-5/6 p-3 font-bold bg-gradient-to-r from-lime-400 to-green-600 text-white'>
							<p>{task.description}</p>
						</button>
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
	const handleDetails=(task:Task)=>{
		setTask(task);
	}
	const handleDelete=(taskId:number)=>{
		TaskService.deleteTask(taskId);
		setTask(null);
		getSetTasks();
	}
	
	return (
		<div className='mx-2 '>
			<div className='text-right  '>
				<button
					className='bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold py-2 px-4 rounded'
					onClick={() => handleCreate()}
				>
					Add
				</button>
			</div>
			<div className='text-center bg-white rounded-xl '>
				<div className=' flex mt-2 rounded font-bold text-xl bg-gray-100'>
					<div className='w-1/3 py-5 '>To do</div>
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
			{task&&<TaskDetails
			closeMenu={()=>setTask(null)}
			handleDelete={handleDelete}
			task={task}/>}
			
		</div>
	);
}
