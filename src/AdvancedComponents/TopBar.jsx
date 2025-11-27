import React from 'react';
import PropTypes from 'prop-types';
import styles from './TopBar.module.css';
import Breadcrumbs from '../Navigation/Breadcrumbs';
import Notifications from './Notifications';
import CompanySelector from './CompanySelector';
import Avatar from './Avatar';

const TopBar = ({ breadcrumbs, notifications, companies, selectedCompany, onCompanyChange, user, onProfileClick, onLogoutClick, className, ...props }) => {
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

TopBar.propTypes = {
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      hasDropdown: PropTypes.bool,
      onClick: PropTypes.func,
      dropdownItems: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      timestamp: PropTypes.string,
    })
  ),
  companies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['advertiser', 'host', 'both']).isRequired,
    })
  ),
  selectedCompany: PropTypes.string,
  onCompanyChange: PropTypes.func,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    initials: PropTypes.string.isRequired,
  }),
  onProfileClick: PropTypes.func,
  onLogoutClick: PropTypes.func,
  className: PropTypes.string,
};

export default TopBar;

