const home = {
  'home.greeting.late': 'A quiet start, {name}.',
  'home.greeting.morning': 'Good morning, {name}.',
  'home.greeting.afternoon': 'Good afternoon, {name}.',
  'home.greeting.evening': 'Good evening, {name}.',
  'home.greeting.winding': 'Winding down, {name}.',
  'home.demoWorkspace': 'Demo workspace',
  'home.summary':
    '{working} agents are moving work forward, {waiting} is waiting for your review.',
  'home.localDemoNote': 'Everything here is local demo data.',
  'home.systemsCalm': 'All systems calm',
  'home.openCommandCenter': 'Open Command Center',

  'home.command.title': 'Aether Command',
  'home.command.subtitle': 'A global, simulated command bar',
  'home.command.anywhere': 'anywhere',
  'home.command.heading': 'What should we take care of?',
  'home.command.description':
    'Describe an outcome in your own words. Aether will make the plan visible before anything moves.',
  'home.command.descriptionCompact':
    'Describe an outcome. Aether makes the plan visible before anything moves.',
  'home.command.placeholder': 'Plan a launch moment, audit an interaction…',
  'home.command.inputAria': 'Ask Aether to create a plan',
  'home.command.submit': 'Plan',
  'home.command.localSimulation': 'Simulated locally · no model',

  'home.quickActions.title': 'Quick actions',
  'home.quickActions.ask': 'Ask Aether',
  'home.quickActions.askHint': 'Create a plan',
  'home.quickActions.files': 'Files',
  'home.quickActions.filesHint': 'Browse the demo',
  'home.quickActions.notes': 'Notes',
  'home.quickActions.notesHint': 'Capture a thought',
  'home.quickActions.agents': 'Agents',
  'home.quickActions.agentsHint': 'See who is working',

  'home.system.title': 'System',
  'home.system.demo': 'Demo',
  'home.system.battery': 'Battery',
  'home.system.storage': 'Storage',
  'home.system.aria': 'Demo system status',

  'home.recentTasks.title': 'Recent tasks',
  'home.recentTasks.description': 'A calm view of demo work in motion',
  'home.recentTasks.viewAll': 'View all',
  'home.recentTasks.simulatedShort': 'Sim',
  'home.recentTasks.openAria': 'Open task: {title}',

  'home.agents.title': 'Agents',
  'home.agents.subtitle': '{working} working · simulated demo states',
  'home.agents.meetTeam': 'Meet the team',
  'home.agents.viewAria': 'View {name} status',

  'home.memory.title': 'Held in context',
  'home.memory.description': 'Pinned demo memories ready for the next request',
  'home.memory.button': 'Memory',
  'home.memory.contextLabel': 'Context',
  'home.memory.openAria': 'Open memory: {title}',

  'home.activity.title': 'Quiet activity',
  'home.activity.description': 'A simulated trail from the last hour',
  'home.activity.button': 'Agents',
  'home.activity.simulated': 'Simulated',

  'home.footer.disclaimer':
    'Aether UI-1 prototype · agent activity, tasks and system data are simulated',
  'home.footer.tagline': 'Made for a calmer computer',
} as const;

export type HomeMessages = typeof home;
export default home;
