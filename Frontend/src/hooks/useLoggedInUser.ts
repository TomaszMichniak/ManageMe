import { useState, useEffect } from 'react';
import { TokenService } from '../service/tokenService';
import { UserService } from '../service/userService';
import { jwtDecode } from 'jwt-decode';
import { refreshToken } from '../requests/tokenRequest';
interface UserData {
	userid?: string;
}
const useLoggedInUser = () => {
	const [loggedInUser, setLoggedInUser] = useState<UserData | null>(null);

	useEffect(() => {
		(async () => {
			const token = TokenService.getToken();
			if (token) {
				const currentTime = Math.floor(Date.now() / 1000);
				const decodatedToken = jwtDecode(token);
				if (decodatedToken.exp && decodatedToken.exp > currentTime) {
					const user = UserService.getUser();
					if (user) {
						setLoggedInUser({ userid: user._id });
					}
				} else {
					const rToken = await TokenService.getRefreshToken();
					if (!rToken) {
						TokenService.removeAllTokens();
					}
					const user = await UserService.getUser();
					if (!user) return;
					const newToken = await refreshToken(rToken, user._id);
					if (newToken) {
						console.log('Refresh Token');
						const decodatedToken = jwtDecode(newToken.data.token);
						const user = decodatedToken.user;
						if (!user) return;
						UserService.addUser(user);
						setLoggedInUser({ userid: user._id });
						TokenService.addToken(newToken?.data.token);
						TokenService.addRefreshToken(newToken?.data.newRefreshToken);
					} else {
						TokenService.removeAllTokens();
					}
				}
			}
		})();
	}, []);
	return loggedInUser;
};

export default useLoggedInUser;
