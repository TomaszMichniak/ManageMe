import mongoose, { SchemaTypes } from 'mongoose';
import { StatusEnum } from './statusEnum';
import { PriorityEnum } from './priorityEnum';

const StorySchema = new mongoose.Schema({
	name: { type: String },
	description: { type: String },
	priority: { type: String, enum: Object.values(PriorityEnum), required: true },
	project: { type: SchemaTypes.ObjectId, ref: 'Project', required: true },
	createDate: { type: String },
	status: { type: String, enum: Object.values(StatusEnum), required: true },
	userId: { type: SchemaTypes.ObjectId, ref: 'User', required: true },
});

export const StoryModel = mongoose.model('Story', StorySchema);

export const getStories = () => StoryModel.find();
export const getStoryById = (id: string) => StoryModel.findById(id);
export const createStory = (values: Record<string, any>) =>
	new StoryModel(values).save().then((story) => story.toObject());
export const deleteStoryById = (id: string) =>
	StoryModel.findByIdAndDelete({ _id: id });
export const updateStoryById = (id: string, values: Record<string, any>) =>
	StoryModel.findByIdAndUpdate(id, values);
export const getStoriesByProjectId = (projectId: string) =>
	StoryModel.find({ project: projectId });
