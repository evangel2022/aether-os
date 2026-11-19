const notes = {
  'notes.title': 'Notes',
  'notes.localOnly': 'Local to this window · no sync',
  'notes.newNote': 'New note',
  'notes.listTitle': 'Notes',
  'notes.emptyList': 'No notes yet. Use “New note” to start one.',
  'notes.sessionOnly': 'Session only · demo notes',
  'notes.localDemo': 'Local demo',
  'notes.savedLocally': 'Saved locally',
  'notes.savingLocally': 'Saving locally…',
  'notes.deleteNote': 'Delete note',
  'notes.titleAria': 'Note title',
  'notes.untitled': 'Untitled note',
  'notes.edited': 'Edited {time} · local demo',
  'notes.bodyAria': 'Note body',
  'notes.bodyPlaceholder': 'Start writing. This note never leaves the window.',
  'notes.emptySnippet': 'Empty note',
  'notes.wordCountOne': '{count} word',
  'notes.wordCount': '{count} words',
  'notes.charCountOne': '{count} character',
  'notes.charCount': '{count} characters',
  'notes.emptyTitle': 'No notes in this window',
  'notes.emptyDescription':
    'Create a local demo note — it lives only in this window and disappears when it closes.',
  'notes.updated.justNow': 'Just now',
  'notes.seed.morningBrief.title': 'Morning brief',
  'notes.seed.morningBrief.body':
    'Three things that matter today:\n- Review the Command Center plan with the team\n- Draft the weekly recap before lunch\n- Ask about the new onboarding copy\n\nEverything on this page is a local demo note. It is never synced or sent anywhere.',
  'notes.seed.morningBrief.updated': '9:41 AM',
  'notes.seed.quietIdeas.title': 'Quiet ideas',
  'notes.seed.quietIdeas.body':
    'A weather glance that never asks for a location.\nNotes that stay on this device.\nA settings page that explains what is real and what is simulated.\n\nKeep the desktop calm, and let the details carry the personality.',
  'notes.seed.quietIdeas.updated': 'Yesterday',
  'notes.seed.weekendList.title': 'Weekend list',
  'notes.seed.weekendList.body':
    'Saturday\n- Farmers market, 9am\n- Pick up the repaired bike\n- Call Mum\n\nSunday\n- Long walk along the bay\n- Read two chapters\n- Plan next week',
  'notes.seed.weekendList.updated': 'Monday',
} as const;

export type NotesMessages = typeof notes;
export default notes;
