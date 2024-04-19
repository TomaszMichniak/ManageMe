import { Link } from 'react-router-dom';
export default function Header() {
	return (
		<header className='w-full text-white sticky top-0 flex justify-center items-center text-center h-24 bg-blue-500 text-xl'>
			<Link to={`/`}>ManageMe</Link>
		</header>
	);
}
