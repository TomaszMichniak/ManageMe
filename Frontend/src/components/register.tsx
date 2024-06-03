import { useState } from 'react';
import { User } from '../types/userType';
import { FormEvent } from 'react';
import { Role } from '../types/enums/roleEnum';
import { useNavigate } from 'react-router-dom';
import { register } from '../requests/userRequset';
export default function Register() {
	const [correctData, setCorrectData] = useState(false);
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		login: '',
		password: '',
		firstName: '',
		lastName: '',
		role: Role.developer,
	});
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};
	const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (
			formData.login != '' &&
			formData.password != '' &&
			formData.lastName &&
			formData.firstName
		) {
			let user: User = {
				_id: '',
				login: formData.login,
				password: formData.password,
				firstName: formData.firstName,
				lastName: formData.lastName,
				role: formData.role,
			};
			register(user);
			navigate('/login');
		} else {
			setCorrectData(true);
		}
	};
	const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedRole = e.target.value as unknown as Role;
		if (Object.values(Role).includes(selectedRole)) {
			setFormData({ ...formData, role: selectedRole });
		}
	};
	return (
		<div className='flex justify-center items-center  mt-40'>
			<div className='max-w-screen-sm mx-2 rounded-xl w-full px-2 py-5 bg-white text-center'>
				<p className='text-3xl mb-5'>Sing up</p>
				{correctData && (
					<p className='text-red-500' id=''>
						Incorrect data
					</p>
				)}
				<form onSubmit={handleRegister} className='p-2 text-left'>
					<input
						type='text'
						name='login'
						value={formData.login}
						onChange={handleInputChange}
						className='my-1 bg-gray-100 shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker'
						placeholder='Login'
					/>
					<input
						type='text'
						name='firstName'
						value={formData.firstName}
						onChange={handleInputChange}
						className='my-1 bg-gray-100 shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker'
						placeholder='First name'
					/>
					<input
						type='text'
						name='lastName'
						value={formData.lastName}
						onChange={handleInputChange}
						className='my-1 bg-gray-100 shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker'
						placeholder='Last name'
					/>
					<input
						type='password'
						name='password'
						value={formData.password}
						onChange={handleInputChange}
						className='my-1 bg-gray-100 shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker'
						placeholder='Password'
					/>{' '}
					<input
						type='password'
						name='confirmPassword'
						//	onChange={handleInputChange}
						className='my-1 bg-gray-100 shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker'
						placeholder='Confirm password'
					/>
					<label className='ml-2'>Role:</label>
					<select
						className='my-1 shadow bg-white border rounded-lg w-full py-2 px-3 mr-4'
						id='status'
						value={formData.role}
						onChange={handleRoleChange}
					>
						{Object.values(Role).map((role) => (
							<option key={role} value={role}>
								{role}
							</option>
						))}
					</select>
					<button className='w-full mt-5 bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold text-xl p-3'>
						Sign up
					</button>
				</form>
			</div>
		</div>
	);
}
