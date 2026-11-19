import { AGENT_BY_ID } from '@/data/agents';
import { translate, translateAll } from '@/i18n/translate';
import { createId, deriveTaskTitle, truncate } from '@/lib/format';
import type {
  AgentId,
  CommandRun,
  CommandStep,
  CommandSuggestion,
  LocalizedText,
} from '@/types';

/** How long each simulated planning stage stays active. */
export const SIMULATED_STEP_MS = 900;

export const COMMAND_SUGGESTIONS: CommandSuggestion[] = [
  {
    title: translateAll('command.suggestion.launch.title'),
    prompt: translateAll('command.suggestion.launch.prompt'),
    hint: translateAll('command.suggestion.launch.hint'),
  },
  {
    title: translateAll('command.suggestion.narrative.title'),
    prompt: translateAll('command.suggestion.narrative.prompt'),
    hint: translateAll('command.suggestion.narrative.hint'),
  },
  {
    title: translateAll('command.suggestion.audit.title'),
    prompt: translateAll('command.suggestion.audit.prompt'),
    hint: translateAll('command.suggestion.audit.hint'),
  },
  {
    title: translateAll('command.suggestion.summary.title'),
    prompt: translateAll('command.suggestion.summary.prompt'),
    hint: translateAll('command.suggestion.summary.hint'),
  },
];

/** Deterministic, keyword-based agent routing for the demo. No AI is called. */
export function routeAgent(prompt: string): AgentId {
  const value = prompt.toLowerCase();
  if (
    /(code|build|component|bug|api|test|refactor|implement|interaction|window)/.test(value) ||
    /(代码|构建|组件|缺陷|测试|重构|实现|交互|窗口|audit)/.test(value)
  ) {
    return 'coding';
  }
  if (
    /(write|draft|narrative|copy|email|story|announcement|tone|summary)/.test(value) ||
    /(写作|起草|叙事|文案|邮件|故事|发布|语气|总结|整理)/.test(value)
  ) {
    return 'writing';
  }
  return 'research';
}

function localizedAgentName(agentId: AgentId, locale: 'zh-CN' | 'en-US'): string {
  return AGENT_BY_ID[agentId].name[locale];
}

function makeSteps(prompt: string, agentId: AgentId): CommandStep[] {
  const inlinePrompt = truncate(
    prompt.replace(/[。．.!?！？]+$/u, ''),
    54,
  );
  return [
    {
      id: 'understand',
      label: translateAll('command.step.intent.label'),
      detail: translateAll('command.step.intent.detail', { prompt: inlinePrompt }),
      status: 'active',
    },
    {
      id: 'context',
      label: translateAll('command.step.context.label'),
      detail: translateAll('command.step.context.detail'),
      status: 'pending',
    },
    {
      id: 'route',
      label: translateAll('command.step.route.label'),
      detail: {
        'zh-CN': translate('zh-CN', 'command.step.route.detail', {
          agent: localizedAgentName(agentId, 'zh-CN'),
        }),
        'en-US': translate('en-US', 'command.step.route.detail', {
          agent: localizedAgentName(agentId, 'en-US'),
        }),
      },
      status: 'pending',
    },
    {
      id: 'draft',
      label: translateAll('command.step.draft.label'),
      detail: translateAll('command.step.draft.detail'),
      status: 'pending',
    },
    {
      id: 'ready',
      label: translateAll('command.step.ready.label'),
      detail: translateAll('command.step.ready.detail'),
      status: 'pending',
    },
  ];
}

export function buildCommandRun(prompt: string): CommandRun {
  const cleanPrompt = prompt.trim();
  const agentId = routeAgent(cleanPrompt);
  const title = deriveTaskTitle(cleanPrompt);
  const resultTitle: LocalizedText = {
    'zh-CN': title,
    'en-US': title,
  };

  return {
    id: createId('run'),
    prompt: cleanPrompt,
    createdAt: translateAll('common.justNow'),
    status: 'running',
    activeStep: 0,
    steps: makeSteps(cleanPrompt, agentId),
    agentId,
    resultTitle,
    simulated: true,
  };
}

/** Advance one stage. The last stage completes the simulated run. */
export function advanceCommandRun(run: CommandRun): CommandRun {
  if (run.status !== 'running') return run;

  const nextIndex = run.activeStep + 1;
  const isComplete = nextIndex >= run.steps.length;
  const steps: CommandStep[] = run.steps.map((step, index) => {
    if (index < Math.min(nextIndex, run.steps.length)) {
      return { ...step, status: 'done' };
    }
    if (!isComplete && index === nextIndex) {
      return { ...step, status: 'active' };
    }
    return { ...step, status: 'pending' };
  });

  if (isComplete) {
    return {
      ...run,
      status: 'ready',
      activeStep: run.steps.length - 1,
      steps: run.steps.map((step) => ({ ...step, status: 'done' })),
    };
  }

  return { ...run, activeStep: nextIndex, steps };
}
