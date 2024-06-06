import { Story } from '../types/storyType';
import { useLocation } from 'react-router-dom';
import StoryForm from './form/storyForm';
import { Status } from '../types/enums/statusEnum';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { notificationService } from '../service/notificationService';
import { Priority } from '../types/enums/priorityEnum';
import { getProjectById } from '../requests/projectRequest';
import {
	addStory,
	deleteStory,
	getStoriesByProjectId,
	getStoryById,
	updateStory,
} from '../requests/storyRequest';
import { Project } from '../types/projectType';
import { getUserById } from '../requests/userRequset';
import { User } from '../types/userType';
export default function StoryList() {
	let { projectId } = useParams<{ projectId: string }>();
	if (projectId === undefined) {
		throw new Error('undefined Parms');
	}
	const location = useLocation();
	const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);
	const [createMode, setCreateMode] = useState<boolean>(false);
	const [stories, setStories] = useState<Story[] | null>(null);
	const [editingStory, setEditingStory] = useState<Story | null>(null);
	const [project, setProject] = useState<Project | null>(null);
	const [owners, setOwners] = useState<{ [key: string]: User }>({});
	useEffect(() => {
		(async () => {
			const data = await getProjectById(projectId);
			setProject(data);
			await getSetStory();
		})();
	}, [selectedStatus]);
	const getSetStory = async () => {
		let data = await getStoriesByProjectId(projectId);
        if (selectedStatus != null) {
            data = data.filter((item: Story) => item.status == selectedStatus);
        }
        setStories(data);
        const userIds = data.map((story: Story) => story.userId);
        const userPromises = userIds.map((id:string) => getUserById(id));
        const usersData = await Promise.all(userPromises);
        const usersMap: { [key: string]: User } = {};
        usersData.forEach(user => {
            usersMap[user._id] = user;
        });
        setOwners(usersMap);
	};
	const handleEdit = async (storyId: string) => {
		let project = await getStoryById(storyId);
		setEditingStory(project!);
	};
	const handleEditProject = async (editStory: Story) => {
		await updateStory(editStory);
		const notification = notificationService.createNotification(
			'Story edited',
			`Story with name: ${editStory.name} has been edited!`,
			Priority.low
		);
		notificationService.send(notification);
		getSetStory();
		setEditingStory(null);
	};
	const handleCreateNewStory = async (newStory: Story) => {
		await addStory(newStory);
		const notification = notificationService.createNotification(
			'Story created',
			`Story with name: ${newStory.name} has been created!`,
			Priority.low
		);
		notificationService.send(notification);
		getSetStory();
		setCreateMode(false);
	};
	const handleDelete = async (storyId: string) => {
		await deleteStory(storyId);
		const notification = notificationService.createNotification(
			'Story removed',
			`Your story has been removed!`,
			Priority.high
		);
		notificationService.send(notification);
		getSetStory();
	};
	const handleCreate = () => {
		setCreateMode(!createMode);
	};
	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		if (e.target.value === 'all') {
			setSelectedStatus(null);
		} else {
			setSelectedStatus(e.target.value as Status);
		}
	};

	return (
		<div className=''>
			<p className='text-center font-bold text-4xl text-white uppercase'>
				{project?.name}
			</p>
			<div className='text-right mx-5  my-2'>
				<label className='text-white'>Sort: </label>
				<select
					className='my-1 shadow bg-white border rounded-lg  py-2 px-4 mr-4'
					id='status'
					onChange={handleSelectChange}
				>
					<option key={'all'} value={'all'}>
						All
					</option>
					{Object.values(Status).map((status) => (
						<option key={status} value={status}>
							{status}
						</option>
					))}
				</select>
				<button
					className='bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold py-2 px-4 rounded'
					onClick={() => handleCreate()}
				>
					Add
				</button>
				<p className='text-center text-xl text-white'>Stories:</p>
			</div>
			<div className='flex flex-wrap    justify-center items-stretch '>
				{stories?.map((story) => (
					<div
						key={story._id}
						className='bg-white basis-10/12 sm:basis-1/3 lg:basis-1/4  dark:bg-gray-400 m-1 p-5'
					>
						<div>
							<p className='py-1'>Name: {story.name}</p>
							<p className='py-1'>Description: {story.description}</p>
							<p className='py-1'>Priority: {story.priority}</p>
							<p className='py-1'>Created: {story.createDate}</p>
							<p className='py-1'>Status: {story.status}</p>
							<p className='py-1'>Owner: {owners[story.userId]&& `${owners[story.userId].firstName} ${owners[story.userId].lastName}` || story.userId}</p>
						</div>
						<div className='text-center '>
							<Link
								className='w-full text-white dark:text-black bg-gradient-to-r from-cyan-400 to-blue-600 my-1 dark:bg-gradient-to-r dark:from-gray-300 dark:to-gray-400 block text-center  font-bold py-2 px-2 rounded'
								to={`${location.pathname}/story/${story._id}`}
							>
								Tasks
							</Link>
							<button
								className=' my-1 mx-5  '
								onClick={() => handleEdit(story._id)}
							>
								<img src='/icons/editIcon.svg' alt='Delete' className='w-7 ' />
							</button>
							<button
								className=' my-1 mx-5 basis-1/2 '
								onClick={() => handleDelete(story._id)}
							>
								<img src='/icons/binIcon.svg' alt='Delete' className='w-7  ' />
							</button>
						</div>
					</div>
				))}
			</div>
			{createMode && (
				<StoryForm
					handleCloseCreateMenu={() => setCreateMode(false)}
					handleCreate={handleCreateNewStory}
					projectId={projectId}
				/>
			)}
			{editingStory && (
				<StoryForm
					story={editingStory}
					handleCloseCreateMenu={() => setEditingStory(null)}
					handleCreate={handleEditProject}
					projectId={projectId}
				/>
			)}
		</div>
	);
}
