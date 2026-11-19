import type { ReactNode } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/cn';

interface SettingsCardProps {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

export function SettingsCard({
  title,
  description,
  action,
  children,
  className,
  contentClassName,
}: SettingsCardProps) {
  return (
    <section className={cn('glass-card rounded-[22px] p-4 sm:p-5', className)}>
      <SectionHeading title={title} description={description} action={action} />
      <div className={cn('mt-4', contentClassName)}>{children}</div>
    </section>
  );
}
