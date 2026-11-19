import { describe, expect, it } from 'vitest';
import {
  advanceCommandRun,
  buildCommandRun,
  routeAgent,
} from '@/lib/command-simulation';

describe('command simulation', () => {
  it('routes prompts to a deterministic demo agent in both languages', () => {
    expect(routeAgent('Audit the window manager for edge cases')).toBe('coding');
    expect(routeAgent('Draft a short launch narrative')).toBe('writing');
    expect(routeAgent('Summarise the research on ambient computing')).toBe('research');
    expect(routeAgent('审查窗口管理器的焦点与恢复行为')).toBe('coding');
    expect(routeAgent('起草一段简短的发布叙事')).toBe('writing');
    expect(routeAgent('本周环境计算的调研发现')).toBe('research');
  });

  it('builds a bilingual, local-only simulated plan', () => {
    const run = buildCommandRun('Plan a calm launch week for Aether OS');
    expect(run.simulated).toBe(true);
    expect(run.status).toBe('running');
    expect(run.steps).toHaveLength(5);
    expect(run.steps[0]?.status).toBe('active');
    expect(
      run.steps.every(
        (step) => step.detail['zh-CN'].length > 0 && step.detail['en-US'].length > 0,
      ),
    ).toBe(true);
    expect(run.steps.every((step) => step.label['zh-CN'].length > 0)).toBe(true);
    expect(run.resultTitle['en-US']).toBe('Plan a calm launch week for Aether OS');
    expect(run.createdAt['zh-CN']).toBe('刚刚');
    expect(run.createdAt['en-US']).toBe('Just now');
  });

  it('advances through every stage and ends ready for review', () => {
    let run = buildCommandRun('Draft a short narrative');
    for (let index = 0; index < run.steps.length; index += 1) {
      run = advanceCommandRun(run);
    }
    expect(run.status).toBe('ready');
    expect(run.steps.every((step) => step.status === 'done')).toBe(true);
    expect(run.activeStep).toBe(run.steps.length - 1);
  });

  it('does not advance a cancelled simulation', () => {
    const run = buildCommandRun('Audit a component');
    const cancelled = { ...run, status: 'cancelled' as const };
    expect(advanceCommandRun(cancelled)).toEqual(cancelled);
  });
});
