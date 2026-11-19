import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { getAgent } from '@/data/agents';
import { INITIAL_MEMORIES } from '@/data/memories';
import { INITIAL_NOTIFICATIONS } from '@/data/notifications';
import { INITIAL_TASKS } from '@/data/tasks';
import { translate, translateAll } from '@/i18n/translate';
import {
  SIMULATED_STEP_MS,
  advanceCommandRun,
  buildCommandRun,
} from '@/lib/command-simulation';
import { createId, truncate } from '@/lib/format';
import type {
  AppNotification,
  CommandRun,
  MemoryItem,
  TaskRecord,
} from '@/types';

function cloneTasks(source: TaskRecord[]): TaskRecord[] {
  return source.map((task) => ({
    ...task,
    tags: [...task.tags],
    steps: task.steps.map((step) => ({ ...step })),
  }));
}

function cloneMemories(source: MemoryItem[]): MemoryItem[] {
  return source.map((memory) => ({ ...memory, tags: [...memory.tags] }));
}

function cloneNotifications(source: AppNotification[]): AppNotification[] {
  return source.map((notification) => ({ ...notification }));
}

interface DemoDataContextValue {
  tasks: TaskRecord[];
  memories: MemoryItem[];
  notifications: AppNotification[];
  unreadCount: number;
  activeRun: CommandRun | null;
  commandHistory: CommandRun[];
  runCommand: (prompt: string) => CommandRun | null;
  cancelActiveRun: () => void;
  toggleMemoryPin: (memoryId: string) => void;
  markNotificationRead: (notificationId: string) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;
  resetDemoData: () => void;
}

const DemoDataContext = createContext<DemoDataContextValue | null>(null);

export function DemoDataProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<TaskRecord[]>(() => cloneTasks(INITIAL_TASKS));
  const [memories, setMemories] = useState<MemoryItem[]>(() =>
    cloneMemories(INITIAL_MEMORIES),
  );
  const [notifications, setNotifications] = useState<AppNotification[]>(() =>
    cloneNotifications(INITIAL_NOTIFICATIONS),
  );
  const [activeRun, setActiveRun] = useState<CommandRun | null>(null);
  const [commandHistory, setCommandHistory] = useState<CommandRun[]>([]);
  const finalizedRuns = useRef<Set<string>>(new Set());

  /* Advance the local planning simulation one stage at a time. */
  useEffect(() => {
    if (!activeRun || activeRun.status !== 'running') return;
    const timer = window.setTimeout(() => {
      setActiveRun((current) => {
        if (!current || current.id !== activeRun.id || current.status !== 'running') {
          return current;
        }
        return advanceCommandRun(current);
      });
    }, SIMULATED_STEP_MS);
    return () => window.clearTimeout(timer);
  }, [activeRun]);

  /* Mirror history when a run completes or is stopped. */
  useEffect(() => {
    if (!activeRun) return;
    if (activeRun.status === 'running') return;
    setCommandHistory((current) => {
      const withoutRun = current.filter((run) => run.id !== activeRun.id);
      return [activeRun, ...withoutRun].slice(0, 4);
    });
  }, [activeRun]);

  /* A completed simulation creates an explicitly-labelled demo task. */
  useEffect(() => {
    if (!activeRun || activeRun.status !== 'ready') return;
    if (finalizedRuns.current.has(activeRun.id)) return;
    finalizedRuns.current.add(activeRun.id);

    const agent = getAgent(activeRun.agentId);
    const taskId = createId('task');
    const shortPrompt = truncate(
      activeRun.prompt.replace(/[。．.!?！？]+$/u, ''),
      110,
    );
    const shortTitle = {
      'zh-CN': truncate(activeRun.resultTitle['zh-CN'], 58),
      'en-US': truncate(activeRun.resultTitle['en-US'], 58),
    };
    const task: TaskRecord = {
      id: taskId,
      title: activeRun.resultTitle,
      description: translateAll('command.task.description', { prompt: shortPrompt }),
      agentId: activeRun.agentId,
      status: 'review',
      priority: 'medium',
      progress: 100,
      updatedAt: translateAll('common.justNow'),
      createdAt: translateAll('common.justNow'),
      dueLabel: translateAll('command.task.due'),
      origin: 'simulated',
      tags: [
        translateAll('command.task.tagCommandDemo'),
        translateAll('command.task.tagSimulated'),
      ],
      steps: activeRun.steps.map((step) => ({
        id: `cmd-${step.id}`,
        label: step.label,
        detail: step.detail,
        status: 'done',
      })),
      output: translateAll('command.task.output'),
    };

    const notificationTitle = translateAll('command.notification.title');
    const notificationBody = {
      'zh-CN': translate('zh-CN', 'command.notification.body', {
        agent: agent.name['zh-CN'],
        title: shortTitle['zh-CN'],
      }),
      'en-US': translate('en-US', 'command.notification.body', {
        agent: agent.name['en-US'],
        title: shortTitle['en-US'],
      }),
    };

    setTasks((current) => [task, ...current]);
    setNotifications((current) => [
      {
        id: createId('note'),
        kind: 'task',
        title: notificationTitle,
        body: notificationBody,
        time: translateAll('common.justNow'),
        read: false,
      },
      ...current,
    ]);
  }, [activeRun]);

  const runCommand = useCallback((prompt: string): CommandRun | null => {
    const trimmed = prompt.trim();
    if (!trimmed) return null;

    setActiveRun((current) => {
      if (!current || current.status !== 'running') return current;
      return { ...current, status: 'cancelled' };
    });

    const run = buildCommandRun(trimmed);
    setCommandHistory((current) =>
      [run, ...current.filter((item) => item.id !== run.id)].slice(0, 4),
    );
    setActiveRun(run);
    return run;
  }, []);

  const cancelActiveRun = useCallback(() => {
    setActiveRun((current) =>
      current && current.status === 'running'
        ? { ...current, status: 'cancelled' }
        : current,
    );
  }, []);

  const toggleMemoryPin = useCallback((memoryId: string) => {
    setMemories((current) =>
      current.map((memory) =>
        memory.id === memoryId ? { ...memory, pinned: !memory.pinned } : memory,
      ),
    );
  }, []);

  const markNotificationRead = useCallback((notificationId: string) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification,
      ),
    );
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((current) =>
      current.map((notification) => ({ ...notification, read: true })),
    );
  }, []);

  const clearNotifications = useCallback(() => setNotifications([]), []);

  const resetDemoData = useCallback(() => {
    setTasks(cloneTasks(INITIAL_TASKS));
    setMemories(cloneMemories(INITIAL_MEMORIES));
    setNotifications(cloneNotifications(INITIAL_NOTIFICATIONS));
    setActiveRun(null);
    setCommandHistory([]);
    finalizedRuns.current.clear();
  }, []);

  const unreadCount = notifications.filter((notification) => !notification.read).length;

  const value = useMemo<DemoDataContextValue>(
    () => ({
      tasks,
      memories,
      notifications,
      unreadCount,
      activeRun,
      commandHistory,
      runCommand,
      cancelActiveRun,
      toggleMemoryPin,
      markNotificationRead,
      markAllNotificationsRead,
      clearNotifications,
      resetDemoData,
    }),
    [
      tasks,
      memories,
      notifications,
      unreadCount,
      activeRun,
      commandHistory,
      runCommand,
      cancelActiveRun,
      toggleMemoryPin,
      markNotificationRead,
      markAllNotificationsRead,
      clearNotifications,
      resetDemoData,
    ],
  );

  return <DemoDataContext.Provider value={value}>{children}</DemoDataContext.Provider>;
}

export function useDemoData(): DemoDataContextValue {
  const context = useContext(DemoDataContext);
  if (!context) {
    throw new Error('useDemoData must be used inside DemoDataProvider');
  }
  return context;
}
