import './App.css';
import { Routes, Route } from 'react-router-dom';
import ProjectPage from './pages/projectPage';
function App() {
	return (
		<Routes>
			<Route path='/' element={<ProjectPage />} />
			<Route path='*' element={<div>404 Not Found</div>}></Route>
		</Routes>
	);
}

export default App;
