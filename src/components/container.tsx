import NotificationDialog from "./notificationDialog";

export default function Container({ children }: { children: React.ReactNode }) {
	return (
		<div className=' font-serif mx-auto max-w-screen-xl mt-5  bg-teal-lightest font-sans'>
			<NotificationDialog></NotificationDialog>
			{children}
		</div>
	);
}
