import { useEffect, useState } from "react";
import { notificationService } from "../service/notificationService";
import { NotificationType } from "../types/notificationType";

export default function NotificationList() {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const handleRead = (notification: NotificationType) => {
    notificationService.markAsRead(notification);
  };
  useEffect(() => {
    const subscription = notificationService
      .list()
      .subscribe((notifications) => {
        const sortedNotifications = [...notifications].sort((a, b) =>
          b.date.localeCompare(a.date)
        );
        setNotifications(sortedNotifications);
      });
    return () => subscription.unsubscribe();
  }, []);
  return (
    <div className="mx-auto max-w-screen-xl w-full">
      {notifications.length != 0 && (
        <div className="relative  justify-end flex mr-5  ">
          <div className="fixed max-h-80 overflow-auto border-t-4  border-sky-400 bg-blue-100 rounded-b-xl text-teal-900 px-7  shadow-md">
            <div>
              {notifications.map((notification, index) => (
                <button
                  onClick={() => handleRead(notification)}
                  key={index} 
                  className="relative w-full opacity-70 hover:opacity-100 py-2 block border-b-2 border-sky-400 text-left"
                >
                  {!notification.read && (
                    <p className="absolute top-1 text-red-600 text-sm font-bold">NEW</p>
                  )}
                  <p className=" text-right  text-sm">{notification.date}</p>
                  <p className=" font-bold  ">{notification.title}</p>
                  <p className="text-md">{notification.message}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
