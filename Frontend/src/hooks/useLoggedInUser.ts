import { useEffect } from "react";
import { TokenService } from "../service/tokenService";
import { UserService } from "../service/userService";
import { jwtDecode } from "jwt-decode";
import { refreshToken } from "../requests/tokenRequest";

const useLoggedInUser = () => {
  useEffect(() => {
    (async () => {
      const token = TokenService.getToken();
      if (token) {
        const currentTime = Math.floor(Date.now() / 1000);
        const decodedToken = jwtDecode(token);

        if (decodedToken.exp && decodedToken.exp > currentTime) {
          const user = decodedToken.user;
          if (user) {
            UserService.addUser(user);
          }
        } else {
          const rToken = TokenService.getRefreshToken();
          if (rToken) {
            const user = await UserService.getUser();
            if (user) {
              try {
                const newTokenResponse = await refreshToken(rToken, user._id);

                if (newTokenResponse.status == 200) {
					console.log(`Old  token ${token}`);
					console.log(`New  token ${newTokenResponse.data.token}`);
					const newToken = newTokenResponse.data.token;
                  const newRefreshToken = newTokenResponse.data.newRefreshToken;
                  const decodedNewToken = jwtDecode(newToken);
                  const newUser = decodedNewToken.user;
                  if (newUser) {
                    UserService.addUser(newUser);
                    TokenService.addToken(newToken);
                    TokenService.addRefreshToken(newRefreshToken);
                  }
                } 
              } catch {
                TokenService.removeAllTokens();
                UserService.removeUser();
              }
            }
          } else {
            TokenService.removeAllTokens();
            UserService.removeUser();
          }
        }
      }
    })();
  }, []);
};

export default useLoggedInUser;
