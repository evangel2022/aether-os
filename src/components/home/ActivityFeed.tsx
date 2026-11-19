import { ArrowRight } from 'lucide-react';
import { AgentAvatar } from '@/components/common/AgentAvatar';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AGENTS } from '@/data/agents';
import { useI18n } from '@/i18n';
import { useDesktop } from '@/state/desktop';

export function ActivityFeed() {
  const { navigate } = useDesktop();
  const { t, tr } = useI18n();
  const entries = AGENTS.map((agent) => ({
    agent,
    event: agent.activity[0],
  })).filter((entry) => Boolean(entry.event));

  return (
    <Card padded={false} className="flex h-full min-h-[186px] flex-col p-4">
      <div className="flex items-start justify-between gap-3">
        <SectionHeading
          title={t('home.activity.title')}
          description={t('home.activity.description')}
        />
        <Button
          variant="ghost"
          size="sm"
          className="-mr-1.5 shrink-0 text-[10px]"
          onClick={() => navigate('agents')}
          trailingIcon={<ArrowRight className="size-3" strokeWidth={2} />}
        >
          {t('home.activity.button')}
        </Button>
      </div>

      <div className="mt-2.5 flex flex-1 flex-col justify-center gap-0.5">
        {entries.map(({ agent, event }) => (
          <div
            key={agent.id}
            className="flex items-center gap-2.5 rounded-[12px] px-1 py-[5px] transition-colors hover:bg-line/[0.03]"
          >
            <AgentAvatar agent={agent} size="sm" />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[10.5px] font-medium text-ink-2">
                {event ? tr(event.title) : ''}
              </span>
              <span className="mt-[1px] block text-[9px] text-muted">
                {tr(agent.shortName)} · {event ? tr(event.time) : ''}
              </span>
            </span>
            <span className="shrink-0 rounded-full border border-line/[0.07] px-1.5 py-[2px] text-[8px] font-medium uppercase tracking-[0.08em] text-muted/80">
              {t('home.activity.simulated')}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
