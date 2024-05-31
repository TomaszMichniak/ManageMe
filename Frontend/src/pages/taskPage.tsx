import Container from '../components/container';
import Header from '../components/header';
import TaskList from '../components/taskList';
export default function StoryPage() {
	return (
		<div>
			<Header></Header>
			<Container>
				<TaskList></TaskList>
			</Container>
		</div>
	);
}
