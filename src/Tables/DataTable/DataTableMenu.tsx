import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { IconButton } from '../../Buttons/IconButton';
import '../../FormElements/Selectbox/Selectbox.css';

interface DataTableMenuProps {
  onExportCsv: () => void;
  onExportXls: () => void;
}

export function DataTableMenu({ onExportCsv, onExportXls }: DataTableMenuProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const [position, setPosition] = useState({ top: 0, right: 0 });

  useEffect(() => {
    if (!open || !triggerRef.current) return undefined;
    const update = () => {
      const rect = triggerRef.current!.getBoundingClientRect();
      setPosition({ top: rect.bottom + 4, right: window.innerWidth - rect.right });
    };
    update();
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target) || menuRef.current?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [open]);

  return (
    <div className="bs-data-table--menu">
      <span ref={triggerRef}>
        <IconButton
          icon="dots-vertical"
          size={16}
          sizeVariant="small"
          variant="subtle"
          ariaLabel="Table actions"
          aria-expanded={open}
          aria-haspopup="menu"
          onClick={() => setOpen((value) => !value)}
        />
      </span>
      {open &&
        createPortal(
          <ul
            ref={menuRef}
            className="bs-selectbox--dropdown bs-data-table--menuDropdown"
            role="menu"
            style={{ top: position.top, right: position.right }}
          >
            <li role="none">
              <button
                type="button"
                role="menuitem"
                className="bs-selectbox--option"
                onClick={() => {
                  onExportCsv();
                  setOpen(false);
                }}
              >
                Export as CSV
              </button>
            </li>
            <li role="none">
              <button
                type="button"
                role="menuitem"
                className="bs-selectbox--option"
                onClick={() => {
                  onExportXls();
                  setOpen(false);
                }}
              >
                Export as XLS
              </button>
            </li>
          </ul>,
          document.body
        )}
    </div>
  );
}
