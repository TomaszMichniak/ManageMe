import './App.css';
import { Routes, Route } from 'react-router-dom';
import StoryPage from './pages/storyPage';
import ProjectPage from './pages/projectPage';
import TaskPage from './pages/taskPage';
import LoginRegisterPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';

function App() {
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
