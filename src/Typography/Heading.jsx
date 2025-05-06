import React from 'react';
import PropTypes from 'prop-types';
import styles from './Heading.module.css';

const Heading = ({ level = 1, children, ...props }) => {
  const Tag = `h${level}`;
  return <Tag className={styles[`h${level}`]} {...props}>{children}</Tag>;
};

Heading.propTypes = {
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  children: PropTypes.node.isRequired,
};

export default Heading; 