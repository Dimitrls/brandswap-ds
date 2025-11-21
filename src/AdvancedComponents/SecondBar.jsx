import React from 'react';
import PropTypes from 'prop-types';
import styles from './SecondBar.module.css';

const SecondBar = ({ children, className, ...props }) => {
  return (
    <div className={[styles.secondBar, className].filter(Boolean).join(' ')} {...props}>
      {children}
    </div>
  );
};

SecondBar.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default SecondBar;

