import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { TokenService } from "../service/tokenService";
interface UserData {
  userid?: number;
}
const useLoggedInUser = () => {
  const [loggedInUser, setLoggedInUser] = useState<UserData | null>(null);

  useEffect(() => {
    const token = TokenService.getToken();
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken && decodedToken.userid) {
        setLoggedInUser({ userid: decodedToken.userid });
      }
    }
  }, []);
  return loggedInUser;
};

export default useLoggedInUser;
