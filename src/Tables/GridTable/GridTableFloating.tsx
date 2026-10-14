import React, { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const GAP = 4;

export interface GridTableFloatingProps extends React.HTMLAttributes<HTMLElement> {
  anchorRef: React.RefObject<HTMLElement>;
  /** Which edge of the anchor the panel lines up with. */
  align: 'left' | 'right';
  as?: 'div' | 'ul';
  floatingRef?: React.Ref<HTMLElement>;
}

/**
 * Renders into `document.body` with fixed positioning so scroll containers
 * (`maxHeight`, pinned columns) never clip the panel.
 */
export function GridTableFloating({
  anchorRef,
  align,
  as = 'div',
  floatingRef,
  style,
  children,
  ...props
}: GridTableFloatingProps) {
  const [position, setPosition] = useState<React.CSSProperties>({ visibility: 'hidden' });

  useLayoutEffect(() => {
    const update = () => {
      const anchor = anchorRef.current;
      if (!anchor) return;
      const rect = anchor.getBoundingClientRect();
      setPosition(
        align === 'right'
          ? { top: rect.bottom + GAP, right: window.innerWidth - rect.right }
          : { top: rect.bottom + GAP, left: rect.left }
      );
    };
    update();
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [align, anchorRef]);

  if (typeof document === 'undefined') return null;
  const Tag = as;
  return createPortal(
    <Tag
      ref={floatingRef as React.Ref<HTMLDivElement & HTMLUListElement>}
      style={{ position: 'fixed', ...position, ...style }}
      {...props}
    >
      {children}
    </Tag>,
    document.body
  );
}
