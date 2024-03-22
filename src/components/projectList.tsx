import { useState, useEffect } from 'react';
import { Project } from '../types/projectType';
import { getProjects } from '../requests/projectRequest';

export default function ProjectList() {
	const [projects, setProjects] = useState<Project[] | null>(null);
	useEffect(() => {
		(async () => {
			const data = await getProjects();
			setProjects(data);
		})();
	}, []);
	const handleDelete = async (todoId: number) => {
		setProjects((prevState) => {
			return prevState?.filter((todo) => todoId !== todo.id) ?? [];
		});
	};
	return (
		<div>
			<div>
				{projects?.map((project) => (
					<div>
						id:{project.id}, nazwa:{project.name}, opis:{project.description}
						<button
							className='flex-no-shrink p-2 ml-4 mr-2 rounded-full bg-red-500'
							onClick={() => handleDelete(project.id)}
						>
							Usun
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
