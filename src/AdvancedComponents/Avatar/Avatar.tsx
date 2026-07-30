import React, { useState, useRef, useEffect } from 'react';
import styles from './Avatar.module.css';

export interface AvatarUser {
  name: string;
  email: string;
  initials: string;
}

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  user?: AvatarUser;
  onProfileClick?: () => void;
  onLogoutClick?: () => void;
}

export const Avatar = ({
  user,
  onProfileClick,
  onLogoutClick,
  ...props
}: AvatarProps) => {
  const [isOpen, setIsOpen] = useState(false);
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

  const handleProfileClick = () => {
    onProfileClick?.();
    setIsOpen(false);
  };

  const handleLogoutClick = () => {
    onLogoutClick?.();
    setIsOpen(false);
  };

  return (
    <div className={styles.avatar} ref={dropdownRef} {...props}>
      <button
        type="button"
        className={styles.avatar__button}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="User menu"
        aria-expanded={isOpen}
      >
        <div className={styles.avatar__initials}>
          {user?.initials || 'U'}
        </div>
      </button>
      {isOpen && (
        <div className={styles.avatar__dropdown}>
          <div className={styles.avatar__userInfo}>
            <div className={styles.avatar__initials}>
              {user?.initials || 'U'}
            </div>
            <div>
              <div className={styles.avatar__userName}>{user?.name || 'User'}</div>
              <div className={styles.avatar__userEmail}>{user?.email || ''}</div>
            </div>
          </div>
          <div className={styles.avatar__menu}>
            <button
              type="button"
              className={styles.avatar__menuItem}
              onClick={handleProfileClick}
            >
              Profile
            </button>
            <button
              type="button"
              className={styles.avatar__menuItem}
              onClick={handleLogoutClick}
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
