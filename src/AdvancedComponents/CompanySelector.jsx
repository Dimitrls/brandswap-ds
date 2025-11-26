import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './CompanySelector.module.css';
import Icon from '../Icons/Icon';
import InputField from '../FormElements/InputField';
import TabsSecondary from '../FormElements/TabsSecondary';
import Pagination from '../FormElements/Pagination';

const CompanySelector = ({ companies = [], selectedCompany, onCompanyChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [internalSelectedCompany, setInternalSelectedCompany] = useState(selectedCompany);
  const [selectedType, setSelectedType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const dropdownRef = useRef(null);

  // Sync internal state with prop when prop changes
  useEffect(() => {
    setInternalSelectedCompany(selectedCompany);
  }, [selectedCompany]);

  // Initialize selected type based on company type
  useEffect(() => {
    const company = companies.find(c => c.id === internalSelectedCompany);
    if (company) {
      if (company.type === 'both') {
        setSelectedType('host'); // Default to 'host' when both are available
      } else if (company.type === 'advertiser') {
        setSelectedType('advertiser');
      } else if (company.type === 'host') {
        setSelectedType('host');
      }
    } else {
      setSelectedType(null);
    }
  }, [internalSelectedCompany, companies]);

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

  const selectedCompanyData = companies.find(c => c.id === internalSelectedCompany);
  
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

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery]);

  // Pagination calculations
  const itemsPerPage = 10;
  const totalPages = Math.max(1, Math.ceil(filteredCompanies.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCompanies = filteredCompanies.slice(startIndex, endIndex);

  const handleCompanySelect = (companyId) => {
    setInternalSelectedCompany(companyId);
    if (onCompanyChange) {
      onCompanyChange(companyId);
    }
    setIsOpen(false);
  };

  const tabOptions = [
    { label: 'Advertisers', value: 'advertisers' },
    { label: 'Hosts', value: 'hosts' },
    { label: 'All', value: 'all' },
  ];

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
          <div className={styles.companySelector__typeBadges}>
            {(selectedCompanyData.type === 'advertiser' || selectedCompanyData.type === 'both') && (
              <button
                type="button"
                className={[
                  styles.companySelector__typeButton,
                  selectedType === 'advertiser' ? styles.companySelector__typeButtonSelected : ''
                ].filter(Boolean).join(' ')}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedType('advertiser');
                }}
                aria-label="Advertiser"
                aria-pressed={selectedType === 'advertiser'}
              >
                A
              </button>
            )}
            {(selectedCompanyData.type === 'host' || selectedCompanyData.type === 'both') && (
              <button
                type="button"
                className={[
                  styles.companySelector__typeButton,
                  selectedType === 'host' ? styles.companySelector__typeButtonSelected : ''
                ].filter(Boolean).join(' ')}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedType('host');
                }}
                aria-label="Host"
                aria-pressed={selectedType === 'host'}
              >
                H
              </button>
            )}
          </div>
        )}
      </button>
      {isOpen && (
        <div className={styles.companySelector__dropdown}>
          <div className={styles.companySelector__tabs}>
            <TabsSecondary
              options={tabOptions}
              value={activeTab}
              onChange={setActiveTab}
            />
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
              paginatedCompanies.map((company) => (
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
                      checked={internalSelectedCompany === company.id}
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
          {filteredCompanies.length > 0 && totalPages > 1 && (
            <div className={styles.companySelector__pagination}>
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onChange={setCurrentPage}
              />
            </div>
          )}
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

