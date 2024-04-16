import { StoryService } from '../service/storyService';
import { Story } from '../types/storyType';
import StoryForm from './form/storyForm';
import { Status } from '../types/enums/statusEnum';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
export default function StoryList() {
	let { projectId } = useParams<{ projectId: string }>();
	if (projectId === undefined) {
		throw new Error('undefined Parms');
	}
	const projectIdNumber = Math.abs(parseInt(projectId));
	const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);
	const [createMode, setCreateMode] = useState<boolean>(false);
	const [stories, setStories] = useState<Story[] | null>(null);
	const [editingProject, setEditingProject] = useState<Story | null>(null);
	useEffect(() => {
		(async () => {
			getSetStory();
		})();
	}, [selectedStatus]);
	const getSetStory = async () => {
		if (selectedStatus == null) {
			const data = await StoryService.getStoriesByProjectId(projectIdNumber);
			setStories(data);
		} else {
			let data = await StoryService.getStoriesByProjectId(projectIdNumber);
			data = data.filter((item) => item.status == selectedStatus);
			setStories(data);
		}
	};
	const handleEdit = async (storyId: number) => {
		let project = await StoryService.getStoryById(storyId);
		setEditingProject(project!);
	};
	const handleEditProject = async (editStory: Story) => {
		StoryService.updateStory(editStory);
		getSetStory();
		setEditingProject(null);
	};
	const handleCreateNewStory = async (newStory: Story) => {
		StoryService.addStory(newStory);
		getSetStory();

		setCreateMode(false);
	};
	const handleDelete = async (storyId: number) => {
		StoryService.deleteStory(storyId);
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
			<div className='text-right m-2'>
				<label>sort: </label>
				<select id='status' onChange={handleSelectChange}>
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
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
					onClick={() => handleCreate()}
				>
					Add
				</button>
			</div>
			<div className='flex flex-wrap justify-center items-center '>
				{stories?.map((story) => (
					<div className=' m-2 border p-5'>
						<div key={story.id}>
							<p>Nazwa: {story.name}</p>
							<p>Opis: {story.description}</p>
							<p>Priorytet: {story.priority}</p>
							<p>Utworzono: {story.createDate}</p>
							<p>Status: {story.status}</p>
							<p>Właściciel: {story.owner}</p>
						</div>
						<div className=''>
							<button
								className='w-full my-1 bg-green-400 block text-white font-bold py-2 px-2 rounded'
								onClick={() => handleEdit(story.id)}
							>
								E
							</button>
							<button
								className='w-full my-1  bg-red-400 block text-white font-bold py-2 px-2 rounded'
								onClick={() => handleDelete(story.id)}
							>
								X
							</button>
						</div>
					</div>
				))}
			</div>
			{createMode && (
				<StoryForm
					handleCloseCreateMenu={() => setCreateMode(false)}
					handleCreate={handleCreateNewStory}
					projectId={projectIdNumber}
				/>
			)}
			{editingProject && (
				<StoryForm
					story={editingProject}
					handleCloseCreateMenu={() => setEditingProject(null)}
					handleCreate={handleEditProject}
					projectId={projectIdNumber}
				/>
			)}
		</div>
	);
}
