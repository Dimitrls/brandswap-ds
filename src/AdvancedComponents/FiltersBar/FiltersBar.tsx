import React from 'react';
import './FiltersBar.css';

import { InputField } from '../../FormElements/InputField';
import { Button } from '../../Buttons/Button';
import { Select, SelectMultiProps, SelectSingleProps } from '../../FormElements/Select';

const styles: Record<string, string> = {
  filtersBar: "bs-filters-bar--filtersBar",
  filtersBar__searchbox: "bs-filters-bar--filtersBar__searchbox",
  filtersBar__filters: "bs-filters-bar--filtersBar__filters",
  filtersBar__button: "bs-filters-bar--filtersBar__button",
  filtersBarWithLabels: "bs-filters-bar--filtersBarWithLabels",
  labelInside: "bs-filters-bar--labelInside",
  bordered: "bs-filters-bar--bordered",
};

/** Single select by default. Pass `multiple: true` for multi-select. */
export type FilterItem<T = string> =
  | (Omit<SelectSingleProps<T>, 'multiple'> & { multiple?: false })
  | SelectMultiProps<T>;

function isMultiFilter<T>(filter: FilterItem<T>): filter is SelectMultiProps<T> {
  return filter.multiple === true;
}

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
    const { label, size, searchable = false, dropdownMaxHeight: filterMaxHeight } = filter;
    const shared = {
      ...(labels && label ? { label, labelInside: true as const } : {}),
      size: size ?? (labels ? 'large' : 'medium'),
      searchable,
      dropdownMaxHeight: filterMaxHeight ?? dropdownMaxHeight,
    };

    return (
      <div key={index} data-filter-with-label={labels && label ? 'true' : undefined}>
        {isMultiFilter(filter) ? (
          <Select
            {...filter}
            {...shared}
            multiple
            optionVariant={filter.optionVariant ?? 'checkbox'}
          />
        ) : (
          <Select
            {...filter}
            {...shared}
            multiple={false}
          />
        )}
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
