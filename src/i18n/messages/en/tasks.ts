const tasks = {
  'tasks.title': 'Tasks',
  'tasks.eyebrow': 'Work in motion',
  'tasks.description':
    'Everything the agents are moving forward — plans, progress and reviews. Tasks created by the Command Center simulation appear here automatically.',
  'tasks.newPlan': 'New plan',
  'tasks.simulatedPlan': 'Simulated plan',
  'tasks.demoNote':
    'Demo data · “Simulated plan” tasks are assembled locally by the Command Center simulation, not by a model.',
  'tasks.demoNote.simulated.one': ' {count} simulated plan in this list.',
  'tasks.demoNote.simulated.other': ' {count} simulated plans in this list.',

  'tasks.embeddedSummary': '{tasks} · {active} in progress · {review} awaiting review',
  'tasks.count.one': '{count} task',
  'tasks.count.other': '{count} tasks',
  'tasks.summary.search': '{tasks} matching “{query}”',
  'tasks.summary.searchInFilter': '{tasks} matching “{query}” · {filter}',
  'tasks.summary.filtered': '{filtered} of {total} tasks · {filter}',
  'tasks.summary.all':
    '{tasks} · {active} in progress · {review} awaiting review · {completed} completed',

  'tasks.search.placeholder': 'Search tasks, agents, tags',
  'tasks.search.aria': 'Search tasks',
  'tasks.filter.aria': 'Filter tasks by status',

  'tasks.empty.searchTitle': 'No tasks match your search',
  'tasks.empty.title': 'No tasks yet',
  'tasks.empty.filteredTitle.in_progress': 'No tasks in progress',
  'tasks.empty.filteredTitle.queued': 'No queued tasks',
  'tasks.empty.filteredTitle.review': 'Nothing awaiting review',
  'tasks.empty.filteredTitle.completed': 'No completed tasks',
  'tasks.empty.searchDescription':
    'Nothing matches “{query}”. Try a different keyword, or clear the filters to see everything.',
  'tasks.empty.searchDescriptionFiltered':
    'Nothing matches “{query}” in this view. Try a different keyword, or clear the filters to see everything.',
  'tasks.empty.description':
    'New work will appear here. Plans created in the Command Center show up automatically as simulated tasks.',

  'tasks.row.updated': 'Updated {time}',
  'tasks.progressLabel': '{title} progress',

  'tasks.step.done': 'Done',
  'tasks.step.active': 'In progress',
  'tasks.step.pending': 'Pending',

  'tasks.detail.eyebrow': 'Task details · demo',
  'tasks.detail.fallbackTitle': 'Task',
  'tasks.detail.progress': 'Progress',
  'tasks.detail.simulatedNote':
    'This plan was created locally by the Command Center demo — assembled from static templates by the UI simulation layer, not by a model. No network calls were made.',
  'tasks.detail.planTimeline': 'Plan timeline',
  'tasks.detail.stepsComplete': '{done}/{total} complete',
  'tasks.detail.output': 'Output',
  'tasks.detail.details': 'Details',
  'tasks.detail.origin': 'Origin',
  'tasks.detail.agent': 'Agent',
  'tasks.detail.created': 'Created',
  'tasks.detail.updated': 'Updated',
  'tasks.detail.due': 'Due',
  'tasks.detail.tags': 'Tags',
  'tasks.detail.roleSuffix': '{role} · simulated',
  'tasks.origin.demo': 'Demo library',
  'tasks.origin.demoTask': 'Demo library task',
  'tasks.detail.demoNote':
    'Demo data · tasks are static samples and simulated plans are generated locally in the browser. No agent was executed.',
  'tasks.detail.footerNote': 'Simulated locally · nothing was sent anywhere.',
} as const;

export type TasksMessages = typeof tasks;
export default tasks;
