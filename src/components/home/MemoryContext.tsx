import { ArrowRight, Brain, Pin } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useI18n } from '@/i18n';
import { useDemoData } from '@/state/demo-data';
import { useDesktop } from '@/state/desktop';

export function MemoryContext() {
  const { memories } = useDemoData();
  const { navigate } = useDesktop();
  const { t, tr } = useI18n();
  const pinned = memories.filter((memory) => memory.pinned).slice(0, 3);

  return (
    <Card padded={false} className="flex h-full min-h-[186px] flex-col p-4">
      <div className="flex items-start justify-between gap-3">
        <SectionHeading
          title={t('home.memory.title')}
          description={t('home.memory.description')}
        />
        <Button
          variant="ghost"
          size="sm"
          className="-mr-1.5 shrink-0 text-[10px]"
          onClick={() => navigate('memory')}
          trailingIcon={<ArrowRight className="size-3" strokeWidth={2} />}
        >
          {t('home.memory.button')}
        </Button>
      </div>

      <div className="mt-3 grid min-h-0 flex-1 gap-2 sm:grid-cols-3">
        {pinned.map((memory) => (
          <button
            key={memory.id}
            type="button"
            onClick={() => navigate('memory')}
            aria-label={t('home.memory.openAria', { title: tr(memory.title) })}
            className="group flex min-w-0 flex-col rounded-[14px] border border-line/[0.06] bg-surface/40 p-2.5 text-left transition-all duration-200 ease-aether hover:border-line/12 hover:bg-surface/80"
          >
            <span className="flex items-center justify-between gap-2 text-muted">
              <span className="flex items-center gap-1.5 text-[8.5px] font-semibold uppercase tracking-[0.1em]">
                <Brain className="size-2.5 text-accent/75" />
                {t('home.memory.contextLabel')}
              </span>
              <Pin className="size-2.5 fill-current text-accent/60" />
            </span>
            <span className="mt-1.5 truncate text-[10.5px] font-semibold text-ink">
              {tr(memory.title)}
            </span>
            <span className="mt-1 line-clamp-2 text-[9.5px] leading-relaxed text-muted">
              {tr(memory.summary)}
            </span>
          </button>
        ))}
      </div>
    </Card>
  );
}
