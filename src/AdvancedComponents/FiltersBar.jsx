import React from 'react';
import PropTypes from 'prop-types';
import styles from './FiltersBar.module.css';

const FiltersBar = ({ children, className, ...props }) => {
  return (
    <div className={[styles.filtersBar, className].filter(Boolean).join(' ')} {...props}>
      {children}
    </div>
  );
};

FiltersBar.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default FiltersBar;

