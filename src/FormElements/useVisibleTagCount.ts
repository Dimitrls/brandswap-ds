import { useEffect, useRef, useState } from 'react';

export type VisibleTagMeasureOptions = {
  /** True when overflow tags should be measured (multi-select with selections). */
  enabled: boolean;
  /** Number of selected items; used when measurement is skipped or as an upper bound. */
  selectedCount: number;
  /** Stable identity for the selected set (e.g. joined keys). Avoids effect churn from new array refs. */
  selectedKey: string;
  /** Labels used to measure tag widths, in selection order. */
  labels: string[];
  size?: 'small' | 'medium' | 'large';
  icon?: boolean;
  labelInside?: boolean;
  label?: string;
};

/**
 * Measures how many removable tags fit in a select control.
 *
 * ResizeObserver callbacks must not mutate layout or setState synchronously —
 * Chrome reports "ResizeObserver loop completed with undelivered notifications"
 * when they do. Work is deferred with rAF and state updates are skipped when
 * the count is unchanged.
 */
export function useVisibleTagCount(
  containerRef: React.RefObject<HTMLElement | null>,
  {
    enabled,
    selectedCount,
    selectedKey,
    labels,
    size = 'medium',
    icon = false,
    labelInside = false,
    label,
  }: VisibleTagMeasureOptions
): number {
  const [visibleCount, setVisibleCount] = useState(selectedCount);
  const labelsRef = useRef(labels);
  labelsRef.current = labels;

  useEffect(() => {
    if (!enabled || selectedCount === 0) {
      setVisibleCount((prev) => (prev === selectedCount ? prev : selectedCount));
      return;
    }

    const selectElement = containerRef.current?.parentElement;
    if (!selectElement) {
      setVisibleCount((prev) => (prev === selectedCount ? prev : selectedCount));
      return;
    }

    let rafId = 0;
    let disposed = false;

    const calculateVisibleCount = () => {
      if (disposed) return;

      const currentLabels = labelsRef.current;
      const selectRect = selectElement.getBoundingClientRect();
      if (selectRect.width === 0) {
        setVisibleCount((prev) => (prev === selectedCount ? prev : selectedCount));
        return;
      }

      const arrowWidth = 32;
      const padding = icon
        ? size === 'small'
          ? 36
          : size === 'large'
            ? 44
            : 40
        : size === 'small'
          ? 8
          : size === 'large'
            ? 16
            : 12;
      const gap = 6;
      const labelWidth = labelInside && label ? 50 : 0;
      const usableWidth = selectRect.width - arrowWidth - padding - labelWidth;

      if (usableWidth <= 0) {
        setVisibleCount((prev) => (prev === 0 ? prev : 0));
        return;
      }

      const measureContainer = document.createElement('div');
      measureContainer.setAttribute('aria-hidden', 'true');
      measureContainer.style.cssText =
        'position:absolute;visibility:hidden;display:flex;flex-wrap:nowrap;width:auto;pointer-events:none;left:-99999px;top:0;';
      measureContainer.style.gap = `${gap}px`;
      document.body.appendChild(measureContainer);

      try {
        const overflowTagSpan = document.createElement('span');
        overflowTagSpan.className = 'bs-tag bs-tag--neutral';
        overflowTagSpan.textContent = `+${selectedCount}`;
        overflowTagSpan.style.display = 'inline-block';
        measureContainer.appendChild(overflowTagSpan);
        const overflowTagWidth = overflowTagSpan.offsetWidth;
        overflowTagSpan.remove();

        const tagWidths: number[] = [];
        currentLabels.forEach((optionLabel) => {
          const tagWrapper = document.createElement('div');
          tagWrapper.style.cssText = 'display:inline-flex;align-items:center;gap:6px';

          const tagSpan = document.createElement('span');
          tagSpan.className = 'bs-tag bs-tag--neutral bs-tag--removable';
          tagSpan.style.cssText = 'display:inline-flex;align-items:center;gap:6px';

          const removeBtn = document.createElement('button');
          removeBtn.className = 'bs-tag__remove-btn';
          removeBtn.style.cssText =
            'background:none;border:none;padding:0;display:flex;align-items:center;width:16px;height:16px';

          const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          svg.setAttribute('width', '16');
          svg.setAttribute('height', '16');
          svg.setAttribute('viewBox', '0 0 16 16');
          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          path.setAttribute('d', 'M12 4L4 12M4 4l8 8');
          path.setAttribute('stroke', 'currentColor');
          path.setAttribute('stroke-width', '1.5');
          path.setAttribute('fill', 'none');
          svg.appendChild(path);
          removeBtn.appendChild(svg);

          tagSpan.appendChild(removeBtn);
          tagSpan.appendChild(document.createTextNode(optionLabel));
          tagWrapper.appendChild(tagSpan);
          measureContainer.appendChild(tagWrapper);

          tagWidths.push(tagWrapper.offsetWidth);
          tagWrapper.remove();
        });

        let totalWidth = 0;
        let count = 0;
        for (let i = 0; i < tagWidths.length; i++) {
          const tagWidth = tagWidths[i];
          const widthWithOverflow =
            totalWidth + tagWidth + (count > 0 ? gap : 0) + overflowTagWidth + gap;

          if (widthWithOverflow <= usableWidth || count === 0) {
            totalWidth += tagWidth + (count > 0 ? gap : 0);
            count++;
          } else {
            break;
          }
        }

        const next = Math.min(count, selectedCount);
        setVisibleCount((prev) => (prev === next ? prev : next));
      } finally {
        measureContainer.remove();
      }
    };

    const scheduleCalculate = () => {
      cancelAnimationFrame(rafId);
      // Defer out of the ResizeObserver delivery frame to avoid
      // "ResizeObserver loop completed with undelivered notifications".
      rafId = requestAnimationFrame(() => {
        calculateVisibleCount();
      });
    };

    scheduleCalculate();

    const resizeObserver = new ResizeObserver(() => {
      scheduleCalculate();
    });
    resizeObserver.observe(selectElement);

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
    };
  }, [
    enabled,
    selectedCount,
    selectedKey,
    size,
    icon,
    labelInside,
    label,
    containerRef,
  ]);

  return visibleCount;
}
