import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Notifications.module.css';
import Icon from '../Icons/Icon';

const Notifications = ({ notifications = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className={styles.notifications} ref={dropdownRef}>
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
          <div className={styles.notifications__header}>
            <h3 className={styles.notifications__title}>Notifications</h3>
          </div>
          <div className={styles.notifications__list}>
            {notifications.length === 0 ? (
              <div className={styles.notifications__empty}>No notifications</div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={[
                    styles.notifications__item,
                    !notification.read ? styles.notifications__itemUnread : ''
                  ].filter(Boolean).join(' ')}
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
        </div>
      )}
    </div>
  );
};

Notifications.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      timestamp: PropTypes.string,
      read: PropTypes.bool,
    })
  ),
};

export default Notifications;

