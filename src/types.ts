import type { LucideIcon } from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*  Locale                                                                    */
/* -------------------------------------------------------------------------- */

export const LOCALES = ['zh-CN', 'en-US'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'zh-CN';

/** A piece of product/demo copy that must exist in every supported language. */
export interface LocalizedText {
  'zh-CN': string;
  'en-US': string;
}

/* -------------------------------------------------------------------------- */
/*  Navigation & applications                                                 */
/* -------------------------------------------------------------------------- */

export type PageId =
  | 'home'
  | 'command'
  | 'agents'
  | 'tasks'
  | 'apps'
  | 'files'
  | 'memory'
  | 'settings';

export type AppId =
  | 'command'
  | 'agents'
  | 'tasks'
  | 'files'
  | 'memory'
  | 'notes'
  | 'weather'
  | 'settings';

export type AppTone =
  | 'azure'
  | 'iris'
  | 'mint'
  | 'sky'
  | 'violet'
  | 'sand'
  | 'slate'
  | 'cloud';

export interface AppDefinition {
  id: AppId;
  name: LocalizedText;
  tagline: LocalizedText;
  icon: LucideIcon;
  tone: AppTone;
  showInDock: boolean;
  defaultWindow: {
    width: number;
    height: number;
  };
}

/* -------------------------------------------------------------------------- */
/*  Agents                                                                    */
/* -------------------------------------------------------------------------- */

export type AgentId = 'research' | 'coding' | 'writing';
export type AgentStatus = 'working' | 'idle' | 'waiting';
export type AgentTone = 'iris' | 'azure' | 'teal';

export interface AgentActivity {
  id: string;
  title: LocalizedText;
  meta: LocalizedText;
  time: LocalizedText;
}

export interface Agent {
  id: AgentId;
  name: LocalizedText;
  shortName: LocalizedText;
  role: LocalizedText;
  description: LocalizedText;
  status: AgentStatus;
  focus: LocalizedText;
  progress: number;
  tone: AgentTone;
  model: LocalizedText;
  tasksCompleted: number;
  successRate: number;
  avgDuration: LocalizedText;
  capabilities: LocalizedText[];
  tools: LocalizedText[];
  activity: AgentActivity[];
}

/* -------------------------------------------------------------------------- */
/*  Tasks                                                                     */
/* -------------------------------------------------------------------------- */

export type TaskStatus = 'in_progress' | 'queued' | 'review' | 'completed';
export type TaskPriority = 'high' | 'medium' | 'low';
export type TaskStepStatus = 'done' | 'active' | 'pending';
export type TaskOrigin = 'demo' | 'simulated';

export interface TaskStep {
  id: string;
  label: LocalizedText;
  detail: LocalizedText;
  status: TaskStepStatus;
}

export interface TaskRecord {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  agentId: AgentId;
  status: TaskStatus;
  priority: TaskPriority;
  progress: number;
  updatedAt: LocalizedText;
  createdAt: LocalizedText;
  dueLabel: LocalizedText;
  origin: TaskOrigin;
  tags: LocalizedText[];
  steps: TaskStep[];
  output?: LocalizedText;
}

/* -------------------------------------------------------------------------- */
/*  Command Center                                                            */
/* -------------------------------------------------------------------------- */

export type CommandStatus = 'running' | 'ready' | 'cancelled';
export type CommandStepStatus = 'pending' | 'active' | 'done';

export interface CommandStep {
  id: string;
  label: LocalizedText;
  detail: LocalizedText;
  status: CommandStepStatus;
}

export interface CommandRun {
  id: string;
  prompt: string;
  createdAt: LocalizedText;
  status: CommandStatus;
  activeStep: number;
  steps: CommandStep[];
  agentId: AgentId;
  resultTitle: LocalizedText;
  simulated: true;
}

export interface CommandSuggestion {
  title: LocalizedText;
  prompt: LocalizedText;
  hint: LocalizedText;
}

/* -------------------------------------------------------------------------- */
/*  Memories                                                                  */
/* -------------------------------------------------------------------------- */

export type MemoryCategory = 'preference' | 'project' | 'conversation' | 'system';
export type MemoryFilter = 'all' | MemoryCategory;

export interface MemoryItem {
  id: string;
  title: LocalizedText;
  summary: LocalizedText;
  category: MemoryCategory;
  tags: LocalizedText[];
  source: LocalizedText;
  updatedAt: LocalizedText;
  confidence: number;
  pinned: boolean;
}

/* -------------------------------------------------------------------------- */
/*  Files                                                                     */
/* -------------------------------------------------------------------------- */

export type FileType =
  | 'folder'
  | 'document'
  | 'image'
  | 'code'
  | 'archive'
  | 'audio'
  | 'data';

export interface FileEntry {
  id: string;
  name: LocalizedText;
  type: FileType;
  parentId: string | null;
  size?: string;
  modified: LocalizedText;
  excerpt?: LocalizedText;
  starred?: boolean;
}

export interface FileCrumb {
  id: string;
  name: LocalizedText;
}

/* -------------------------------------------------------------------------- */
/*  Notifications                                                             */
/* -------------------------------------------------------------------------- */

export type NotificationKind = 'agent' | 'task' | 'memory' | 'system';

export interface AppNotification {
  id: string;
  kind: NotificationKind;
  title: LocalizedText;
  body: LocalizedText;
  time: LocalizedText;
  read: boolean;
}

/* -------------------------------------------------------------------------- */
/*  System & settings                                                         */
/* -------------------------------------------------------------------------- */

export type Appearance = 'light' | 'dark' | 'system';
export type AccentId = 'blue' | 'iris' | 'teal' | 'graphite';
export type WallpaperId = 'dawn' | 'mist' | 'linen';

export interface AetherSettings {
  language: Locale;
  appearance: Appearance;
  accent: AccentId;
  wallpaper: WallpaperId;
  dockMagnification: boolean;
  reduceMotion: boolean;
  showSeconds: boolean;
  memoryEnabled: boolean;
  localOnly: boolean;
}

export interface SystemSnapshot {
  battery: number;
  charging: boolean;
  network: LocalizedText;
  signal: number;
  storageUsedGb: number;
  storageTotalGb: number;
  memoryUsedPct: number;
  cpuPct: number;
  uptime: LocalizedText;
}

/* -------------------------------------------------------------------------- */
/*  Window manager                                                            */
/* -------------------------------------------------------------------------- */

export interface DesktopWindow {
  id: string;
  appId: AppId;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  minimized: boolean;
  pinned: boolean;
  maximized: boolean;
}

export interface WindowPreset {
  width: number;
  height: number;
}
