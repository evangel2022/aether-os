const agents = {
  'agents.title': 'Agents',
  'agents.eyebrow': 'Collaborators',
  'agents.description':
    'Three specialists share the work — each with a clear focus, its own tools and a visible trail of activity. Everything here is simulated demo data, not a live agent backend.',
  'agents.createPlan': 'Create a plan',
  'agents.viewTasks': 'View tasks',
  'agents.section.title': 'Your team',
  'agents.section.description': 'Each agent plans, executes and reports in the open.',
  'agents.workingNow.one': '1 working now',
  'agents.workingNow.other': '{count} working now',
  'agents.summary.one': '1 specialist · {working} working · no agent backend',
  'agents.summary.other': '{count} specialists · {working} working · no agent backend',
  'agents.demoNote.title': 'Demo sandbox · no agent backend.',
  'agents.demoNote.body': 'Statuses, progress and activity are illustrative and stored locally.',

  'agents.card.currentFocus': 'Current focus',
  'agents.card.focusProgress': '{name} focus progress',

  'agents.stats.tasksDone': 'Tasks done',
  'agents.stats.success': 'Success',
  'agents.stats.avgTime': 'Avg time',
  'agents.stats.successRate': 'Success rate',
  'agents.stats.avgDuration': 'Avg duration',

  'agents.detail.eyebrow': 'Agent profile · demo',
  'agents.detail.fallbackTitle': 'Agent',
  'agents.detail.demoProfile': 'Demo profile',
  'agents.detail.simulatedStatus': 'Simulated status',
  'agents.detail.status.working': 'Working through its current focus in the demo sandbox.',
  'agents.detail.status.waiting': 'Paused in this simulation — awaiting a human review step.',
  'agents.detail.status.idle': 'Available for new work in this simulation.',
  'agents.detail.capabilities': 'Capabilities',
  'agents.detail.tools': 'Tools',
  'agents.detail.recentActivity': 'Recent activity',
  'agents.detail.demoNote':
    'Demo sandbox · no agent backend. Status, progress and activity are illustrative only — nothing was executed and no data leaves this prototype.',
  'agents.detail.footerNote': 'Simulated locally · no agent was called.',
} as const;

export type AgentsMessages = typeof agents;
export default agents;
