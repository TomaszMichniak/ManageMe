import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header className=" font-serif w-full text-white sticky top-0 flex items-center justify-center  h-24 bg-blue-500 text-xl px-4">
      <div className="max-w-screen-xl w-full flex items-center ">
        <div className="w-full text-center">
          <Link to={`/`} className="text-center font-bold text-3xl">
            ManageMe
          </Link>
        </div>
        <div className="">
          <Link to={`/login`} className="">
            Sign in
          </Link>
        </div>
        <div className="">
          <Link to={`/register`} className="m-1">
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}
