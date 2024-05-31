import './App.css';
import { Routes, Route } from 'react-router-dom';
import StoryPage from './pages/storyPage';
import ProjectPage from './pages/projectPage';
import TaskPage from './pages/taskPage';
import { UserService } from './service/userService';
import { User } from './types/userType';
import { Role } from './types/enums/roleEnum';
import LoginRegisterPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';

function App() {
	if (UserService.getAllUsers().length <= 0) {
		const newUser: User = {
			id: 1,
			login: 'admin',
			password: 'admin',
			firstName: 'Adam',
			lastName: 'Nowak',
			role: Role.admin,
		};
		const newUser2: User = {
			id: 2,
			login: 'devops',
			password: 'devops',
			firstName: 'Damian',
			lastName: 'Nowak',
			role: Role.devops,
		};
		const newUser3: User = {
			id: 3,
			login: 'developer',
			password: 'developer',
			firstName: 'Filp',
			lastName: 'Nowak',
			role: Role.developer,
		};
		UserService.addUser(newUser);
		UserService.addUser(newUser2);
		UserService.addUser(newUser3);
	}
	// if (TaskService.getAllTasks().length <= 0) {
	// 	const newTask: Task = {
	// 		id: 1,
	// 		description: 'todo',
	// 		priority: Priority.low,
	// 		storyId: 1,
	// 		status: Status.todo,
	// 		addDate: '2024-04-18',
	// 	};
	// 	const newTask2: Task = {
	// 		id: 2,
	// 		description: 'doing',
	// 		priority: Priority.medium,
	// 		storyId: 1,
	// 		status: Status.doing,
	// 		addDate: '2024-04-18',
	// 	};
	// 	const newTask3: Task = {
	// 		id: 3,
	// 		description: 'done',
	// 		priority: Priority.high,
	// 		storyId: 1,
	// 		status: Status.done,
	// 		addDate: '2024-04-18',
	// 	};
	// 	TaskService.addTask(newTask);
	// 	TaskService.addTask(newTask2);
	// 	TaskService.addTask(newTask3);
	//}
	return (
		<Routes>
			<Route path='/' element={<ProjectPage />} />
			<Route path='/project/:projectId'>
				<Route path='' element={<StoryPage />} />
				<Route path='story/:storyId' element={<TaskPage />} />
			</Route>
			<Route path='/login' element={<LoginRegisterPage />} />
			<Route path='/register' element={<RegisterPage />} />
			<Route path='*' element={<div>404 Not Found</div>}></Route>
		</Routes>
	);
}

export default App;
