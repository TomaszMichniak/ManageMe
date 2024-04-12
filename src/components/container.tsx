export default function Container({ children }: { children: React.ReactNode }) {
	return (
		<div className=' mx-auto max-w-screen-xl mt-5  bg-teal-lightest font-sans'>
			{children}
		</div>
	);
}
