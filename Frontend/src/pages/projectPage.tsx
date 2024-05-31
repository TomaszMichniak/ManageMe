import Container from '../components/container';
import Header from '../components/header';
import ProjectList from '../components/projectList';
export default function ProjectPage() {
	return (
		<div>
			<Header></Header>
			<Container>
				<ProjectList></ProjectList>
			</Container>
		</div>
	);
}
