import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useId, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useI18n } from '@/i18n';
import { cn } from '@/lib/cn';
import { IconButton } from '@/components/ui/IconButton';

interface DetailSheetProps {
  open: boolean;
  onClose: () => void;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function DetailSheet({
  open,
  onClose,
  eyebrow,
  title,
  subtitle,
  children,
  footer,
  className,
}: DetailSheetProps) {
  const { t } = useI18n();
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[180] flex justify-end p-2.5 sm:p-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label={t('common.dismissDetails')}
            onClick={onClose}
            className="absolute inset-0 bg-[#081120]/20 backdrop-blur-[2px]"
            tabIndex={-1}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ x: 36, opacity: 0, scale: 0.99 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: 40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 360, damping: 34, mass: 0.8 }}
            className={cn(
              'overlay-panel relative flex h-full w-full max-w-[560px] flex-col overflow-hidden rounded-[26px]',
              className,
            )}
          >
            <div className="flex items-start justify-between gap-4 border-b border-line/[0.07] px-6 py-5">
              <div className="min-w-0">
                {eyebrow && <p className="eyebrow mb-1.5">{eyebrow}</p>}
                <h2
                  id={titleId}
                  className="text-[20px] font-semibold leading-tight tracking-[-0.03em] text-ink"
                >
                  {title}
                </h2>
                {subtitle && (
                  <p className="mt-1 text-[12px] leading-relaxed text-muted">{subtitle}</p>
                )}
              </div>
              <IconButton
                ref={closeRef}
                label={t('common.closeDetails')}
                data-testid="detail-sheet-close"
                variant="glass"
                size="md"
                onClick={onClose}
              >
                <X />
              </IconButton>
            </div>
            <div className="aether-scroll min-h-0 flex-1 overflow-y-auto px-6 py-5">
              {children}
            </div>
            {footer && (
              <div className="border-t border-line/[0.07] bg-surface/50 px-6 py-4">
                {footer}
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
