import React from 'react';
import './FiltersBar.css';

import { InputField } from '../../FormElements/InputField';
import { Button } from '../../Buttons/Button';
import { Select, SelectMultiProps, SelectSingleProps } from '../../FormElements/Select';

const styles: Record<string, string> = {
  filtersBar: 'bs-filters-bar--filtersBar',
  filtersBar__searchbox: 'bs-filters-bar--filtersBar__searchbox',
  filtersBar__filters: 'bs-filters-bar--filtersBar__filters',
  filtersBar__actions: 'bs-filters-bar--filtersBar__actions',
  filtersBar__button: 'bs-filters-bar--filtersBar__button',
  filtersBarWithLabels: 'bs-filters-bar--filtersBarWithLabels',
  bordered: 'bs-filters-bar--bordered',
};

/** Single select by default. Pass `multiple: true` for multi-select. */
export type FilterItem<T = string> =
  | (Omit<SelectSingleProps<T>, 'multiple'> & { multiple?: false })
  | SelectMultiProps<T>;

function isMultiFilter<T>(filter: FilterItem<T>): filter is SelectMultiProps<T> {
  return filter.multiple === true;
}

export interface FiltersBarProps
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  /**
   * Extra filter controls rendered after `filters` (or alone when `filters` is omitted).
   * Use for custom inputs; for action buttons prefer the action slots below.
   */
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
  /**
   * Arbitrary JSX (e.g. `<Button onClick={...} />`) rendered at the start of the bar,
   * before search and filters. Event handlers stay on the elements you pass.
   */
  startActions?: React.ReactNode;
  /**
   * Arbitrary JSX rendered after filters / children and before the Apply button.
   */
  beforeApply?: React.ReactNode;
  /**
   * Arbitrary JSX rendered after the Apply button (or after filters when Apply is hidden).
   */
  afterApply?: React.ReactNode;
}

const renderActions = (content: React.ReactNode, slot: string) => {
  if (content == null || content === false) return null;
  return (
    <div className={styles.filtersBar__actions} data-slot={slot}>
      {content}
    </div>
  );
};

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
  startActions,
  beforeApply,
  afterApply,
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
          <Select {...filter} {...shared} multiple={false} />
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
      {renderActions(startActions, 'start')}

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
        {filters?.map(renderFilter)}
        {children}
      </div>

      {renderActions(beforeApply, 'before-apply')}

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

      {renderActions(afterApply, 'after-apply')}
    </form>
  );
};
