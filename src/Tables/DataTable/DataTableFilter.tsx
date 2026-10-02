import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '../../Buttons/Button';
import { IconButton } from '../../Buttons/IconButton';
import { InputField } from '../../FormElements/InputField';

interface DataTableFilterProps {
  columnId: string;
  title: string;
  placeholder?: string;
  value: string;
  open: boolean;
  active: boolean;
  onOpenChange: (open: boolean) => void;
  onApply: (value: string) => void;
  onClear: () => void;
}

export function DataTableFilter({
  columnId,
  title,
  placeholder = 'Search...',
  value,
  open,
  active,
  onOpenChange,
  onApply,
  onClear,
}: DataTableFilterProps) {
  const triggerRef = useRef<HTMLSpanElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [draft, setDraft] = useState(value);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (open) setDraft(value);
  }, [open, value]);

  useLayoutEffect(() => {
    if (!open || !triggerRef.current) return undefined;
    const update = () => {
      const rect = triggerRef.current!.getBoundingClientRect();
      setPosition({ top: rect.bottom + 8, left: rect.left });
    };
    update();
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [open]);

  useLayoutEffect(() => {
    if (!open || !popoverRef.current) return undefined;
    const input = popoverRef.current.querySelector('input');
    input?.focus();
    input?.select();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target) || popoverRef.current?.contains(target)) return;
      onOpenChange(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [open, onOpenChange]);

  const apply = () => {
    onApply(draft);
    onOpenChange(false);
  };

  const clear = () => {
    setDraft('');
    onClear();
  };

  return (
    <>
      <span ref={triggerRef} className="bs-data-table--filterTrigger">
        <IconButton
          icon="filter"
          size={16}
          sizeVariant="small"
          variant="subtle"
          ariaLabel={`Filter ${title}`}
          aria-expanded={open}
          aria-controls={`bs-data-table-filter-${columnId}`}
          className={[
            'bs-data-table--iconBtn',
            active ? 'bs-data-table--iconBtnActive' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={() => onOpenChange(!open)}
        />
      </span>
      {open &&
        createPortal(
          <div
            ref={popoverRef}
            id={`bs-data-table-filter-${columnId}`}
            className="bs-data-table--filterPopover"
            role="dialog"
            aria-label={`Filter ${title}`}
            style={{ top: position.top, left: position.left }}
          >
            <InputField
              size="small"
              icon
              iconName="search"
              autoFocus
              value={draft}
              placeholder={placeholder}
              onChange={setDraft}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  apply();
                }
                if (event.key === 'Escape') onOpenChange(false);
              }}
            />
            <div className="bs-data-table--filterActions">
              <Button
                size="small"
                variant="outline"
                label="Clear"
                onClick={clear}
              />
              <Button size="small" variant="filled" label="Apply" onClick={apply} />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
