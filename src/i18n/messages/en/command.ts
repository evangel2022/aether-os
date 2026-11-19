const command = {
  'command.eyebrow': 'Aether Intelligence',
  'command.title': 'Command Center',
  'command.description': 'Ask for an outcome. See the plan before anything moves.',
  'command.demoBadge': 'Demo simulation',
  'command.tasksButton': 'Tasks',

  'command.composer.aria': 'Command composer',
  'command.composer.title': 'Start with an intent',
  'command.composer.subtitle': 'Natural language in · local demo, no model call',
  'command.composer.inputAria': 'Ask Aether for a plan',
  'command.composer.placeholder':
    'Describe an outcome — a launch plan, a difficult summary, a product decision…',
  'command.composer.shortcutToPlan': 'to plan',
  'command.composer.planning': 'Planning',
  'command.composer.submit': 'Create plan',

  'command.inspiration.aria': 'Command inspiration',
  'command.inspiration.title': 'Try a demo request',
  'command.inspiration.description':
    'These prompts exercise the same local planning flow. Nothing is executed by an agent.',
  'command.inspiration.stepOne': 'Describe the outcome',
  'command.inspiration.stepTwo': 'Watch the plan build',
  'command.inspiration.stepThree': 'Review it yourself',

  'command.suggestion.launch.title': 'Plan a launch week',
  'command.suggestion.launch.prompt':
    'Plan a calm, three-day launch moment for the Aether OS prototype.',
  'command.suggestion.launch.hint': 'Research + Writing',
  'command.suggestion.narrative.title': 'Shape a narrative',
  'command.suggestion.narrative.prompt':
    'Turn my research notes into a short launch narrative about quiet agency.',
  'command.suggestion.narrative.hint': 'Writing',
  'command.suggestion.audit.title': 'Audit an interaction',
  'command.suggestion.audit.prompt':
    'Audit the window manager for edge cases around focus, pinning and restore.',
  'command.suggestion.audit.hint': 'Coding',
  'command.suggestion.summary.title': 'Summarise the week',
  'command.suggestion.summary.prompt':
    'Summarise what the team decided this week and list the open questions.',
  'command.suggestion.summary.hint': 'Research',

  'command.plan.aria': 'Simulated plan',
  'command.plan.title': 'Simulated plan',
  'command.plan.noModel': 'No model called',
  'command.plan.agentRoute': 'Demo agent route',
  'command.plan.progressAria': 'Simulated plan progress',
  'command.plan.stages': '{completed}/{total} stages',
  'command.plan.status.running': 'Simulating locally',
  'command.plan.status.ready': 'Ready for review',
  'command.plan.status.cancelled': 'Stopped',
  'command.plan.step.done': 'Done',
  'command.plan.step.now': 'Now',
  'command.plan.step.waiting': 'Waiting',
  'command.plan.stop': 'Stop',
  'command.plan.readyTitle': 'Demo plan complete — your move.',
  'command.plan.readyDescription':
    'A task titled “{title}” was added to the local Tasks demo. Nothing was executed by a real agent.',
  'command.plan.openTasks': 'Open in Tasks',
  'command.plan.cancelledNote':
    'This simulation was stopped before it finished. No task was created and nothing was executed.',

  'command.step.intent.label': 'Read the intent',
  'command.step.intent.detail':
    'Interpreted “{prompt}” locally in the demo shell',
  'command.step.context.label': 'Gather context',
  'command.step.context.detail':
    'Attached 3 pinned demo memories and the current workspace context.',
  'command.step.route.label': 'Route to an agent',
  'command.step.route.detail':
    '{agent} selected. This is a local routing simulation, not a model call.',
  'command.step.draft.label': 'Draft a plan',
  'command.step.draft.detail':
    'Prepared a reviewable outline with five visible steps.',
  'command.step.ready.label': 'Ready for review',
  'command.step.ready.detail':
    'Demo plan complete. A simulated task will be added to Tasks.',

  'command.context.aria': 'Command context',
  'command.context.sessionTitle': 'Session context',
  'command.context.sessionDescription': 'What this demo plan can draw from',
  'command.context.openMemory': 'Open Memory',
  'command.context.agentsOnCall': 'Agents on call',
  'command.context.simulatedAvailability': 'Simulated availability',
  'command.context.meetAgents': 'Meet the agents',
  'command.context.guardrails': 'Guardrails',
  'command.context.guardrailNoNetwork': 'No network requests',
  'command.context.guardrailNoModel': 'No model or agent backend',
  'command.context.guardrailVisible': 'Every stage stays visible',
  'command.context.guardrailReview': 'A human reviews before anything moves',
  'command.context.localDemoOnly': 'Local demo only · no system access',
  'command.context.recentRequests': 'Recent demo requests',

  'command.context.run.running': 'Simulating',
  'command.context.run.ready': 'Ready',
  'command.context.run.cancelled': 'Stopped',

  'command.task.description':
    'A reviewable plan created from the Command Center demo request “{prompt}”. Everything here is simulated locally — no model or agent backend was called.',
  'command.task.due': 'Awaiting review',
  'command.task.tagCommandDemo': 'Command demo',
  'command.task.tagSimulated': 'Simulated',
  'command.task.output':
    'Deterministic demo output. The plan was assembled from local templates by the UI simulation layer, not by a language model.',
  'command.notification.title': 'Demo plan ready for review',
  'command.notification.body':
    '{agent} simulated a plan: “{title}”.',
} as const;

export type CommandMessages = typeof command;
export default command;
