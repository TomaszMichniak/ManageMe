import express from 'express';
import jwt from 'jsonwebtoken';

import {
	createUser,
	getUsers,
	getUserById,
	updateUserById,
	deleteUserById,
	isUserExist,
} from '../database/users';
const tokenSecret = 'sekretny_klucz';
let refresh: string;
export const register = async (req: express.Request, res: express.Response) => {
	try {
		const { login, password, role, firstName, lastName } = req.body.user;

		if (!login || !role || !password) return res.sendStatus(400);

		const user = await createUser({
			login,
			password,
			role,
			firstName,
			lastName,
		});

		return res.status(200).json(user).end();
	} catch (error) {
		console.log(error);
		return res.sendStatus(400);
	}
};
export const login = async (req: express.Request, res: express.Response) => {
	try {
		const { login, password } = req.params;
		if (!login || !password) return res.sendStatus(400);
		const user = await isUserExist(login, password);
		if (!user) return res.sendStatus(401);
		const token = generateToken(30, user);
		refresh = generateToken(60 * 60, user);
		return res.status(200).send({ token, refresh });
	} catch (error) {
		console.log(error);
		return res.sendStatus(400);
	}
};
export const refreshYourToken = async (
	req: express.Request,
	res: express.Response
) => {
	const refreshTokenFromPost = req.body.refreshToken;
	if (refresh != refreshTokenFromPost) {
		return res.status(401).send('Bad refresh token!');
	}
	const user = await getUserById(req.body.userId);
	const token = generateToken(30, user);
	const newRefreshToken = generateToken(60 * 60, user);
	refresh = newRefreshToken;
	setTimeout(() => {
		res.status(200).send({ token, newRefreshToken });
	}, 3000);
};
function generateToken(expirationInSeconds: number, user: any) {
	const exp = Math.floor(Date.now() / 1000) + expirationInSeconds;
	const token = jwt.sign({ exp, user: user }, tokenSecret, {
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

export const getAllUsers = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const users = await getUsers();
		return res.status(200).json(users);
	} catch (error) {
		console.log(error);
		return res.sendStatus(400);
	}
};

export const getUser = async (req: express.Request, res: express.Response) => {
	try {
		const { userId } = req.params;
		const user = await getUserById(userId);
		if (!user) return res.sendStatus(404);
		return res.status(200).json(user);
	} catch (error) {
		console.log(error);
		return res.sendStatus(400);
	}
};

export const updateUser = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { login, password, role, firstName, lastName } = req.body;
		const { id } = req.params;

		if (!login || !role || !password) return res.sendStatus(400);

		const user = await updateUserById(id, {
			login,
			password,
			role,
			firstName,
			lastName,
		});

		return res.status(200).json(user).end();
	} catch (error) {
		console.log(error);
		return res.sendStatus(400);
	}
};

export const deleteUser = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params;
		if (!id) return res.sendStatus(400);
		const user = await deleteUserById(id);
		if (!user) return res.sendStatus(404);
		const token = generateToken(60, user);
		return res.status(200).json(user).end();
	} catch (error) {
		console.log(error);
		return res.sendStatus(400);
	}
};
