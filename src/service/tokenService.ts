import { ApiService } from '../service/apiService';

const apiToken = new ApiService('token');
const apiRefreshToken = new ApiService('refreshToken');
export class TokenService {
	static addToken(token: string) {
		if (apiToken.getAll().length >= 1) {
			apiToken.clear();
		}
		apiToken.add(token);
	}
	static addRefreshToken(token: string) {
		if (apiRefreshToken.getAll().length >= 1) {
			apiRefreshToken.clear();
		}
		apiRefreshToken.add(token);
	}
	static getToken(): string | null {
		const data: string[] = apiToken.getAll();
		const token: string = data[0];
		if (token == undefined) {
			return null;
		}
		return token;
	}
	static getRefreshToken(): any {
		return apiRefreshToken.getAll().shift();
	}
}
