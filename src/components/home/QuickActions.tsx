import { Bot, Folder, Sparkles, StickyNote } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { useI18n } from '@/i18n';
import { useDesktop } from '@/state/desktop';
import { useWindows } from '@/state/windows';

interface QuickAction {
  id: string;
  label: string;
  hint: string;
  icon: LucideIcon;
  iconClass: string;
  run: () => void;
}

export function QuickActions() {
  const { navigate } = useDesktop();
  const { openApp } = useWindows();
  const { t } = useI18n();

  const actions: QuickAction[] = [
    {
      id: 'command',
      label: t('home.quickActions.ask'),
      hint: t('home.quickActions.askHint'),
      icon: Sparkles,
      iconClass: 'bg-accent/10 text-accent',
      run: () => navigate('command'),
    },
    {
      id: 'files',
      label: t('home.quickActions.files'),
      hint: t('home.quickActions.filesHint'),
      icon: Folder,
      iconClass: 'bg-[#3f9ff3]/10 text-[#2b8edc]',
      run: () => openApp('files'),
    },
    {
      id: 'notes',
      label: t('home.quickActions.notes'),
      hint: t('home.quickActions.notesHint'),
      icon: StickyNote,
      iconClass: 'bg-[#e4a93c]/12 text-[#b97712]',
      run: () => openApp('notes'),
    },
    {
      id: 'agents',
      label: t('home.quickActions.agents'),
      hint: t('home.quickActions.agentsHint'),
      icon: Bot,
      iconClass: 'bg-[#7c6de8]/10 text-[#6b5ad7]',
      run: () => navigate('agents'),
    },
  ];

  return (
    <Card padded={false} className="p-3 short:p-2.5">
      <div className="flex items-center justify-between px-0.5">
        <h2 className="text-[12px] font-semibold tracking-[-0.01em] text-ink">
          {t('home.quickActions.title')}
        </h2>
        <span className="text-[9px] font-medium uppercase tracking-[0.12em] text-muted">
          {t('common.demo')}
        </span>
      </div>
      <div className="mt-2.5 grid grid-cols-2 gap-1.5 short:mt-2 short:gap-1">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              type="button"
              onClick={action.run}
              className="group flex items-center gap-2 rounded-[12px] border border-line/[0.06] bg-surface/40 px-2 py-1.5 text-left transition-all duration-200 ease-aether hover:border-line/10 hover:bg-surface/80 active:scale-[0.985] short:py-1"
            >
              <span
                className={`flex size-6 shrink-0 items-center justify-center rounded-[8px] transition-transform duration-200 group-hover:scale-105 ${action.iconClass}`}
              >
                <Icon className="size-3" strokeWidth={1.8} />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[10.5px] font-semibold leading-tight text-ink">
                  {action.label}
                </span>
                <span className="mt-[1px] block truncate text-[9px] text-muted short:hidden">
                  {action.hint}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
