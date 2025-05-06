import React from 'react';
import PropTypes from 'prop-types';
import styles from './BodyText.module.css';

const variantClass = {
  default: styles.body,
  large: styles.bodyLarge,
  small: styles.bodySmall,
  light: styles.bodyLight,
  largeLight: styles.bodyLargeLight,
  smallLight: styles.bodySmallLight,
};

const BodyText = ({ variant = 'default', children, ...props }) => (
  <p className={variantClass[variant]} {...props}>{children}</p>
);

BodyText.propTypes = {
  variant: PropTypes.oneOf(['default', 'large', 'small', 'light', 'largeLight', 'smallLight']),
  children: PropTypes.node.isRequired,
};

export default BodyText; 