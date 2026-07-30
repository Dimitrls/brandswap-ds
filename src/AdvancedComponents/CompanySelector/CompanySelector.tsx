import React, { useState, useRef, useEffect } from 'react';
import './CompanySelector.css';

import { InputField } from '../../FormElements/InputField';
import { TabsSecondary } from '../../Navigation/TabsSecondary';
import { Pagination } from '../../Navigation/Pagination';
import { Button } from '../../Buttons/Button';

const styles: Record<string, string> = {
  companySelector: "bs-company-selector--companySelector",
  companySelector__button: "bs-company-selector--companySelector__button",
  companySelector__selectedName: "bs-company-selector--companySelector__selectedName",
  companySelector__typeBadges: "bs-company-selector--companySelector__typeBadges",
  companySelector__typeButton: "bs-company-selector--companySelector__typeButton",
  companySelector__typeButtonSelected: "bs-company-selector--companySelector__typeButtonSelected",
  companySelector__dropdown: "bs-company-selector--companySelector__dropdown",
  companySelector__tabs: "bs-company-selector--companySelector__tabs",
  companySelector__tab: "bs-company-selector--companySelector__tab",
  companySelector__tabActive: "bs-company-selector--companySelector__tabActive",
  companySelector__search: "bs-company-selector--companySelector__search",
  companySelector__list: "bs-company-selector--companySelector__list",
  companySelector__empty: "bs-company-selector--companySelector__empty",
  companySelector__pagination: "bs-company-selector--companySelector__pagination",
  companySelector__buttonContainer: "bs-company-selector--companySelector__buttonContainer",
  companySelector__item: "bs-company-selector--companySelector__item",
  companySelector__itemLabel: "bs-company-selector--companySelector__itemLabel",
  companySelector__radio: "bs-company-selector--companySelector__radio",
  companySelector__radioCustom: "bs-company-selector--companySelector__radioCustom",
  companySelector__itemContent: "bs-company-selector--companySelector__itemContent",
  companySelector__itemName: "bs-company-selector--companySelector__itemName",
  companySelector__itemType: "bs-company-selector--companySelector__itemType",
};

export type CompanyType = 'advertiser' | 'host' | 'both';

export interface Company {
  id: string;
  name: string;
  type: CompanyType;
}

export interface CompanySelectorProps extends React.HTMLAttributes<HTMLDivElement> {
  companies?: Company[];
  selectedCompany?: string;
  onCompanyChange?: (companyId: string) => void;
}

export const CompanySelector = ({
  companies = [],
  selectedCompany,
  onCompanyChange,
  ...props
}: CompanySelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [internalSelectedCompany, setInternalSelectedCompany] = useState(selectedCompany);
  const [selectedType, setSelectedType] = useState<'advertiser' | 'host' | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInternalSelectedCompany(selectedCompany);
  }, [selectedCompany]);

  useEffect(() => {
    const company = companies.find(c => c.id === internalSelectedCompany);
    if (company) {
      if (company.type === 'both') {
        setSelectedType('host');
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
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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

  const getTypeLabel = (type: CompanyType) => {
    if (type === 'advertiser') return 'A';
    if (type === 'host') return 'H';
    if (type === 'both') return 'A, H';
    return '';
  };

  const filteredCompanies = companies.filter(company => {
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'advertisers' &&
        (company.type === 'advertiser' || company.type === 'both')) ||
      (activeTab === 'hosts' && (company.type === 'host' || company.type === 'both'));
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery]);

  const itemsPerPage = 10;
  const totalPages = Math.max(1, Math.ceil(filteredCompanies.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCompanies = filteredCompanies.slice(startIndex, endIndex);

  const handleCompanySelect = (companyId: string) => {
    setInternalSelectedCompany(companyId);
    onCompanyChange?.(companyId);
    setIsOpen(false);
  };

  const tabOptions = [
    { label: 'Advertisers', value: 'advertisers' },
    { label: 'Hosts', value: 'hosts' },
    { label: 'All', value: 'all' },
  ];

  return (
    <div className={styles.companySelector} ref={dropdownRef} {...props}>
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
                  selectedType === 'advertiser' ? styles.companySelector__typeButtonSelected : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={e => {
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
                  selectedType === 'host' ? styles.companySelector__typeButtonSelected : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={e => {
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
            <TabsSecondary options={tabOptions} value={activeTab} onChange={setActiveTab} />
          </div>
          <div className={styles.companySelector__search}>
            <InputField
              type="text"
              placeholder="Search companies..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              icon={true}
              iconName="search"
            />
          </div>
          <div className={styles.companySelector__list}>
            {filteredCompanies.length === 0 ? (
              <div className={styles.companySelector__empty}>No companies found</div>
            ) : (
              paginatedCompanies.map(company => (
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
          <div className={styles.companySelector__buttonContainer}>
            <Button
              variant="outline"
              size="large"
              label="Add new company"
              icon="plus"
              onClick={() => console.log('Add new company clicked')}
            />
          </div>
        </div>
      )}
    </div>
  );
};
