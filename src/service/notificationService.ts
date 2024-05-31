import { BehaviorSubject, Observable } from "rxjs";
import { NotificationType } from "../types/notificationType";
import { Priority } from "../types/enums/priorityEnum";
import moment from "moment";
class NotificationService {
  private notifications: NotificationType[] = [];
  private notificationsSubject: BehaviorSubject<NotificationType[]> =
    new BehaviorSubject<NotificationType[]>([]);
  private unreadCountSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);

  send(notification: NotificationType): void {
    this.notifications.push(notification);
    this.notificationsSubject.next(this.notifications);
    this.updateUnreadCount();
  }

  list(): Observable<NotificationType[]> {
    return this.notificationsSubject.asObservable();
  }

  unreadCount(): Observable<number> {
    return this.unreadCountSubject.asObservable();
  }

  private updateUnreadCount(): void {
    const unreadCount = this.notifications.filter(
      (notification) => !notification.read
    ).length;
    this.unreadCountSubject.next(unreadCount);
  }
  createNotification(
    title: string,
    message: string,
    priority: Priority
  ): NotificationType {
    const newNotification: NotificationType = {
      id: Math.floor(Date.now() / 100),
      title: title,
      message: message,
      date: moment().format("DD-MM-YYYY HH:mm:ss"),
      priority: priority,
      read: false,
    };
    return newNotification;
  }
  markAsRead(notification: NotificationType): void {
    const index = this.notifications.findIndex((x) => x.id == notification.id);
    if (index !== -1) {
      this.notifications[index].read = true;
      this.notificationsSubject.next(this.notifications);
      this.updateUnreadCount();
    }
  }
}

export const notificationService = new NotificationService();
