import React from 'react';
import './FiltersBar.css';

import { IconName } from '../../Icons/Icon';
import { InputField } from '../../FormElements/InputField';
import { Button } from '../../Buttons/Button';
import { Selectbox } from '../../FormElements/Selectbox';
import { MultiSelectbox } from '../../FormElements/MultiSelectbox';

const styles: Record<string, string> = {
  filtersBar: "bs-filters-bar--filtersBar",
  filtersBar__searchbox: "bs-filters-bar--filtersBar__searchbox",
  filtersBar__filters: "bs-filters-bar--filtersBar__filters",
  filtersBar__button: "bs-filters-bar--filtersBar__button",
  filtersBarWithLabels: "bs-filters-bar--filtersBarWithLabels",
  labelInside: "bs-filters-bar--labelInside",
  bordered: "bs-filters-bar--bordered",
};

interface BaseFilterProps {
  label?: string;
  options: string[];
  size?: 'small' | 'medium' | 'large';
  icon?: boolean;
  iconName?: IconName;
  placeholder?: string;
  disabled?: boolean;
  dropdownMaxHeight?: number;
}

export interface SelectboxFilter extends BaseFilterProps {
  type: 'selectbox';
  value?: string;
  onChange?: (value: string) => void;
}

export interface MultiSelectboxFilter extends BaseFilterProps {
  type: 'multiselectbox';
  selected?: string[];
  onChange?: (selected: string[]) => void;
}

export type FilterItem = SelectboxFilter | MultiSelectboxFilter;

export interface FiltersBarProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  children?: React.ReactNode;
  filters?: FilterItem[];
  className?: string;
  searchbox?: boolean;
  hideSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  searchDisabled?: boolean;
  onApply?: () => void;
  applyLabel?: string;
  labels?: boolean;
  border?: boolean;
  dropdownMaxHeight?: number;
}

export const FiltersBar = ({
  children,
  filters,
  className,
  searchbox = false,
  hideSearch = false,
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search...',
  searchDisabled = false,
  onApply,
  applyLabel = 'Apply',
  labels = true,
  border = false,
  dropdownMaxHeight,
  ...props
}: FiltersBarProps) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onApply?.();
  };

  const showSearch = searchbox && !hideSearch;

  const renderFilter = (filter: FilterItem, index: number) => {
    if (filter.type === 'multiselectbox') {
      const { type: _type, selected, label, onChange, dropdownMaxHeight: filterMaxHeight, ...multiSelectProps } = filter;
      return (
        <div key={index} data-filter-with-label={labels && label ? 'true' : undefined}>
          <MultiSelectbox
            selected={selected || []}
            onChange={onChange ?? (() => {})}
            {...(labels && label ? { label, labelInside: true } : {})}
            {...multiSelectProps}
            size={labels ? 'large' : 'medium'}
            dropdownMaxHeight={filterMaxHeight ?? dropdownMaxHeight}
          />
        </div>
      );
    }

    const { type: _type, value, label, onChange, dropdownMaxHeight: filterMaxHeight, ...selectProps } = filter;
    return (
      <div key={index} data-filter-with-label={labels && label ? 'true' : undefined}>
        <Selectbox
          value={value}
          onChange={onChange}
          {...(labels && label ? { label, labelInside: true } : {})}
          {...selectProps}
          size={labels ? 'large' : 'medium'}
          dropdownMaxHeight={filterMaxHeight ?? dropdownMaxHeight}
        />
      </div>
    );
  };

  return (
    <form
      className={[
        styles.filtersBar,
        border && styles.bordered,
        labels && styles.filtersBarWithLabels,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      data-labels-enabled={labels ? 'true' : undefined}
      onSubmit={handleSubmit}
      {...props}
    >
      {showSearch && (
        <div className={styles.filtersBar__searchbox}>
          <InputField
            type="text"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={onSearchChange ?? (() => {})}
            size={labels ? 'large' : 'medium'}
            icon={true}
            iconName="search"
            disabled={searchDisabled}
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
            type="submit"
            variant="outline"
            size={labels ? 'large' : 'medium'}
            label={applyLabel}
          />
        </div>
      )}
    </form>
  );
};
