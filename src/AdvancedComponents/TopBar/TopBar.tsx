import React from 'react';
import styles from './TopBar.module.css';
import { Breadcrumbs, BreadcrumbItem } from '../../Navigation/Breadcrumbs';
import { Notifications, NotificationItem } from '../Notifications';
import { CompanySelector, Company } from '../CompanySelector';
import { Avatar, AvatarUser } from '../Avatar';

export interface TopBarProps extends React.HTMLAttributes<HTMLDivElement> {
  breadcrumbs?: BreadcrumbItem[];
  notifications?: NotificationItem[];
  companies?: Company[];
  selectedCompany?: string;
  onCompanyChange?: (companyId: string) => void;
  user?: AvatarUser;
  onProfileClick?: () => void;
  onLogoutClick?: () => void;
  className?: string;
}

export const TopBar = ({
  breadcrumbs,
  notifications,
  companies,
  selectedCompany,
  onCompanyChange,
  user,
  onProfileClick,
  onLogoutClick,
  className,
  ...props
}: TopBarProps) => {
  return (
    <div className={[styles.topBar, className].filter(Boolean).join(' ')} {...props}>
      <div className={styles.topBar__left}>
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
      </div>
      <div className={styles.topBar__right}>
        <Notifications notifications={notifications} />
        <CompanySelector
          companies={companies}
          selectedCompany={selectedCompany}
          onCompanyChange={onCompanyChange}
        />
        <Avatar
          user={user}
          onProfileClick={onProfileClick}
          onLogoutClick={onLogoutClick}
        />
      </div>
    </div>
  );
};
