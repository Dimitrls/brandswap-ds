import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './Tooltip.module.css';

const Tooltip = ({
  content,
  placement = 'top',
  delay = 100,
  children,
  ...props
}) => {
  const [visible, setVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const show = useCallback(() => {
    const id = window.setTimeout(() => setVisible(true), delay);
    setTimeoutId(id);
  }, [delay]);

  const hide = useCallback(() => {
    window.clearTimeout(timeoutId);
    setVisible(false);
  }, [timeoutId]);

  return (
    <span
      className={[styles.tooltip, styles[`tooltip--${placement}`]].join(' ')}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      {...props}
    >
      {children}
      <span className={styles.tooltip__bubble} data-visible={visible}>
        {content}
      </span>
    </span>
  );
};

Tooltip.propTypes = {
  content: PropTypes.node.isRequired,
  placement: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  delay: PropTypes.number,
  children: PropTypes.node.isRequired,
};

export default Tooltip;

