import { ArrowRight, ChevronRight } from 'lucide-react';
import { AgentAvatar } from '@/components/common/AgentAvatar';
import { TaskStatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { getAgent } from '@/data/agents';
import { useI18n } from '@/i18n';
import { useDemoData } from '@/state/demo-data';
import { useDesktop } from '@/state/desktop';

export function RecentTasks() {
  const { tasks } = useDemoData();
  const { navigate } = useDesktop();
  const { t, tr } = useI18n();
  const recent = tasks.slice(0, 3);

  return (
    <Card padded={false} className="flex h-full min-h-[216px] flex-col overflow-hidden">
      <div className="flex items-start justify-between gap-3 px-4 pb-1.5 pt-3.5">
        <SectionHeading
          title={t('home.recentTasks.title')}
          description={t('home.recentTasks.description')}
        />
        <Button
          variant="ghost"
          size="sm"
          className="-mr-1.5 shrink-0 text-[10.5px]"
          onClick={() => navigate('tasks')}
          trailingIcon={<ArrowRight className="size-3" strokeWidth={2} />}
        >
          {t('home.recentTasks.viewAll')}
        </Button>
      </div>

      <div className="min-h-0 flex-1">
        {recent.map((task) => {
          const agent = getAgent(task.agentId);
          return (
            <button
              key={task.id}
              type="button"
              onClick={() => navigate('tasks')}
              aria-label={t('home.recentTasks.openAria', { title: tr(task.title) })}
              className="group flex w-full items-center gap-3 border-t border-line/[0.055] px-4 py-2 text-left transition-colors duration-150 hover:bg-line/[0.025]"
            >
              <AgentAvatar agent={agent} size="sm" />
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1.5">
                  <span className="truncate text-[11.5px] font-medium leading-tight text-ink">
                    {tr(task.title)}
                  </span>
                  {task.origin === 'simulated' && (
                    <Badge tone="demo" className="shrink-0 px-1.5 py-0 text-[8px]">
                      {t('home.recentTasks.simulatedShort')}
                    </Badge>
                  )}
                </span>
                <span className="mt-0.5 flex items-center gap-1.5 text-[9.5px] text-muted">
                  <span className="truncate">{tr(agent.name)}</span>
                  <span aria-hidden>·</span>
                  <span className="shrink-0">{tr(task.updatedAt)}</span>
                </span>
              </span>
              <span className="hidden shrink-0 sm:block">
                <TaskStatusBadge status={task.status} />
              </span>
              <ChevronRight className="size-3.5 shrink-0 text-muted/45 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-muted" />
            </button>
          );
        })}
      </div>
    </Card>
  );
}
