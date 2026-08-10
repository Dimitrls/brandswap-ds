import React, { useEffect, useState } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { IconName } from '../../Icons/Icon';
import { ToastVariant } from '../../shared/types';
import { Toast, ToastProps } from './Toast';
import './Toast.css';

export type ToastPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export interface ToastOpenOptions
  extends Omit<ToastProps, 'message' | 'onDismiss' | 'variant'> {
  message?: string;
  content?: string;
  title?: string;
  variant?: ToastVariant;
  /** Display duration in seconds. Use 0 to keep open until dismissed. */
  duration?: number;
  position?: ToastPosition;
  dismissible?: boolean;
  onClose?: () => void;
  key?: string | number;
}

export interface ToastConfigOptions {
  position?: ToastPosition;
  /** Default display duration in seconds. */
  duration?: number;
  maxCount?: number;
  getContainer?: () => HTMLElement;
}

type ToastContent = string | ToastOpenOptions;

interface ToastItem extends ToastOpenOptions {
  id: string;
  message: string;
  variant: ToastVariant;
  position: ToastPosition;
  duration: number;
  dismissible: boolean;
}

type Listener = (toasts: ToastItem[]) => void;

const DEFAULT_DURATION = 3;
const DEFAULT_POSITION: ToastPosition = 'top-right';
const DEFAULT_MAX_COUNT = 5;

let seed = 0;
let toasts: ToastItem[] = [];
let listeners: Listener[] = [];
let root: Root | null = null;
let hostEl: HTMLElement | null = null;

let config: Required<
  Pick<ToastConfigOptions, 'position' | 'duration' | 'maxCount'>
> &
  Pick<ToastConfigOptions, 'getContainer'> = {
  position: DEFAULT_POSITION,
  duration: DEFAULT_DURATION,
  maxCount: DEFAULT_MAX_COUNT,
};

function nextId() {
  seed += 1;
  return `bs-toast-${seed}`;
}

function emit() {
  listeners.forEach((listener) => listener([...toasts]));
}

function ensureHost() {
  if (typeof document === 'undefined') return;
  if (hostEl && root) return;

  const parent = config.getContainer?.() || document.body;
  hostEl = document.createElement('div');
  hostEl.className = 'bs-toast--host';
  parent.appendChild(hostEl);
  root = createRoot(hostEl);
  root.render(<ToastHost />);
}

function subscribe(listener: Listener) {
  listeners.push(listener);
  listener([...toasts]);
  return () => {
    listeners = listeners.filter((item) => item !== listener);
  };
}

function removeToast(id: string, onClose?: () => void) {
  const exists = toasts.some((item) => item.id === id);
  if (!exists) return;
  toasts = toasts.filter((item) => item.id !== id);
  emit();
  onClose?.();
}

function normalizeContent(
  content: ToastContent,
  variant: ToastVariant,
  duration?: number,
  onClose?: () => void
): ToastOpenOptions {
  if (typeof content === 'string') {
    return {
      message: content,
      variant,
      duration,
      onClose,
    };
  }

  return {
    ...content,
    variant: content.variant || variant,
    duration: content.duration ?? duration,
    onClose: content.onClose || onClose,
  };
}

function openToast(options: ToastOpenOptions) {
  ensureHost();

  const id = String(options.key ?? nextId());
  const message = options.message ?? options.content ?? '';
  if (!message && !options.title) return id;

  const item: ToastItem = {
    ...options,
    id,
    message,
    variant: options.variant || 'info',
    position: options.position || config.position,
    duration: options.duration ?? config.duration,
    dismissible: options.dismissible ?? true,
  };

  toasts = [...toasts.filter((toast) => toast.id !== id), item];
  if (toasts.length > config.maxCount) {
    toasts = toasts.slice(toasts.length - config.maxCount);
  }
  emit();
  return id;
}

function ToastHost() {
  const [items, setItems] = useState<ToastItem[]>(toasts);

  useEffect(() => subscribe(setItems), []);

  const positions: ToastPosition[] = [
    'top-left',
    'top-right',
    'bottom-left',
    'bottom-right',
  ];

  return (
    <>
      {positions.map((position) => {
        const positioned = items.filter((item) => item.position === position);
        if (positioned.length === 0) return null;

        return (
          <div
            key={position}
            className={`bs-toast--container bs-toast--container--${position}`}
            aria-live="polite"
            aria-relevant="additions text"
          >
            {positioned.map((item) => (
              <ToastItemView key={item.id} item={item} />
            ))}
          </div>
        );
      })}
    </>
  );
}

function ToastItemView({ item }: { item: ToastItem }) {
  useEffect(() => {
    if (item.duration <= 0) return undefined;
    const timer = window.setTimeout(() => {
      removeToast(item.id, item.onClose);
    }, item.duration * 1000);
    return () => window.clearTimeout(timer);
  }, [item.id, item.duration, item.onClose]);

  return (
    <div className="bs-toast--item">
      <Toast
        title={item.title}
        message={item.message}
        variant={item.variant}
        dismissible={item.dismissible}
        onDismiss={() => removeToast(item.id, item.onClose)}
        actionLabel={item.actionLabel}
        onAction={item.onAction}
        icon={item.icon as IconName | undefined}
      />
    </div>
  );
}

function createTypeMethod(variant: ToastVariant) {
  return (
    content: ToastContent,
    duration?: number,
    onClose?: () => void
  ): string => openToast(normalizeContent(content, variant, duration, onClose));
}

export const toast = {
  open: (options: ToastOpenOptions) => openToast(options),
  message: createTypeMethod('info'),
  info: createTypeMethod('info'),
  success: createTypeMethod('success'),
  warning: createTypeMethod('warning'),
  error: createTypeMethod('error'),
  config: (options: ToastConfigOptions) => {
    config = {
      ...config,
      ...options,
      position: options.position ?? config.position,
      duration: options.duration ?? config.duration,
      maxCount: options.maxCount ?? config.maxCount,
    };
  },
  destroy: (key?: string | number) => {
    if (key === undefined) {
      const closing = [...toasts];
      toasts = [];
      emit();
      closing.forEach((item) => item.onClose?.());
      return;
    }
    removeToast(String(key));
  },
};

export type ToastApi = typeof toast;
