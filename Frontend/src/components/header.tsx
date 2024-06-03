import { Link } from 'react-router-dom';
import { TokenService } from '../service/tokenService';
import useLoggedInUser from '../hooks/useLoggedInUser';
import UnreadCount from './unreadCount';
import NotificationList from './notificationList';
import { useState } from 'react';
export default function Header() {
	const [notification, setNotification] = useState<boolean>(false);
	const handleLogOut = () => {
		TokenService.removeAllTokens();
		location.reload();
	};
	const user = useLoggedInUser();
	return (
		<>
			<header className=' font-serif w-full text-white sticky top-0 flex items-center justify-center  h-20 bg-blue-600 text-xl px-4'>
				<div className='max-w-screen-xl w-full flex items-center '>
					<div className='w-full text-left'>
						<Link to={`/`} className=' font-bold text-3xl'>
							ManageMe
						</Link>
					</div>
					{user && (
						<div className='relative mx-2 top-1'>
							<button onClick={() => setNotification(!notification)}>
								<span>
									<img
										src='/icons/notificationIcon.svg'
										alt='notification'
										className='w-7 mx-2 md:w-9'
									/>
								</span>
								<span className='absolute rounded-full   z-10 -top-4 -right-1'>
									<UnreadCount></UnreadCount>
								</span>
							</button>
						</div>
					)}
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
							<img
								src='/icons/accountIcon.svg'
								alt='Account'
								className='w-7 mx-2 md:w-9'
							/>
							<p className=''></p>
							<button type='submit' onClick={handleLogOut}>
								<img
									src='/icons/logOutIcon.svg'
									alt='log Out'
									className='w-7 mx-2 md:w-9'
								/>
							</button>
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
