import express from 'express';
import {
	createStory,
	getStories,
	getStoryById,
	updateStoryById,
	deleteStoryById,
	getStoriesByProjectId,
} from '../database/story';

export const addStory = async (req: express.Request, res: express.Response) => {
	try {
		const { name, description, priority, project, createDate, status, userId } =
			req.body.story;

		if (!name || !priority || !status || !project || !userId)
			return res.sendStatus(400);

		const story = await createStory({
			name,
			description,
			priority,
			project,
			createDate: createDate || new Date().toISOString(),
			status,
			userId,
		});

		return res.status(200).json(story).end();
	} catch (error) {
		console.log(error);
		return res.sendStatus(400);
	}
};

export const getAllStories = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const stories = await getStories();
		return res.status(200).json(stories);
	} catch (error) {
		console.log(error);
		return res.sendStatus(400);
	}
};

export const getStory = async (req: express.Request, res: express.Response) => {
	try {
		const { id } = req.params;
		const story = await getStoryById(id);
		if (!story) return res.sendStatus(404);
		return res.status(200).json(story);
	} catch (error) {
		console.log(error);
		return res.sendStatus(400);
	}
};

export const updateStory = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { name, description, priority, project, createDate, status, userId } =
			req.body;
		const { id } = req.params;

		if (!name || !priority || !status || !project || !userId)
			return res.sendStatus(400);

		const story = await updateStoryById(id, {
			name,
			description,
			priority,
			project,
			createDate,
			status,
			userId,
		});

		return res.status(200).json(story).end();
	} catch (error) {
		console.log(error);
		return res.sendStatus(400);
	}
};

export const deleteStory = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params;
		if (!id) return res.sendStatus(400);
		const story = await deleteStoryById(id);
		if (!story) return res.sendStatus(404);
		return res.status(200).json(story).end();
	} catch (error) {
		console.log(error);
		return res.sendStatus(400);
	}
};

export const getStoriesByProject = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params;
		const stories = await getStoriesByProjectId(id);
		return res.status(200).json(stories);
	} catch (error) {
		console.log(error);
		return res.sendStatus(400);
	}
};
