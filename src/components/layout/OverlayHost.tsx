import { AnimatePresence } from 'framer-motion';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { ControlCenter } from '@/components/layout/ControlCenter';
import { NotificationPanel } from '@/components/layout/NotificationPanel';
import { UserMenu } from '@/components/layout/UserMenu';
import { useDesktop } from '@/state/desktop';

export function OverlayHost() {
  const { overlay } = useDesktop();

  return (
    <>
      <AnimatePresence>
        {overlay === 'control-center' && <ControlCenter key="control-center" />}
      </AnimatePresence>
      <AnimatePresence>
        {overlay === 'notifications' && <NotificationPanel key="notifications" />}
      </AnimatePresence>
      <AnimatePresence>
        {overlay === 'user' && <UserMenu key="user" />}
      </AnimatePresence>
      <AnimatePresence>
        {overlay === 'command' && <CommandPalette key="command" />}
      </AnimatePresence>
    </>
  );
}
