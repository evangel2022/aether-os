import { ArrowUpRight, Brain, History, LockKeyhole, ShieldCheck } from 'lucide-react';
import { AgentAvatar } from '@/components/common/AgentAvatar';
import { AgentStatusBadge } from '@/components/common/StatusBadge';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AGENTS } from '@/data/agents';
import { useI18n } from '@/i18n';
import type { TranslationKey } from '@/i18n';
import { cn } from '@/lib/cn';
import { truncate } from '@/lib/format';
import { useDemoData } from '@/state/demo-data';
import { useDesktop } from '@/state/desktop';
import type { CommandRun } from '@/types';

const runStatusKey: Record<CommandRun['status'], TranslationKey> = {
  running: 'command.context.run.running',
  ready: 'command.context.run.ready',
  cancelled: 'command.context.run.cancelled',
};

const guardrailKeys: TranslationKey[] = [
  'command.context.guardrailNoNetwork',
  'command.context.guardrailNoModel',
  'command.context.guardrailVisible',
  'command.context.guardrailReview',
];

export function CommandContext({
  history,
  onUsePrompt,
}: {
  history: CommandRun[];
  onUsePrompt: (prompt: string) => void;
}) {
  const { memories } = useDemoData();
  const { navigate } = useDesktop();
  const { t, tr } = useI18n();
  const pinned = memories.filter((memory) => memory.pinned).slice(0, 3);

  return (
    <aside aria-label={t('command.context.aria')} className="space-y-3.5">
      <Card padded={false} className="p-4">
        <SectionHeading
          title={t('command.context.sessionTitle')}
          description={t('command.context.sessionDescription')}
          action={<Badge tone="demo">{t('common.demo')}</Badge>}
        />
        <div className="mt-3 space-y-1.5">
          {pinned.map((memory) => (
            <div
              key={memory.id}
              className="flex items-start gap-2.5 rounded-[13px] border border-line/[0.06] bg-surface/35 px-2.5 py-2"
            >
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-[8px] bg-accent/[0.08] text-accent">
                <Brain className="size-3" strokeWidth={1.8} />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[10.5px] font-medium text-ink-2">
                  {tr(memory.title)}
                </p>
                <p className="truncate text-[9px] text-muted">{tr(memory.source)}</p>
              </div>
            </div>
          ))}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="mt-2 h-7 w-full justify-between rounded-[10px] px-2 text-[10px]"
          onClick={() => navigate('memory')}
        >
          {t('command.context.openMemory')}
          <ArrowUpRight className="size-3" />
        </Button>
      </Card>

      <Card padded={false} className="p-4">
        <SectionHeading
          title={t('command.context.agentsOnCall')}
          description={t('command.context.simulatedAvailability')}
        />
        <div className="mt-2.5 space-y-2">
          {AGENTS.map((agent) => (
            <div key={agent.id} className="flex items-center gap-2.5">
              <AgentAvatar agent={agent} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[10.5px] font-medium text-ink-2">
                  {tr(agent.shortName)}
                </p>
                <p className="truncate text-[8.5px] text-muted">{tr(agent.role)}</p>
              </div>
              <AgentStatusBadge status={agent.status} />
            </div>
          ))}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="mt-2 h-7 w-full justify-between rounded-[10px] px-2 text-[10px]"
          onClick={() => navigate('agents')}
        >
          {t('command.context.meetAgents')}
          <ArrowUpRight className="size-3" />
        </Button>
      </Card>

      <Card padded={false} className="p-4">
        <div className="flex items-center gap-2">
          <span className="flex size-6 items-center justify-center rounded-[8px] bg-positive/10 text-positive">
            <ShieldCheck className="size-3.5" strokeWidth={1.8} />
          </span>
          <h2 className="text-[12px] font-semibold text-ink">
            {t('command.context.guardrails')}
          </h2>
        </div>
        <ul className="mt-3 space-y-2">
          {guardrailKeys.map((key) => (
            <li
              key={key}
              className="flex items-start gap-2 text-[9.5px] leading-relaxed text-muted"
            >
              <span className="mt-[5px] size-1 shrink-0 rounded-full bg-positive/70" />
              {t(key)}
            </li>
          ))}
        </ul>
        <p className="mt-3 flex items-center gap-1.5 border-t border-line/[0.06] pt-2.5 text-[8.5px] text-muted/80">
          <LockKeyhole className="size-2.5" />
          {t('command.context.localDemoOnly')}
        </p>
      </Card>

      {history.length > 0 && (
        <Card padded={false} className="p-4">
          <SectionHeading
            title={t('command.context.recentRequests')}
            action={<History className="size-3.5 text-muted/70" />}
          />
          <div className="mt-2 space-y-0.5">
            {history.slice(0, 3).map((run) => (
              <button
                key={run.id}
                type="button"
                onClick={() => onUsePrompt(run.prompt)}
                className="flex w-full items-center gap-2 rounded-lg px-1.5 py-1.5 text-left transition-colors hover:bg-line/[0.035]"
              >
                <span
                  className={cn(
                    'size-1.5 shrink-0 rounded-full',
                    run.status === 'running' && 'bg-accent animate-soft-pulse',
                    run.status === 'ready' && 'bg-positive',
                    run.status === 'cancelled' && 'bg-muted/50',
                  )}
                />
                <span className="min-w-0 flex-1 truncate text-[9.5px] text-ink-2">
                  {truncate(run.prompt, 38)}
                </span>
                <span className="shrink-0 text-[8px] text-muted">
                  {t(runStatusKey[run.status])}
                </span>
              </button>
            ))}
          </div>
        </Card>
      )}
    </aside>
  );
}
