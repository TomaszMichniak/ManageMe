import { useLocation, useNavigate } from "react-router-dom";
import { TokenService } from "../service/tokenService";
import { UserService } from "../service/userService";
import { FormEvent } from "react";
import { useState } from "react";
import GoogleLogin from "react-google-login";
const clientId =
  "987993477496-ik6455eg6872p05up4ml0t3kmagr0ocp.apps.googleusercontent.com";
export default function Login() {
  const [login, setLogin] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState<string>("");
  const [correctData, setCorrectData] = useState(false);
  const from = location.state?.from?.pathname || "/";
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (login != "" && password != "") {
      let token = await UserService.login(login, password);
      if (!token) {
        setCorrectData(true);
        return;
      }
      TokenService.addToken(token?.data.token);
      TokenService.addRefreshToken(token?.data.refreshToken);
    }
    navigate(from, { replace: true });
  };
  const onSuccess = (res:any) => {
    console.log("Login Success: currentUser:",res);
  };

  const onFailure = (res:any) => {
    console.log("Login Failed:",res);
  };
  return (
    <div className="flex justify-center items-center  mt-40">
      <div className="max-w-screen-sm mx-2 rounded-xl w-full px-2 py-5 bg-white text-center">
        <p className="text-3xl mb-5">Sing In</p>
        {correctData && (
          <p className="text-red-500" id="">
            Incorrect data
          </p>
        )}
        <form onSubmit={handleLogin} className="p-2">
          <input
            type="text"
            name="Login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="my-1 bg-gray-100 shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            placeholder="Login"
          />
          <input
            type="password"
            name="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="my-1 bg-gray-100 shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            placeholder="Password"
          />
          <button
            type="submit"
            className="w-full mt-5 bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold text-xl p-3"
          >
            Sign In
          </button>
          <GoogleLogin
            className="w-full justify-center text-xl font-bold !py-1 my-2"
            clientId={clientId}
            buttonText="Login with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={"single_host_origin"}
          />
        </form>
      </div>
    </div>
  );
}
