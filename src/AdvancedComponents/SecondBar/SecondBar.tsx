import React, { useState } from 'react';
import styles from './SecondBar.module.css';
import { Tabs, TabOption } from '../../Navigation/Tabs';
import { Button } from '../../Buttons/Button';
import type { IconName } from '../../Icons/Icon';

export interface SecondBarProps extends React.HTMLAttributes<HTMLDivElement> {
  tabsOptions?: TabOption[];
  activeTab?: string;
  onTabChange?: (value: string) => void;
  tabs?: boolean;
  buttonLabel?: string;
  buttonVariant?: 'filled' | 'outline' | 'filled-warning' | 'outline-warning' | 'subtle' | 'subtle-warning';
  buttonSize?: 'small' | 'medium' | 'large';
  buttonIcon?: IconName;
  onButtonClick?: () => void;
  actionButton?: boolean;
  className?: string;
}

export const SecondBar = ({
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
}: SecondBarProps) => {
  const [internalTab, setInternalTab] = useState(tabsOptions[0]?.value || '');
  const currentTab = activeTab !== undefined ? activeTab : internalTab;
  const handleTabChange = onTabChange || setInternalTab;

  return (
    <div className={[styles.secondBar, className].filter(Boolean).join(' ')} {...props}>
      {tabs && tabsOptions.length > 0 && (
        <div className={styles.secondBar__tabs}>
          <Tabs options={tabsOptions} value={currentTab} onChange={handleTabChange} />
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
