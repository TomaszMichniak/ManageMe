import express from 'express';
import {
	createTask,
	getTasks,
	getTaskById,
	deleteTaskById,
	updateTaskById,
	getAllStoryTasks,
} from '../database/task';

export const addTask = async (req: express.Request, res: express.Response) => {
	try {
		const {
			description,
			priority,
			storyId,
			addDate,
			startDate,
			endDate,
			status,
			userId,
		} = req.body.task;
		if (!description || !priority || !status || !storyId)
			return res.sendStatus(400);

		const task = await createTask({
			description,
			priority,
			storyId,
			addDate,
			startDate,
			endDate,
			status,
			userId,
		});

		return res.status(200).json(task).end();
	} catch (error) {
		console.log(error);
		return res.sendStatus(400);
	}
};

export const getAllTasksByStoryId = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { storyId } = req.params;
		const tasks = await getAllStoryTasks(storyId);
		return res.status(200).json(tasks);
	} catch (error) {
		console.log(error);
		return res.sendStatus(400);
	}
};

export const getTask = async (req: express.Request, res: express.Response) => {
	try {
		const { id } = req.params;
		const task = await getTaskById(id);
		if (!task) return res.sendStatus(404);
		return res.status(200).json(task);
	} catch (error) {
		console.log(error);
		return res.sendStatus(400);
	}
};

export const updateTask = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const {
			description,
			priority,
			storyId,
			addDate,
			startDate,
			endDate,
			status,
			userId,
		} = req.body;
		const { id } = req.params;

		if (!description || !priority || !status || !storyId)
			return res.sendStatus(400);

		const task = await updateTaskById(id, {
			description,
			priority,
			storyId,
			addDate,
			startDate,
			endDate,
			status,
			userId,
		});

		return res.status(200).json(task).end();
	} catch (error) {
		console.log(error);
		return res.sendStatus(400);
	}
};

export const deleteTask = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params;
		if (!id) return res.sendStatus(400);
		const task = await deleteTaskById(id);
		if (!task) return res.sendStatus(404);
		return res.status(200).json(task).end();
	} catch (error) {
		console.log(error);
		return res.sendStatus(400);
	}
};
