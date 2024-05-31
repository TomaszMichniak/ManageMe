import { useEffect, useState } from 'react';
import { notificationService } from '../service/notificationService';
export default function UnreadCount() {
  const [unreadCount, setUnreadCount] = useState<number>(0);

  useEffect(() => {
    const subscription = notificationService.unreadCount().subscribe(setUnreadCount);
    return () => subscription.unsubscribe();
  }, []);

  return <p className='bg-red-500 text-sm text-white rounded p-1 font-sans '>{unreadCount}</p>;
};

