import { useState, useEffect } from 'react';
import { TokenService } from '../service/tokenService';
import { UserService } from '../service/userService';
interface UserData {
	userid?: string;
}
const useLoggedInUser = () => {
	const [loggedInUser, setLoggedInUser] = useState<UserData | null>(null);

	useEffect(() => {
		const token = TokenService.getToken();
		if (token) {
			const user = UserService.getUser();
			if (user && user._id) {
				setLoggedInUser({ userid: user._id });
			}
		}
	}, []);
	return loggedInUser;
};

export default useLoggedInUser;
