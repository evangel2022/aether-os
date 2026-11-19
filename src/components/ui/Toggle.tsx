import { cn } from '@/lib/cn';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
  disabled?: boolean;
  className?: string;
  hideLabel?: boolean;
}

export function Toggle({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  className,
  hideLabel = false,
}: ToggleProps) {
  return (
    <div className={cn('flex items-center justify-between gap-4', className)}>
      {!hideLabel && (
        <div className="min-w-0">
          <p className="text-[13px] font-medium text-ink">{label}</p>
          {description && (
            <p className="mt-0.5 text-[11.5px] leading-relaxed text-muted">{description}</p>
          )}
        </div>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative h-[26px] w-[43px] shrink-0 rounded-full transition-colors duration-300 ease-aether',
          checked ? 'bg-accent' : 'bg-line/15',
          disabled && 'opacity-40',
        )}
      >
        <span
          className={cn(
            'absolute top-[3px] size-5 rounded-full bg-white shadow-[0_2px_5px_rgb(15_23_42/0.28)] transition-[left] duration-300 ease-aether',
            checked ? 'left-[20px]' : 'left-[3px]',
          )}
        />
      </button>
    </div>
  );
}
