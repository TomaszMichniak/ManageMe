import Container from '../components/container';
import Header from '../components/header';
import StoryList from '../components/storyList';
export default function StoryPage() {
	return (
		<div>
			<Header></Header>
			<Container>
				<StoryList></StoryList>
			</Container>
		</div>
	);
}
