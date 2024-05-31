import { useEffect, useState } from "react";
import { notificationService } from "../service/notificationService";
import { Priority } from "../types/enums/priorityEnum";
import { NotificationType } from "../types/notificationType";

export default function NotificationDialog() {
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );

  useEffect(() => {
    const subscription = notificationService
      .list()
      .subscribe((notifications) => {
        const latestNotification = notifications[notifications.length - 1];
        if (
          latestNotification &&
          (latestNotification.priority == Priority.medium ||
            latestNotification.priority == Priority.high) &&
          !latestNotification.read
        ) {
          setNotification(latestNotification);
        }
      });
    return () => subscription.unsubscribe();
  }, []);
  const handleCloseNotification = () => {
    notificationService.markAsRead(notification!);
    setNotification(null);
  };
  if (!notification) return null;

  return (
    <div className=" flex justify-end">
      <div className="mx-1 text-right w-72 p-2 fixed top-1 z-20 border-2 rounded border-red-600 bg-red-400 ">
        <button
          onClick={() => handleCloseNotification()}
          className="w-full py-2 block  text-left"
        >
          <p className=" text-right  text-sm">{notification.date}</p>
          <p className=" font-bold  ">{notification.title}</p>
          <p className="text-md">{notification.message}</p>
        </button>
      </div>
    </div>
  );
}
