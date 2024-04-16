import './App.css';
import { Routes, Route } from 'react-router-dom';
import StoryPage from './pages/storyPage';
import ProjectPage from './pages/projectPage';
// import { Story } from './types/storyType';
// import { Priority } from './types/enums/priorityStatus';
// import { Project } from './types/projectType';
// import { Status } from './types/enums/statusEnum';
// import { ProjectService } from './service/projectService';
// import { StoryService } from './service/storyService';
function App() {
	// let project: Project = {
	// 	id: 1,
	// 	name: 'projekt 1',
	// 	description: 'opis',
	// };
	// let story: Story = {
	// 	id: 1,
	// 	name: 'story',
	// 	description: 'opis',
	// 	priority: Priority.low,
	// 	project: project,
	// 	createDate: Date.now().toLocaleString(),
	// 	status: Status.doing,
	// 	owner: 1,
	// };
	// ProjectService.addProject(project);
	// StoryService.addStory(story);
	return (
		<Routes>
			<Route path='/' element={<ProjectPage />} />
			<Route path='/project/:projectId' element={<StoryPage />} />
			<Route path='*' element={<div>404 Not Found</div>}></Route>
		</Routes>
	);
}

export default App;
