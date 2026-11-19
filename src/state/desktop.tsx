import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { PageId } from '@/types';

export type OverlayId = 'control-center' | 'notifications' | 'user' | 'command';

interface DesktopContextValue {
  page: PageId;
  navigate: (page: PageId) => void;
  overlay: OverlayId | null;
  toggleOverlay: (overlay: OverlayId) => void;
  closeOverlay: () => void;
}

const DesktopContext = createContext<DesktopContextValue | null>(null);

export function DesktopProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<PageId>('home');
  const [overlay, setOverlay] = useState<OverlayId | null>(null);

  const navigate = useCallback((nextPage: PageId) => {
    setPage(nextPage);
    setOverlay(null);
  }, []);

  const toggleOverlay = useCallback((nextOverlay: OverlayId) => {
    setOverlay((current) => (current === nextOverlay ? null : nextOverlay));
  }, []);

  const closeOverlay = useCallback(() => setOverlay(null), []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOverlay((current) => (current === 'command' ? null : 'command'));
      }
      if (event.key === 'Escape') {
        setOverlay(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const value = useMemo<DesktopContextValue>(
    () => ({ page, navigate, overlay, toggleOverlay, closeOverlay }),
    [page, navigate, overlay, toggleOverlay, closeOverlay],
  );

  return <DesktopContext.Provider value={value}>{children}</DesktopContext.Provider>;
}

export function useDesktop(): DesktopContextValue {
  const context = useContext(DesktopContext);
  if (!context) {
    throw new Error('useDesktop must be used inside DesktopProvider');
  }
  return context;
}
