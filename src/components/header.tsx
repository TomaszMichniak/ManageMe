import { Link } from 'react-router-dom';
import { TokenService } from '../service/tokenService';
import { UserService } from '../service/userService';
import useLoggedInUser from '../hooks/useLoggedInUser';
export default function Header() {
	const handleLogOut = () => {
		TokenService.removeAllTokens();
		location.reload();
	};
	const user = useLoggedInUser();
	let userData;
	if (user?.userid) {
		userData = UserService.getUserById(user.userid);
	}
	return (
		<header className=' font-serif w-full text-white sticky top-0 flex items-center justify-center  h-20 bg-blue-600 text-xl px-4'>
			<div className='max-w-screen-xl w-full flex items-center '>
				<div className='w-full text-center'>
					<Link to={`/`} className='text-center font-bold text-3xl'>
						ManageMe
					</Link>
				</div>

				{!user && (
					<div className=''>
						<Link to={`/login`} className=''>
							Sign in
						</Link>
					</div>
				)}
				{!user && (
					<div className=''>
						<Link to={`/register`} className='m-1'>
							Sign up
						</Link>
					</div>
				)}
				{user && (
					<div className='flex'>
						<p className=''>Hello {userData?.firstName}</p>
						<button type='submit' onClick={handleLogOut}>
							Log out
						</button>
					</div>
				)}
			</div>
		</header>
	);
}
