import express from 'express';
import jwt from 'jsonwebtoken';
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

dotenv.config();
const app = express();
const port = 3001;
const tokenSecret = 'sekretny_klucz';
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

app.post('/token', function (req, res) {
	const expTime = req.body.exp || 60;
	const userid = req.body.user;
	const token = generateToken(+expTime, userid);
	refreshToken = generateToken(60 * 60, userid);
	res.status(200).send({ token, refreshToken });
});
app.post('/refreshToken', function (req, res) {
	const refreshTokenFromPost = req.body.refreshToken;
	if (refreshToken !== refreshTokenFromPost) {
		res.status(400).send('Bad refresh token!');
	}
	const expTime = req.headers.exp || 60;
	const userid = req.body.user;
	const token = generateToken(+expTime, userid);
	refreshToken = generateToken(60 * 60, userid);
	setTimeout(() => {
		res.status(200).send({ token, refreshToken });
	}, 3000);
});
app.get('/protected/:id/:delay?', verifyToken, (req, res) => {
	const id = req.params.id;
	const delay = req.params.delay ? +req.params.delay : 1000;
	setTimeout(() => {
		res.status(200).send(`{"message": "protected endpoint ${id}"}`);
	}, delay);
});
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

function generateToken(expirationInSeconds: number, userid: number) {
	const exp = Math.floor(Date.now() / 1000) + expirationInSeconds;
	const token = jwt.sign({ exp, userid }, tokenSecret, {
		algorithm: 'HS256',
	});
	return token;
}

function verifyToken(req: any, res: any, next: any) {
	const authHeader = req.headers['authorization'];
	const token = authHeader?.split(' ')[1];

	if (!token) return res.sendStatus(403);

	jwt.verify(token, tokenSecret, (err: any) => {
		if (err) {
			console.log(err);
			return res.status(401).send(err.message);
		}
		next();
	});
}
mongoose.Promise = Promise;
mongoose
	.connect(
		'mongodb+srv://admin:admin@manageme.kitixqj.mongodb.net/?retryWrites=true&w=majority&appName=ManageMe'
	)
	.then(() => console.log('Database connected.'))
	.catch((error) => console.log('Database not connected.', error));
