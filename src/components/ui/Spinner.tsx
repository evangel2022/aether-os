import { LoaderCircle } from 'lucide-react';
import { useI18n } from '@/i18n';
import { cn } from '@/lib/cn';

export function Spinner({ className }: { className?: string }) {
  return (
    <LoaderCircle
      className={cn('size-4 animate-spin text-accent', className)}
      strokeWidth={2.2}
      aria-hidden
    />
  );
}

export function LoadingRow({ label }: { label?: string }) {
  const { t } = useI18n();
  return (
    <div className="flex items-center justify-center gap-2.5 py-12 text-[12px] text-muted">
      <Spinner />
      {label ?? t('common.loading')}
    </div>
  );
}
