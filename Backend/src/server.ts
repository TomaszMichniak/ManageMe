import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {
	addProject,
	deleteProject,
	getAllProjects,
	getProject,
	updateProject,
} from './controllers/projectController';
import {
	addStory,
	deleteStory,
	getAllStories,
	getStoriesByProject,
	getStory,
	updateStory,
} from './controllers/storyController';
import {
	getAllUsers,
	getUser,
	login,
	register,
} from './controllers/userController';
import {
	addTask,
	deleteTask,
	getAllTasksByStoryId,
	getTask,
	updateTask,
} from './controllers/taskController';
import { getAllStoryTasks } from 'database/task';

dotenv.config();
const app = express();
const port = 3001;
let refreshToken: string;

app.use(
	cors({
		origin: 'http://localhost:5173',
	})
);
app.use(express.json());
app.get('/', (req, res) => {
	res.send('Hello World - simple api with JWT!');
});
//Projects
app.get('/projects', async (req, res) => {
	return getAllProjects(req, res);
});
app.get('/project/:id', async (req, res) => {
	return getProject(req, res);
});
app.post('/projects', async (req, res) => {
	return addProject(req, res);
});
app.delete('/projects/:id', async (req, res) => {
	return deleteProject(req, res);
});
app.put('/projects/:id', async (req, res) => {
	return updateProject(req, res);
});
//Stories
app.get('/stories', async (req, res) => {
	return getAllStories(req, res);
});
app.get('/story/:id', async (req, res) => {
	return getStory(req, res);
});
app.post('/stories', async (req, res) => {
	return addStory(req, res);
});
app.delete('/stories/:id', async (req, res) => {
	return deleteStory(req, res);
});
app.put('/stories/:id', async (req, res) => {
	return updateStory(req, res);
});
app.get('/stories/:id', async (req, res) => {
	return getStoriesByProject(req, res);
});
//User
app.post('/register', async (req, res) => {
	return register(req, res);
});
app.get('/login/:login/:password', async (req, res) => {
	return login(req, res);
});
app.get('/user/:userId', async (req, res) => {
	return getUser(req, res);
});
app.get('/users', async (req, res) => {
	return getAllUsers(req, res);
});
//Task
//
app.get('/tasks/:storyId', async (req, res) => {
	return getAllTasksByStoryId(req, res);
});
app.get('/tasks/:id', async (req, res) => {
	return getTask(req, res);
});
app.post('/tasks', async (req, res) => {
	return addTask(req, res);
});
app.delete('/tasks/:id', async (req, res) => {
	return deleteTask(req, res);
});
app.put('/tasks/:id', async (req, res) => {
	return updateTask(req, res);
});

// app.post('/token', function (req, res) {
// 	const expTime = req.body.exp || 60;
// 	const userid = req.body.user;
// 	const token = generateToken(+expTime, userid);
// 	refreshToken = generateToken(60 * 60, userid);
// 	res.status(200).send({ token, refreshToken });
// });
// app.post('/refreshToken', function (req, res) {
// 	const refreshTokenFromPost = req.body.refreshToken;
// 	if (refreshToken !== refreshTokenFromPost) {
// 		res.status(400).send('Bad refresh token!');
// 	}
// 	const expTime = req.headers.exp || 60;
// 	const userid = req.body.user;
// 	const token = generateToken(+expTime, userid);
// 	refreshToken = generateToken(60 * 60, userid);
// 	setTimeout(() => {
// 		res.status(200).send({ token, refreshToken });
// 	}, 3000);
// });
// app.get('/protected/:id/:delay?', verifyToken, (req, res) => {
// 	const id = req.params.id;
// 	const delay = req.params.delay ? +req.params.delay : 1000;
// 	setTimeout(() => {
// 		res.status(200).send(`{"message": "protected endpoint ${id}"}`);
// 	}, delay);
// });
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

mongoose.Promise = Promise;
mongoose
	.connect(
		'mongodb+srv://admin:admin@manageme.kitixqj.mongodb.net/?retryWrites=true&w=majority&appName=ManageMe'
	)
	.then(() => console.log('Database connected.'))
	.catch((error) => console.log('Database not connected.', error));
