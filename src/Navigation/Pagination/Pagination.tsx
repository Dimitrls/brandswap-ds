import React from 'react';
import { Icon } from '../../Icons/Icon';
import './Pagination.css';

const styles: Record<string, string> = {
  pagination: "bs-pagination--pagination",
  arrow: "bs-pagination--arrow",
  page: "bs-pagination--page",
  active: "bs-pagination--active",
  ellipsis: "bs-pagination--ellipsis",
};

export interface PaginationProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  totalPages: number;
  currentPage: number;
  onChange: (page: number) => void;
}

export const Pagination = ({
  totalPages,
  currentPage,
  onChange,
  className,
  ...props
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const pages: (number | 'ellipsis-left' | 'ellipsis-right')[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1, 2, 3);
    if (currentPage > 3 && currentPage < totalPages - 2) {
      pages.push(currentPage);
    }
    pages.push(totalPages - 2, totalPages - 1, totalPages);
  }

  const uniquePages = Array.from(
    new Set(pages.filter((p): p is number => typeof p === 'number' && p >= 1 && p <= totalPages))
  );
  uniquePages.sort((a, b) => a - b);

  const displayPages: (number | 'ellipsis')[] = [];
  let lastPage = 0;
  for (let i = 0; i < pages.length; i++) {
    const p = pages[i];
    if (typeof p === 'number') {
      if (lastPage && p - lastPage > 1) {
        displayPages.push('ellipsis');
      }
      displayPages.push(p);
      lastPage = p;
    } else if (p === 'ellipsis-left' || p === 'ellipsis-right') {
      displayPages.push('ellipsis');
    }
  }

  return (
    <div className={[styles.pagination, className].filter(Boolean).join(' ')} {...props}>
      <button
        className={styles.arrow}
        onClick={() => onChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        aria-label="Previous"
      >
        <Icon name="chevron-left" />
      </button>
      {displayPages.map((p, idx) =>
        p === 'ellipsis' ? (
          <span key={`ellipsis-${idx}`} className={styles.ellipsis}>…</span>
        ) : (
          <button
            key={p}
            className={
              p === currentPage
                ? `${styles.page} ${styles.active}`
                : styles.page
            }
            onClick={() => onChange(p)}
            aria-current={p === currentPage ? 'page' : undefined}
          >
            {p}
          </button>
        )
      )}
      <button
        className={styles.arrow}
        onClick={() => onChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        aria-label="Next"
      >
        <Icon name="chevron-right" />
      </button>
    </div>
  );
};
