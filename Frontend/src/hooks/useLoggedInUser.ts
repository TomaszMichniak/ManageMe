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
				console.log(decodatedToken.exp);
				console.log(currentTime);
				if (decodatedToken.exp && decodatedToken.exp > currentTime) {
					console.log('ss');
					const user = UserService.getUser();
					if (user) {
						setLoggedInUser({ userid: user._id });
					}
				} else {
					const rToken = await TokenService.getRefreshToken();
					if (!rToken) {
						console.log('brak tokenu');
						TokenService.removeAllTokens();
					}
					const user = UserService.getUser();
					if (!user) return;
					const newToken = await refreshToken(rToken, user._id);
					if (newToken) {
						console.log('nowy Token');
						const decodatedToken = jwtDecode(newToken.data.token);
						const user = decodatedToken.user;
						if (!user) return;
						UserService.addUser(user);
						setLoggedInUser({ userid: user._id });
						console.log(newToken?.data.refreshToken);
						TokenService.addToken(newToken?.data.token);
						TokenService.addRefreshToken(newToken?.data.newRefreshToken);
					} else {
						console.log('brak tokenu');
						TokenService.removeAllTokens();
					}
				}
			}
		})();
	}, []);
	return loggedInUser;
};

export default useLoggedInUser;
