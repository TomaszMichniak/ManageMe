import { Link } from "react-router-dom";
import { TokenService } from "../service/tokenService";
import useLoggedInUser from "../hooks/useLoggedInUser";
import UnreadCount from "./unreadCount";
import NotificationList from "./notificationList";
import { useEffect, useState } from "react";
import { UserService } from "../service/userService";
import { User } from "../types/userType";
export default function Header() {
  const [notification, setNotification] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const userData = UserService.getUser();
    setUser(userData);
    
  }, []);
  const handleLogOut = () => {
    TokenService.removeAllTokens();
    UserService.removeUser();
    location.reload();
  };
  useLoggedInUser();
  return (
    <>
      <header className=" font-serif w-full text-white sticky top-0 flex items-center justify-center  h-20 bg-blue-600 text-xl px-4">
        <div className="max-w-screen-xl w-full flex items-center ">
          <div className="w-full text-left">
            <Link to={`/`} className=" font-bold text-3xl">
              ManageMe
            </Link>
          </div>
          {user ? (
            <>
              <div className="relative mx-2 top-1">
                <button onClick={() => setNotification(!notification)}>
                  <span>
                    <img
                      src="/icons/notificationIcon.svg"
                      alt="notification"
                      className="w-7 mx-2 md:w-9"
                    />
                  </span>
                  <span className="absolute rounded-full z-10 -top-4 -right-1">
                    <UnreadCount />
                  </span>
                </button>
              </div>
              <div className="flex">
                <img
                  src="/icons/accountIcon.svg"
                  alt="Account"
                  className="w-7 mx-2 md:w-9"
                />
                <p className=""></p>
                <button type="submit" onClick={handleLogOut}>
                  <img
                    src="/icons/logOutIcon.svg"
                    alt="log Out"
                    className="w-7 mx-2 md:w-9"
                  />
                </button>
              </div>
            </>
          ) : (
            <div className="flex">
              <Link to={`/login`} className="mx-1">
                Sign in
              </Link>
              <Link to={`/register`} className="mx-1">
                Sign up
              </Link>
            </div>
          )}
        </div>
      </header>
      {notification && (
        <div>
          <NotificationList></NotificationList>
        </div>
      )}
    </>
  );
}
