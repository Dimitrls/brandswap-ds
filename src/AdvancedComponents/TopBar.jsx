import React from 'react';
import PropTypes from 'prop-types';
import styles from './TopBar.module.css';

const TopBar = ({ leftContent, centerContent, rightContent, className, ...props }) => {
  return (
    <div className={[styles.topBar, className].filter(Boolean).join(' ')} {...props}>
      {leftContent && <div className={styles.topBar__left}>{leftContent}</div>}
      {centerContent && <div className={styles.topBar__center}>{centerContent}</div>}
      {rightContent && <div className={styles.topBar__right}>{rightContent}</div>}
    </div>
  );
};

TopBar.propTypes = {
  leftContent: PropTypes.node,
  centerContent: PropTypes.node,
  rightContent: PropTypes.node,
  className: PropTypes.string,
};

export default TopBar;

