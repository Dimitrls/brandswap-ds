import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './CompanySelector.module.css';
import Icon from '../Icons/Icon';
import InputField from '../FormElements/InputField';

const CompanySelector = ({ companies = [], selectedCompany, onCompanyChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const selectedCompanyData = companies.find(c => c.id === selectedCompany);
  
  const getTypeLabel = (type) => {
    if (type === 'advertiser') return 'A';
    if (type === 'host') return 'H';
    if (type === 'both') return 'A, H';
    return '';
  };

  const filteredCompanies = companies.filter(company => {
    const matchesTab = activeTab === 'all' || 
      (activeTab === 'advertisers' && (company.type === 'advertiser' || company.type === 'both')) ||
      (activeTab === 'hosts' && (company.type === 'host' || company.type === 'both'));
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleCompanySelect = (companyId) => {
    if (onCompanyChange) {
      onCompanyChange(companyId);
    }
    setIsOpen(false);
  };

  return (
    <div className={styles.companySelector} ref={dropdownRef}>
      <button
        type="button"
        className={styles.companySelector__button}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select company"
        aria-expanded={isOpen}
      >
        <span className={styles.companySelector__selectedName}>
          {selectedCompanyData ? selectedCompanyData.name : 'Select company'}
        </span>
        {selectedCompanyData && (
          <span className={styles.companySelector__typeBadge}>
            {getTypeLabel(selectedCompanyData.type)}
          </span>
        )}
      </button>
      {isOpen && (
        <div className={styles.companySelector__dropdown}>
          <div className={styles.companySelector__tabs}>
            <button
              type="button"
              className={[
                styles.companySelector__tab,
                activeTab === 'advertisers' ? styles.companySelector__tabActive : ''
              ].filter(Boolean).join(' ')}
              onClick={() => setActiveTab('advertisers')}
            >
              Advertisers
            </button>
            <button
              type="button"
              className={[
                styles.companySelector__tab,
                activeTab === 'hosts' ? styles.companySelector__tabActive : ''
              ].filter(Boolean).join(' ')}
              onClick={() => setActiveTab('hosts')}
            >
              Hosts
            </button>
            <button
              type="button"
              className={[
                styles.companySelector__tab,
                activeTab === 'all' ? styles.companySelector__tabActive : ''
              ].filter(Boolean).join(' ')}
              onClick={() => setActiveTab('all')}
            >
              All
            </button>
          </div>
          <div className={styles.companySelector__search}>
            <InputField
              type="text"
              placeholder="Search companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              prefix={<Icon name="search" size={16} />}
            />
          </div>
          <div className={styles.companySelector__list}>
            {filteredCompanies.length === 0 ? (
              <div className={styles.companySelector__empty}>No companies found</div>
            ) : (
              filteredCompanies.map((company) => (
                <div
                  key={company.id}
                  className={styles.companySelector__item}
                  onClick={() => handleCompanySelect(company.id)}
                >
                  <label className={styles.companySelector__itemLabel}>
                    <input
                      type="radio"
                      name="company"
                      value={company.id}
                      checked={selectedCompany === company.id}
                      onChange={() => handleCompanySelect(company.id)}
                      className={styles.companySelector__radio}
                    />
                    <span className={styles.companySelector__radioCustom}></span>
                    <div className={styles.companySelector__itemContent}>
                      <span className={styles.companySelector__itemName}>{company.name}</span>
                      <span className={styles.companySelector__itemType}>
                        {getTypeLabel(company.type)}
                      </span>
                    </div>
                  </label>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

CompanySelector.propTypes = {
  companies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['advertiser', 'host', 'both']).isRequired,
    })
  ),
  selectedCompany: PropTypes.string,
  onCompanyChange: PropTypes.func,
};

export default CompanySelector;

