import { DesktopShell } from '@/components/desktop/DesktopShell';
import { I18nProvider } from '@/i18n/I18nProvider';
import { DemoDataProvider } from '@/state/demo-data';
import { DesktopProvider } from '@/state/desktop';
import { SettingsProvider } from '@/state/settings';
import { WindowManagerProvider } from '@/state/windows';

export default function App() {
  return (
    <SettingsProvider>
      <I18nProvider>
        <DemoDataProvider>
          <DesktopProvider>
            <WindowManagerProvider>
              <DesktopShell />
            </WindowManagerProvider>
          </DesktopProvider>
        </DemoDataProvider>
      </I18nProvider>
    </SettingsProvider>
  );
}
