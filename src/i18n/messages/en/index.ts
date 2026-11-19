import common from './common';
import shell from './shell';
import home from './home';
import command from './command';
import agents from './agents';
import tasks from './tasks';
import apps from './apps';
import files from './files';
import memory from './memory';
import settings from './settings';
import notes from './notes';
import weather from './weather';

export const enUS = {
  ...common,
  ...shell,
  ...home,
  ...command,
  ...agents,
  ...tasks,
  ...apps,
  ...files,
  ...memory,
  ...settings,
  ...notes,
  ...weather,
} as const;

export type TranslationKey = keyof typeof enUS;
