import { ApiService } from '../service/apiService';
import { Story } from '../types/storyType';
const api = new ApiService('stories');
export class StoryService {
	static getAllStories(): Story[] {
		return api.getAll();
	}
	static addStory(story: Story) {
		api.add(story);
	}
	static deleteStory(id: number) {
		api.remove(id);
	}
	static updateStory(updateStory: Story) {
		api.update(updateStory);
	}
	static getStoryById(id: number): Story | undefined {
		return api.getById(id);
	}
	static getStoriesByProjectId(projectId: number) {
		return this.getAllStories().filter(
			(item: Story) => item.project.id == projectId
		);
	}
}
