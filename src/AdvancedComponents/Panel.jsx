import React from 'react';
import PropTypes from 'prop-types';
import styles from './Panel.module.css';

const Panel = ({ children, title, footer, icon, description, className, ...props }) => {
  return (
    <div className={[styles.panel, className].filter(Boolean).join(' ')} {...props}>
      {(title || icon || description) && (
        <div className={styles.panel__header}>
          <div className={styles.panel__headerContent}>
            {icon && <span className={styles.panel__icon}>{icon}</span>}
            {title && <div className={styles.panel__title}>{title}</div>}
          </div>
          {description && <div className={styles.panel__description}>{description}</div>}
        </div>
      )}
      <div className={styles.panel__body}>{children}</div>
      {footer && <div className={styles.panel__footer}>{footer}</div>}
    </div>
  );
};

Panel.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.node,
  footer: PropTypes.node,
  icon: PropTypes.node,
  description: PropTypes.node,
  className: PropTypes.string,
};

export default Panel;

