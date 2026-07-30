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
};

interface BaseFilterProps {
  label?: string;
  options: string[];
  size?: 'small' | 'medium' | 'large';
  icon?: boolean;
  iconName?: IconName;
  placeholder?: string;
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

export interface FiltersBarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  filters?: FilterItem[];
  className?: string;
  searchbox?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  onApply?: () => void;
  applyLabel?: string;
  labels?: boolean;
}

export const FiltersBar = ({
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
}: FiltersBarProps) => {
  const renderFilter = (filter: FilterItem, index: number) => {
    if (filter.type === 'multiselectbox') {
      const { type: _type, selected, label, onChange, ...multiSelectProps } = filter;
      return (
        <div key={index} data-filter-with-label={labels && label ? 'true' : undefined}>
          <MultiSelectbox
            selected={selected || []}
            onChange={onChange ?? (() => {})}
            {...(labels && label ? { label, labelInside: true } : {})}
            {...multiSelectProps}
            size={labels ? 'large' : 'medium'}
          />
        </div>
      );
    }

    const { type: _type, value: _value, label, onChange, ...selectProps } = filter;
    return (
      <div key={index} data-filter-with-label={labels && label ? 'true' : undefined}>
        <Selectbox
          onChange={onChange}
          {...(labels && label ? { label, labelInside: true } : {})}
          {...selectProps}
          size={labels ? 'large' : 'medium'}
        />
      </div>
    );
  };

  return (
    <div
      className={[styles.filtersBar, labels && styles.filtersBarWithLabels, className]
        .filter(Boolean)
        .join(' ')}
      data-labels-enabled={labels ? 'true' : undefined}
      {...props}
    >
      {searchbox && (
        <div className={styles.filtersBar__searchbox}>
          <InputField
            type="text"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={onSearchChange ?? (() => {})}
            size={labels ? 'large' : 'medium'}
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
            size={labels ? 'large' : 'medium'}
            label={applyLabel}
            onClick={onApply}
          />
        </div>
      )}
    </div>
  );
};
