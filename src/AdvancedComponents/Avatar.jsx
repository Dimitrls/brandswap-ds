import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Avatar.module.css';
import Icon from '../Icons/Icon';

const Avatar = ({ user, onProfileClick, onLogoutClick }) => {
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

  const handleProfileClick = () => {
    if (onProfileClick) {
      onProfileClick();
    }
    setIsOpen(false);
  };

  const handleLogoutClick = () => {
    if (onLogoutClick) {
      onLogoutClick();
    }
    setIsOpen(false);
  };

  return (
    <div className={styles.avatar} ref={dropdownRef}>
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
        <Icon name="chevron-down" size={16} />
      </button>
      {isOpen && (
        <div className={styles.avatar__dropdown}>
          <div className={styles.avatar__userInfo}>
            <div className={styles.avatar__userName}>{user?.name || 'User'}</div>
            <div className={styles.avatar__userEmail}>{user?.email || ''}</div>
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

Avatar.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    initials: PropTypes.string.isRequired,
  }),
  onProfileClick: PropTypes.func,
  onLogoutClick: PropTypes.func,
};

export default Avatar;

