import { AgentsPage } from '@/pages/AgentsPage';
import { AppsPage } from '@/pages/AppsPage';
import { CommandCenterPage } from '@/pages/CommandCenterPage';
import { FilesPage } from '@/pages/FilesPage';
import { MemoryPage } from '@/pages/MemoryPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { TasksPage } from '@/pages/TasksPage';
import { NotesApp } from '@/components/apps/NotesApp';
import { WeatherApp } from '@/components/apps/WeatherApp';
import type { AppId } from '@/types';

export function WindowContent({ appId }: { appId: AppId }) {
  switch (appId) {
    case 'command':
      return <CommandCenterPage embedded />;
    case 'agents':
      return <AgentsPage embedded />;
    case 'tasks':
      return <TasksPage embedded />;
    case 'files':
      return <FilesPage embedded />;
    case 'memory':
      return <MemoryPage embedded />;
    case 'notes':
      return <NotesApp />;
    case 'weather':
      return <WeatherApp />;
    case 'settings':
      return <SettingsPage embedded />;
    default:
      return <AppsPage />;
  }
}
