import mongoose, { SchemaTypes } from 'mongoose';
import { StatusEnum } from './statusEnum';
import { PriorityEnum } from './priorityEnum';

const TaskSchema = new mongoose.Schema({
	description: { type: String },
	priority: { type: String, enum: Object.values(PriorityEnum), required: true },
	storyId: { type: SchemaTypes.ObjectId, ref: 'Story', required: true },
	addDate: { type: String },
	startDate: { type: String },
	endDate: { type: String },
	status: { type: String, enum: Object.values(StatusEnum), required: true },
	userId: { type: SchemaTypes.ObjectId, ref: 'User' },
});

export const TaskModel = mongoose.model('Task', TaskSchema);

export const getTasks = () => TaskModel.find();
export const getTaskById = (id: string) => TaskModel.findById(id);
export const createTask = (values: Record<string, any>) =>
	new TaskModel(values).save().then((task) => task.toObject());
export const deleteTaskById = (id: string) =>
	TaskModel.findByIdAndDelete({ _id: id });
export const updateTaskById = (id: string, values: Record<string, any>) =>
	TaskModel.findByIdAndUpdate(id, values);
export const getAllStoryTasks = (storyId: string) =>
	TaskModel.find({ storyId: storyId });
