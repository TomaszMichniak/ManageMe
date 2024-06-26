import { User } from '../../types/userType';
import { useState, useEffect } from 'react';
import { FormEvent } from 'react';
import { Role } from '../../types/enums/roleEnum';
import { getAllUsers } from '../../requests/userRequset';
interface Props {
	setUser: (userId: string) => void;
	handleCloseMenu: () => void;
}
export default function SetUserTaskForm({ setUser, handleCloseMenu }: Props) {
	const [users, setUsers] = useState<User[] | null>(null);
	const [userId, setUserId] = useState<string>();
	useEffect(() => {
		(async () => {
			let data = await getAllUsers();
			data = data.filter(
				(item: User) => item.role == Role.developer || item.role == Role.devops
			);
			setUsers(data);
		})();
	}, []);
	const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		if (!(e.target.value == '')) {
			setUserId(e.target.value);
		}
	};
	const handleSetUser = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (userId != '' && userId != undefined) setUser(userId);
	};
	return (
		<div className='background-form w-screen h-full fixed top-0 left-0'>
			<div className=' flex h-full w-11/12  items-center mx-auto '>
				<div className='bg-white dark:bg-gray-500 dark:text-black rounded-xl mx-auto '>
					<div className='flex justify-center'>
						<p className='mx-auto my-auto  text-xl'>Set user to task</p>
						<button onClick={handleCloseMenu} className=''>
							<img src='/icons/closeIcon.svg' alt='Close' className='w-9' />
						</button>
					</div>
					<form onSubmit={handleSetUser}>
						<div className='p-5'>
							<label htmlFor='userId'>Users:</label>
							<select
								id='userId'
								className='my-1 shadow bg-white border rounded-lg w-full py-2 px-3 mr-4 '
								value={userId}
								onChange={handleUserChange}
							>
								<option key={'-1'} value={'-1'}>
									---
								</option>
								{users?.map((user) => (
									<option key={user._id} value={user._id}>
										{user.firstName} {user.lastName}
									</option>
								))}
							</select>
							<button
								type='submit'
								className='mt-2 w-full bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold py-2 px-4 rounded  '
							>
								Save
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
