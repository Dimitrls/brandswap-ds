import React from 'react';
import PropTypes from 'prop-types';
import styles from './Panel.module.css';

const Panel = ({ children, title, footer, className, ...props }) => {
  return (
    <div className={[styles.panel, className].filter(Boolean).join(' ')} {...props}>
      {title && <div className={styles.panel__header}>{title}</div>}
      <div className={styles.panel__body}>{children}</div>
      {footer && <div className={styles.panel__footer}>{footer}</div>}
    </div>
  );
};

Panel.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.node,
  footer: PropTypes.node,
  className: PropTypes.string,
};

export default Panel;

