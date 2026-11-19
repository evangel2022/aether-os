import { ArrowRight } from 'lucide-react';
import { AgentAvatar } from '@/components/common/AgentAvatar';
import { AgentStatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { AGENTS } from '@/data/agents';
import { useI18n } from '@/i18n';
import { useDesktop } from '@/state/desktop';

export function AgentPulse() {
  const { navigate } = useDesktop();
  const { t, tr } = useI18n();
  const working = AGENTS.filter((agent) => agent.status === 'working').length;

  return (
    <Card padded={false} className="flex h-full min-h-[216px] flex-col overflow-hidden">
      <div className="flex items-start justify-between gap-3 px-4 pb-1 pt-3.5">
        <div>
          <h2 className="text-[12.5px] font-semibold tracking-[-0.01em] text-ink">
            {t('home.agents.title')}
          </h2>
          <p className="mt-0.5 text-[9.5px] text-muted">
            {t('home.agents.subtitle', { working })}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="-mr-1.5 shrink-0 text-[10px]"
          onClick={() => navigate('agents')}
          trailingIcon={<ArrowRight className="size-3" strokeWidth={2} />}
        >
          {t('home.agents.meetTeam')}
        </Button>
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-center px-2 pb-1.5">
        {AGENTS.map((agent) => (
          <button
            key={agent.id}
            type="button"
            onClick={() => navigate('agents')}
            aria-label={t('home.agents.viewAria', { name: tr(agent.name) })}
            className="group flex w-full items-center gap-2.5 rounded-[12px] px-2 py-[6px] text-left transition-colors duration-150 hover:bg-line/[0.03]"
          >
            <AgentAvatar agent={agent} size="sm" showStatus />
            <span className="min-w-0 flex-1">
              <span className="flex items-center justify-between gap-2">
                <span className="truncate text-[11px] font-semibold leading-tight text-ink">
                  {tr(agent.name)}
                </span>
                <AgentStatusBadge status={agent.status} />
              </span>
              <span className="mt-[2px] flex items-center justify-between gap-2">
                <span className="truncate text-[9px] text-muted">{tr(agent.focus)}</span>
                <span className="shrink-0 text-[9px] font-medium tabular-nums text-muted/80">
                  {agent.progress}%
                </span>
              </span>
            </span>
          </button>
        ))}
      </div>
    </Card>
  );
}
