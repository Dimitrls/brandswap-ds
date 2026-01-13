import React from 'react';
import PropTypes from 'prop-types';
import styles from './FiltersBar.module.css';
import InputField from '../FormElements/InputField';
import { Button } from '../Buttons/Button';
import Selectbox from '../FormElements/Selectbox';
import MultiSelectbox from '../FormElements/MultiSelectbox';

const FiltersBar = ({ 
  children, 
  filters,
  className,
  searchbox = false,
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search...',
  onApply,
  applyLabel = 'Apply',
  labels = true,
  ...props 
}) => {
  const renderFilter = (filter, index) => {
    const { type, value, ...filterProps } = filter;
    
    if (type === 'multiselectbox') {
      // MultiSelectbox uses 'selected' prop instead of 'value'
      // Conditionally include label based on labels prop, and size is large when labels is true
      const { selected, size, label, ...multiSelectProps } = filterProps;
      return (
        <div data-filter-with-label={labels && label ? 'true' : undefined}>
          <MultiSelectbox
            key={index}
            selected={selected || []}
            {...(labels && label ? { label, labelInside: true } : {})}
            {...multiSelectProps}
            size={labels ? "large" : "medium"}
          />
        </div>
      );
    } else {
      // Default to selectbox
      // Selectbox doesn't use controlled value prop, but we can pass it for future use
      // Conditionally include label based on labels prop, and size is large when labels is true
      const { size, label, ...selectProps } = filterProps;
      return (
        <div data-filter-with-label={labels && label ? 'true' : undefined}>
          <Selectbox
            key={index}
            {...(labels && label ? { label, labelInside: true } : {})}
            {...selectProps}
            size={labels ? "large" : "medium"}
          />
        </div>
      );
    }
  };

  return (
    <div 
      className={[styles.filtersBar, labels && styles.filtersBarWithLabels, className].filter(Boolean).join(' ')} 
      data-labels-enabled={labels ? 'true' : undefined}
      {...props}
    >
      {searchbox && (
        <div className={styles.filtersBar__searchbox}>
          <InputField
            type="text"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={onSearchChange}
            size={labels ? "large" : "medium"}
            icon={true}
            iconName="search"
            style={{ width: '200px' }}
          />
        </div>
      )}
      <div className={styles.filtersBar__filters}>
        {filters ? filters.map(renderFilter) : children}
      </div>
      {onApply && (
        <div className={styles.filtersBar__button}>
          <Button
            variant="outline"
            size={labels ? "large" : "medium"}
            label={applyLabel}
            onClick={onApply}
          />
        </div>
      )}
    </div>
  );
};

FiltersBar.propTypes = {
  children: PropTypes.node,
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(['selectbox', 'multiselectbox']),
      label: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.string).isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
      onChange: PropTypes.func,
      placeholder: PropTypes.string,
      size: PropTypes.oneOf(['small', 'medium', 'large']),
      // Additional props for MultiSelectbox
      selected: PropTypes.arrayOf(PropTypes.string),
      // Additional props for Selectbox
      // (Selectbox doesn't have additional unique props beyond the shared ones)
    })
  ),
  className: PropTypes.string,
  searchbox: PropTypes.bool,
  searchValue: PropTypes.string,
  onSearchChange: PropTypes.func,
  searchPlaceholder: PropTypes.string,
  onApply: PropTypes.func,
  applyLabel: PropTypes.string,
  labels: PropTypes.bool,
};

export default FiltersBar;

