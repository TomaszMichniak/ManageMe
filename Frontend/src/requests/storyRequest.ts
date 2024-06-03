import axios from 'axios';
import { Story } from '../types/storyType';

export async function getAllStories() {
	return axios
		.get(`http://localhost:3001/stories`)
		.then((response) => response.data);
}
export async function addStory(story: Story) {
	return axios.post('http://localhost:3001/stories', { story });
}

export async function getStoryById(storyId: string) {
	return await axios
		.get(`http://localhost:3001/story/${storyId}`)
		.then((response) => response.data);
}
export async function updateStory(story: Story) {
	return await axios.put(`http://localhost:3001/stories/${story._id}`, story);
}
export async function deleteStory(storyId: string) {
	return await axios.delete(`http://localhost:3001/stories/${storyId}`);
}
export async function getStoriesByProjectId(projectId: string) {
	return await axios
		.get(`http://localhost:3001/stories/${projectId}`)
		.then((response) => response.data);
}
