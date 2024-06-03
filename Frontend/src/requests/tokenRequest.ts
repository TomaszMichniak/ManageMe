import axios from 'axios';
export async function getToken(user: any) {
	return await axios.post('http://localhost:3001/token', { user });
}
export async function verifyToken(token: string) {
	return await axios.get(`http://localhost:3001/protected/123`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}
export async function refreshToken(refreshToken: string, userId: string) {
	return await axios.post('http://localhost:3001/refreshToken', {
		refreshToken,
		userId,
	});
}
