import { Search, X } from 'lucide-react';
import { useI18n } from '@/i18n';
import { cn } from '@/lib/cn';

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
  inputClassName?: string;
  autoFocus?: boolean;
}

export function SearchField({
  value,
  onChange,
  placeholder,
  ariaLabel,
  className,
  inputClassName,
  autoFocus = false,
}: SearchFieldProps) {
  const { t } = useI18n();
  const resolvedPlaceholder = placeholder ?? t('common.search');
  const resolvedAriaLabel = ariaLabel ?? t('common.search');

  return (
    <div
      className={cn(
        'group flex h-9 items-center gap-2 rounded-full border border-line/10 bg-surface/60 px-3 text-muted transition-all duration-200 focus-within:border-accent/35 focus-within:bg-surface focus-within:shadow-[0_0_0_3px_rgb(var(--accent)/0.08)]',
        className,
      )}
    >
      <Search className="size-3.5 shrink-0" strokeWidth={1.8} aria-hidden />
      <input
        type="search"
        value={value}
        autoFocus={autoFocus}
        onChange={(event) => onChange(event.target.value)}
        placeholder={resolvedPlaceholder}
        aria-label={resolvedAriaLabel}
        className={cn(
          'min-w-0 flex-1 bg-transparent text-[12px] text-ink outline-none placeholder:text-muted/80 [&::-webkit-search-cancel-button]:hidden',
          inputClassName,
        )}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label={t('common.clearSearch')}
          className="flex size-5 items-center justify-center rounded-full text-muted transition-colors hover:bg-line/10 hover:text-ink"
        >
          <X className="size-3" />
        </button>
      )}
    </div>
  );
}
