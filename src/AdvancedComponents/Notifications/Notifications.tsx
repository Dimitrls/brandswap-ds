import React, { useState, useRef, useEffect } from 'react';
import styles from './Notifications.module.css';
import { Icon } from '../../Icons/Icon';
import { Pagination } from '../../Navigation/Pagination';

export interface NotificationItem {
  id: string;
  message: string;
  timestamp?: string;
  read?: boolean;
}

export interface NotificationsProps extends React.HTMLAttributes<HTMLDivElement> {
  notifications?: NotificationItem[];
  itemsPerPage?: number;
}

export const Notifications = ({
  notifications = [],
  itemsPerPage = 5,
  ...props
}: NotificationsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setCurrentPage(1);
    }
  }, [isOpen]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const totalPages = Math.ceil(notifications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedNotifications = notifications.slice(startIndex, endIndex);

  return (
    <div className={styles.notifications} ref={dropdownRef} {...props}>
      <button
        type="button"
        className={styles.notifications__button}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notifications"
        aria-expanded={isOpen}
      >
        <Icon name="bell" size={20} />
        {unreadCount > 0 && (
          <span className={styles.notifications__badge}>{unreadCount}</span>
        )}
      </button>
      {isOpen && (
        <div className={styles.notifications__dropdown}>
          <div className={styles.notifications__list}>
            {notifications.length === 0 ? (
              <div className={styles.notifications__empty}>No notifications</div>
            ) : (
              paginatedNotifications.map(notification => (
                <div
                  key={notification.id}
                  className={[
                    styles.notifications__item,
                    !notification.read ? styles.notifications__itemUnread : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <div className={styles.notifications__itemContent}>
                    <p className={styles.notifications__itemMessage}>{notification.message}</p>
                    {notification.timestamp && (
                      <span className={styles.notifications__itemTimestamp}>
                        {notification.timestamp}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
          {notifications.length > 0 && totalPages > 1 && (
            <div className={styles.notifications__pagination}>
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
