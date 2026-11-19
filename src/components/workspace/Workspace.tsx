import { AnimatePresence, motion } from 'framer-motion';
import type { ComponentType } from 'react';
import { AgentsPage } from '@/pages/AgentsPage';
import { AppsPage } from '@/pages/AppsPage';
import { CommandCenterPage } from '@/pages/CommandCenterPage';
import { FilesPage } from '@/pages/FilesPage';
import { HomePage } from '@/pages/HomePage';
import { MemoryPage } from '@/pages/MemoryPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { TasksPage } from '@/pages/TasksPage';
import { useI18n } from '@/i18n';
import { useDesktop } from '@/state/desktop';
import type { PageId } from '@/types';

const PAGES: Record<PageId, ComponentType> = {
  home: HomePage,
  command: CommandCenterPage,
  agents: AgentsPage,
  tasks: TasksPage,
  apps: AppsPage,
  files: FilesPage,
  memory: MemoryPage,
  settings: SettingsPage,
};

export function Workspace() {
  const { page } = useDesktop();
  const { t } = useI18n();
  const Page = PAGES[page];

  return (
    <section
      id="workspace"
      aria-label={t('shell.workspaceAria')}
      className="glass-panel relative min-w-0 flex-1 overflow-hidden rounded-[28px]"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-white/30 to-transparent dark:from-white/[0.03]"
        aria-hidden
      />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={page}
          className="relative h-full"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <Page />
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
