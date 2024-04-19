import { User } from '../../types/userType';
import { UserService } from '../../service/userService';
import { useState, useEffect } from 'react';
export default function SetUserTaskForm() {
	const [users, setUsers] = useState<User[] | null>(null);
	const [userId, setUserId] = useState<number>(-1);
	useEffect(() => {
		(async () => {
			const data = UserService.getAllUsers();
			setUsers(data);
		})();
	}, []);
	const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		if (!(e.target.value == '-1')) {
			setUserId(parseInt(e.target.value));
		}
	};
	return (
		<div className='background-form w-screen h-full fixed top-0 left-0'>
			<div className=' flex h-full w-11/12 items-center mx-auto '>
				<div className='bg-white rounded mx-auto '>
					<form>
						<div>
							<label htmlFor='userId'>Users:</label>
							<select id='userId' value={userId} onChange={handleUserChange}>
								<option key={'-1'} value={'-1'}>
									---
								</option>
								{users?.map((user) => (
									<option key={user.id} value={user.id}>
										{user.firstName} {user.lastName}
									</option>
								))}
							</select>
							<button
								type='submit'
								className='my-1 ml-auto flex-no-shrink shadow bg-white py-2 px-4 border-2 rounded text-teal  '
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
