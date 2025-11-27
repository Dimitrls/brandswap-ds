import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './SecondBar.module.css';
import Tabs from '../Navigation/Tabs';
import { Button } from '../Buttons/Button';

const SecondBar = ({ 
  tabsOptions = [], 
  activeTab, 
  onTabChange,
  tabs = true,
  buttonLabel = 'Save',
  buttonVariant = 'filled',
  buttonSize = 'large',
  buttonIcon,
  onButtonClick,
  actionButton = true,
  className, 
  ...props 
}) => {
  const [internalTab, setInternalTab] = useState(tabsOptions[0]?.value || '');
  const currentTab = activeTab !== undefined ? activeTab : internalTab;
  const handleTabChange = onTabChange || setInternalTab;

  return (
    <div className={[styles.secondBar, className].filter(Boolean).join(' ')} {...props}>
      {tabs && tabsOptions.length > 0 && (
        <div className={styles.secondBar__tabs}>
          <Tabs 
            options={tabsOptions} 
            value={currentTab} 
            onChange={handleTabChange} 
          />
        </div>
      )}
      {actionButton && (
        <div className={styles.secondBar__button}>
          <Button
            label={buttonLabel}
            variant={buttonVariant}
            size={buttonSize}
            icon={buttonIcon}
            onClick={onButtonClick}
          />
        </div>
      )}
    </div>
  );
};

SecondBar.propTypes = {
  tabsOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      icon: PropTypes.node,
    })
  ),
  activeTab: PropTypes.string,
  onTabChange: PropTypes.func,
  tabs: PropTypes.bool,
  buttonLabel: PropTypes.string,
  buttonVariant: PropTypes.oneOf(['filled', 'outline', 'filled-warning', 'outline-warning', 'subtle', 'subtle-warning']),
  buttonSize: PropTypes.oneOf(['small', 'medium', 'large']),
  buttonIcon: PropTypes.string,
  onButtonClick: PropTypes.func,
  actionButton: PropTypes.bool,
  className: PropTypes.string,
};

export default SecondBar;

