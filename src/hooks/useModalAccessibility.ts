import { RefObject, useEffect, useRef } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]:not([tabindex="-1"])',
  'button:not(:disabled):not([tabindex="-1"])',
  'input:not(:disabled):not([tabindex="-1"])',
  'select:not(:disabled):not([tabindex="-1"])',
  'textarea:not(:disabled):not([tabindex="-1"])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

export function getFocusableElements(container: HTMLElement | null): HTMLElement[] {
  if (!container) return [];
  const candidates = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
  return candidates.filter((el) => {
    if (el.hasAttribute('disabled')) return false;
    if (el.closest('[aria-hidden="true"]') || el.closest('[hidden]')) return false;
    if (typeof window !== 'undefined' && typeof window.getComputedStyle === 'function') {
      const style = window.getComputedStyle(el);
      if (style.display === 'none' || style.visibility === 'hidden') return false;
    }
    return true;
  });
}

export interface UseModalAccessibilityOptions {
  isOpen: boolean;
  onClose: () => void;
  modalRef: RefObject<HTMLElement | null>;
  initialFocusRef?: RefObject<HTMLElement | null>;
  canClose?: boolean;
  onEscape?: (event: KeyboardEvent) => boolean | void;
  lockScroll?: boolean;
}

/**
 * Reusable WCAG 2.1 / 2.2 AA dialog accessibility hook:
 * - Saves trigger focus on open and restores it on close
 * - Moves initial focus to `initialFocusRef` or first focusable control inside the dialog
 * - Traps Tab and Shift+Tab keyboard focus within the dialog
 * - Handles Escape key dismissal (delegating to inner popovers first via `onEscape`)
 * - Locks background page scroll while open
 */
export function useModalAccessibility({
  isOpen,
  onClose,
  modalRef,
  initialFocusRef,
  canClose = true,
  onEscape,
  lockScroll = true,
}: UseModalAccessibilityOptions): void {
  const onCloseRef = useRef(onClose);
  const canCloseRef = useRef(canClose);
  const onEscapeRef = useRef(onEscape);
  const initialFocusRefHolder = useRef(initialFocusRef);

  onCloseRef.current = onClose;
  canCloseRef.current = canClose;
  onEscapeRef.current = onEscape;
  initialFocusRefHolder.current = initialFocusRef;

  useEffect(() => {
    if (!isOpen || typeof document === 'undefined') return;

    const previousFocused = document.activeElement as HTMLElement | null;
    const modalElement = modalRef.current;
    const previousOverflow = document.body.style.overflow;

    if (lockScroll) {
      document.body.style.overflow = 'hidden';
    }

    // Move initial focus inside dialog if focus is not already inside it
    const targetInitial = initialFocusRefHolder.current?.current;
    if (targetInitial && typeof targetInitial.focus === 'function') {
      targetInitial.focus({ preventScroll: true });
    } else if (modalElement && !modalElement.contains(document.activeElement)) {
      const focusables = getFocusableElements(modalElement);
      if (focusables.length > 0) {
        focusables[0].focus({ preventScroll: true });
      } else {
        if (!modalElement.hasAttribute('tabindex')) {
          modalElement.setAttribute('tabindex', '-1');
        }
        modalElement.focus({ preventScroll: true });
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      const currentModal = modalRef.current;
      if (!currentModal) return;

      if (e.key === 'Escape') {
        if (onEscapeRef.current) {
          const handled = onEscapeRef.current(e);
          if (handled) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }
        }
        if (canCloseRef.current) {
          e.preventDefault();
          e.stopPropagation();
          onCloseRef.current();
        }
        return;
      }

      if (e.key === 'Tab') {
        const focusables = getFocusableElements(currentModal);
        if (focusables.length === 0) {
          e.preventDefault();
          currentModal.focus({ preventScroll: true });
          return;
        }

        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;

        if (e.shiftKey) {
          if (!active || active === first || !currentModal.contains(active)) {
            e.preventDefault();
            last.focus({ preventScroll: true });
          }
        } else {
          if (!active || active === last || !currentModal.contains(active)) {
            e.preventDefault();
            first.focus({ preventScroll: true });
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (lockScroll) {
        document.body.style.overflow = previousOverflow;
      }
      if (
        previousFocused &&
        previousFocused.isConnected &&
        typeof previousFocused.focus === 'function'
      ) {
        const activeNow = document.activeElement;
        if (
          !activeNow ||
          activeNow === document.body ||
          !modalElement?.isConnected ||
          modalElement.contains(activeNow)
        ) {
          try {
            previousFocused.focus({ preventScroll: true });
          } catch {
            // Ignore focus errors in detached environments
          }
        }
      }
    };
  }, [isOpen, modalRef, lockScroll]);
}

export default useModalAccessibility;
