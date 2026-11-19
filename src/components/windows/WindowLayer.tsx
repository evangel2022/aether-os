import { WindowFrame } from '@/components/windows/WindowFrame';
import { useI18n } from '@/i18n';
import { useWindows } from '@/state/windows';

export function WindowLayer() {
  const { windows } = useWindows();
  const { t } = useI18n();

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30"
      aria-label={t('shell.openWindowsAria')}
      role="region"
    >
      {windows.map((window) => (
        <WindowFrame key={window.id} window={window} />
      ))}
    </div>
  );
}
