import { cn } from '@/lib/cn';
import type { FileEntry } from '@/types';
import { FileImageArt } from './FileImageArt';
import { getArtworkVariant, getFileTypeMeta } from './file-utils';

type FileIconSize = 'sm' | 'md' | 'lg';

const boxSizes: Record<FileIconSize, string> = {
  sm: 'size-7 rounded-[8px] [&_svg]:size-[14px]',
  md: 'size-9 rounded-[11px] [&_svg]:size-[17px]',
  lg: 'size-12 rounded-[14px] [&_svg]:size-[22px]',
};

interface FileIconProps {
  entry: FileEntry;
  size?: FileIconSize;
  className?: string;
}

/** Icon chip for a file entry; images render their deterministic placeholder art. */
export function FileIcon({ entry, size = 'sm', className }: FileIconProps) {
  const meta = getFileTypeMeta(entry.type);

  if (entry.type === 'image') {
    return (
      <span
        className={cn(
          'relative shrink-0 overflow-hidden ring-1 ring-line/[0.1]',
          boxSizes[size],
          className,
        )}
        aria-hidden="true"
      >
        <FileImageArt
          variant={getArtworkVariant(entry.id)}
          className="absolute inset-0 h-full w-full"
        />
      </span>
    );
  }

  const Icon = meta.icon;
  return (
    <span
      className={cn(
        'flex shrink-0 items-center justify-center border',
        meta.chipClassName,
        boxSizes[size],
        className,
      )}
      aria-hidden="true"
    >
      <Icon strokeWidth={1.7} />
    </span>
  );
}
