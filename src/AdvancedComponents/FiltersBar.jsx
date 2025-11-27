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
  ...props 
}) => {
  const renderFilter = (filter, index) => {
    const { type, value, ...filterProps } = filter;
    
    if (type === 'multiselectbox') {
      // MultiSelectbox uses 'selected' prop instead of 'value'
      // Remove label and size from props to ensure no labels are shown and size is always large
      const { selected, size, label, ...multiSelectProps } = filterProps;
      return (
        <MultiSelectbox
          key={index}
          selected={selected || []}
          {...multiSelectProps}
          size="large"
        />
      );
    } else {
      // Default to selectbox
      // Selectbox doesn't use controlled value prop, but we can pass it for future use
      // Remove label and size from props to ensure no labels are shown and size is always large
      const { size, label, ...selectProps } = filterProps;
      return (
        <Selectbox
          key={index}
          {...selectProps}
          size="large"
        />
      );
    }
  };

  return (
    <div className={[styles.filtersBar, className].filter(Boolean).join(' ')} {...props}>
      {searchbox && (
        <div className={styles.filtersBar__searchbox}>
          <InputField
            type="text"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={onSearchChange}
            size="large"
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
            size="large"
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
};

export default FiltersBar;

