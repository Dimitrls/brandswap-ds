import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Heading } from '../../Typography/Heading';
import { IconButton } from '../../Buttons/IconButton';
import './DataTableModal.css';

export interface DataTableModalProps {
  open: boolean;
  title?: React.ReactNode;
  onClose: () => void;
  children: React.ReactNode;
}

export function DataTableModal({ open, title, onClose, children }: DataTableModalProps) {
  const titleId = 'bs-data-table-modal-title';

  useEffect(() => {
    if (!open) return undefined;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open || typeof document === 'undefined') return null;

  const labelledBy = typeof title === 'string' || typeof title === 'number' ? titleId : undefined;

  return createPortal(
    <div className="bs-data-table-modal--overlay" onClick={onClose} role="presentation">
      <div
        className="bs-data-table-modal--dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-label={labelledBy ? undefined : typeof title === 'string' ? title : 'Table'}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="bs-data-table-modal--header">
          {title != null &&
            (typeof title === 'string' || typeof title === 'number' ? (
              <Heading id={titleId} level={3}>
                {title}
              </Heading>
            ) : (
              title
            ))}
          <IconButton icon="close" ariaLabel="Close" variant="subtle" sizeVariant="small" onClick={onClose} />
        </div>
        <div className="bs-data-table-modal--body">{children}</div>
      </div>
    </div>,
    document.body
  );
}
