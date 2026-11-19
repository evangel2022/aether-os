import { describe, expect, it } from 'vitest';
import {
  initialWindowState,
  windowReducer,
  type ViewportSize,
} from '@/state/windows';

const viewport: ViewportSize = { width: 1440, height: 900 };

describe('window manager reducer', () => {
  it('opens a window with bounded default geometry and focus', () => {
    const state = windowReducer(initialWindowState, {
      type: 'open',
      appId: 'files',
      viewport,
    });

    expect(state.windows).toHaveLength(1);
    expect(state.windows[0]?.appId).toBe('files');
    expect(state.activeWindowId).toBe(state.windows[0]?.id);
    expect(state.windows[0]?.x).toBeGreaterThanOrEqual(8);
    expect(state.windows[0]?.y).toBeGreaterThanOrEqual(46);
    expect(state.windows[0]?.width).toBeLessThanOrEqual(viewport.width);
    expect(state.windows[0]?.height).toBeLessThanOrEqual(viewport.height);
  });

  it('supports multiple windows, focus, minimize and close', () => {
    let state = windowReducer(initialWindowState, { type: 'open', appId: 'files', viewport });
    state = windowReducer(state, { type: 'open', appId: 'notes', viewport });

    expect(state.windows).toHaveLength(2);
    const files = state.windows.find((window) => window.appId === 'files');
    expect(files).toBeDefined();
    if (!files) return;

    state = windowReducer(state, { type: 'focus', id: files.id });
    expect(state.activeWindowId).toBe(files.id);

    state = windowReducer(state, { type: 'minimize', id: files.id });
    const minimized = state.windows.find((window) => window.id === files.id);
    expect(minimized?.minimized).toBe(true);
    expect(state.activeWindowId).not.toBe(files.id);

    state = windowReducer(state, { type: 'restore', id: files.id });
    expect(state.windows.find((window) => window.id === files.id)?.minimized).toBe(false);

    state = windowReducer(state, { type: 'close', id: files.id });
    expect(state.windows.some((window) => window.id === files.id)).toBe(false);
  });

  it('toggles pin, maximize and closes every window', () => {
    let state = windowReducer(initialWindowState, { type: 'open', appId: 'agents', viewport });
    const id = state.windows[0]?.id;
    expect(id).toBeTruthy();
    if (!id) return;

    state = windowReducer(state, { type: 'toggle-pin', id });
    expect(state.windows[0]?.pinned).toBe(true);

    state = windowReducer(state, { type: 'toggle-maximize', id });
    expect(state.windows[0]?.maximized).toBe(true);

    state = windowReducer(state, { type: 'close-all' });
    expect(state.windows).toHaveLength(0);
    expect(state.activeWindowId).toBeNull();
  });

  it('focuses an existing app window rather than duplicating it', () => {
    let state = windowReducer(initialWindowState, { type: 'open', appId: 'tasks', viewport });
    state = windowReducer(state, { type: 'minimize', id: state.windows[0]!.id });
    const before = state.windows.length;
    state = windowReducer(state, { type: 'open', appId: 'tasks', viewport });
    expect(state.windows).toHaveLength(before);
    expect(state.windows[0]?.minimized).toBe(false);
    expect(state.activeWindowId).toBe(state.windows[0]?.id);
  });
});
