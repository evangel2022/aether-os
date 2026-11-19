import { motion } from 'framer-motion';
import {
  Bluetooth,
  LockKeyhole,
  Monitor,
  Moon,
  Share2,
  Sun,
  Volume2,
  Wifi,
  X,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Badge } from '@/components/ui/Badge';
import { IconButton } from '@/components/ui/IconButton';
import { RangeSlider } from '@/components/ui/RangeSlider';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { useI18n } from '@/i18n';
import { cn } from '@/lib/cn';
import { useDesktop } from '@/state/desktop';
import { useSettings } from '@/state/settings';
import type { Appearance } from '@/types';

interface ToggleTileProps {
  icon: LucideIcon;
  label: string;
  sublabel: string;
  active: boolean;
  onClick: () => void;
}

function ToggleTile({ icon: Icon, label, sublabel, active, onClick }: ToggleTileProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'group flex min-h-[66px] flex-col justify-between rounded-[17px] border p-3 text-left transition-all duration-200 ease-aether active:scale-[0.985]',
        active
          ? 'border-accent/20 bg-accent/[0.09] text-accent-strong shadow-[0_1px_0_rgb(255_255_255/0.35)_inset]'
          : 'border-line/[0.07] bg-surface/45 text-ink hover:bg-surface/70',
      )}
    >
      <span
        className={cn(
          'flex size-7 items-center justify-center rounded-full transition-colors',
          active ? 'bg-accent text-on-accent' : 'bg-line/[0.07] text-ink-2',
        )}
      >
        <Icon className="size-3.5" strokeWidth={1.9} />
      </span>
      <span>
        <span className="block text-[11.5px] font-semibold leading-tight">{label}</span>
        <span className={cn('mt-0.5 block text-[9.5px]', active ? 'text-accent-strong/70' : 'text-muted')}>
          {sublabel}
        </span>
      </span>
    </button>
  );
}

export function ControlCenter() {
  const { closeOverlay } = useDesktop();
  const { settings, updateSetting } = useSettings();
  const { t } = useI18n();
  const appearanceOptions: { value: Appearance; label: string; icon: ReactNode }[] = [
    { value: 'light', label: t('shell.appearance.light'), icon: <Sun className="size-3" /> },
    { value: 'dark', label: t('shell.appearance.dark'), icon: <Moon className="size-3" /> },
    {
      value: 'system',
      label: t('shell.appearance.system'),
      icon: <Monitor className="size-3" />,
    },
  ];
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(true);
  const [focus, setFocus] = useState(false);
  const [airdrop, setAirdrop] = useState(false);
  const [brightness, setBrightness] = useState(72);
  const [volume, setVolume] = useState(38);

  return (
    <>
      <button
        type="button"
        aria-label={t('shell.controlCenter.closeAria')}
        onClick={closeOverlay}
        className="fixed inset-0 z-[140] cursor-default bg-transparent"
      />
      <motion.section
        aria-label={t('shell.controlCenter')}
        initial={{ opacity: 0, scale: 0.96, y: -6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: -4 }}
        transition={{ type: 'spring', stiffness: 380, damping: 32, mass: 0.7 }}
        className="overlay-panel fixed right-3 top-[52px] z-[150] w-[344px] max-w-[calc(100vw-24px)] origin-top-right rounded-[26px] p-3.5"
      >
        <div className="mb-3 flex items-center justify-between px-0.5">
          <div className="flex items-center gap-2">
            <h2 className="text-[13px] font-semibold tracking-[-0.015em] text-ink">
              {t('shell.controlCenter')}
            </h2>
            <Badge tone="demo" className="text-[8.5px]">
              {t('common.demo')}
            </Badge>
          </div>
          <IconButton
            label={t('shell.controlCenter.closeAria')}
            size="sm"
            onClick={closeOverlay}
          >
            <X />
          </IconButton>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <ToggleTile
            icon={Wifi}
            label={t('shell.controlCenter.wifi')}
            sublabel={wifi ? 'Aether-5G' : t('common.off')}
            active={wifi}
            onClick={() => setWifi((current) => !current)}
          />
          <ToggleTile
            icon={Bluetooth}
            label={t('shell.controlCenter.bluetooth')}
            sublabel={bluetooth ? t('common.on') : t('common.off')}
            active={bluetooth}
            onClick={() => setBluetooth((current) => !current)}
          />
          <ToggleTile
            icon={Zap}
            label={t('shell.controlCenter.focus')}
            sublabel={focus ? t('shell.controlCenter.focusDeepWork') : t('common.off')}
            active={focus}
            onClick={() => setFocus((current) => !current)}
          />
          <ToggleTile
            icon={Share2}
            label={t('shell.controlCenter.airdrop')}
            sublabel={
              airdrop ? t('shell.controlCenter.airdropEveryone') : t('common.off')
            }
            active={airdrop}
            onClick={() => setAirdrop((current) => !current)}
          />
        </div>

        <div className="mt-2 rounded-[17px] border border-line/[0.07] bg-surface/45 px-3.5 py-3">
          <RangeSlider
            label={t('shell.controlCenter.display')}
            icon={<Sun className="size-3" />}
            value={brightness}
            onChange={setBrightness}
          />
          <RangeSlider
            className="mt-3"
            label={t('shell.controlCenter.sound')}
            icon={<Volume2 className="size-3" />}
            value={volume}
            onChange={setVolume}
          />
        </div>

        <div className="mt-2 flex items-center justify-between rounded-[17px] border border-line/[0.07] bg-surface/45 px-3.5 py-2.5">
          <span className="text-[11px] font-medium text-ink-2">
            {t('shell.appearance.title')}
          </span>
          <SegmentedControl<Appearance>
            ariaLabel={t('shell.appearance.title')}
            size="sm"
            value={settings.appearance}
            onChange={(value) => updateSetting('appearance', value)}
            options={appearanceOptions}
          />
        </div>

        <div className="mt-2.5 flex items-center gap-1.5 px-1 text-[9.5px] leading-relaxed text-muted">
          <LockKeyhole className="size-2.5 shrink-0" />
          {t('shell.controlCenter.demoNote')}
        </div>
      </motion.section>
    </>
  );
}
