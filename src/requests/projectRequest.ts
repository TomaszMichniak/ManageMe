export async function getProjects() {
	const data = JSON.parse(localStorage.getItem('projects') || '[]');
	return data;
}
