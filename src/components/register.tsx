export default function Register() {
  return (
    <div className="flex justify-center items-center  mt-40">
      <div className="max-w-screen-sm mx-2 rounded-xl w-full px-2 py-5 bg-white text-center">
        <p className="text-3xl mb-5">Sing up</p>
        <form className="p-2">
          <input
            type="text"
            name="Login"
            className="my-1 bg-gray-100 shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            placeholder="Login"
          />
          <input
            type="text"
            name="firstName"
            className="my-1 bg-gray-100 shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            placeholder="First name"
          />
          <input
            type="text"
            name="lastName"
            className="my-1 bg-gray-100 shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            placeholder="Last name"
          />
          <input
            type="password"
            name="Password"
            className="my-1 bg-gray-100 shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            placeholder="Password"
          />{" "}
          <input
            type="password"
            name="Password"
            className="my-1 bg-gray-100 shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            placeholder="Confirm password"
          />
          <button className="w-full mt-5 bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold text-xl p-3">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}
