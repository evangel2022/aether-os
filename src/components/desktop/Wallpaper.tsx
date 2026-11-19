export function Wallpaper() {
  return (
    <div className="wallpaper" aria-hidden>
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/20 to-transparent dark:from-black/20" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/[0.035] to-transparent" />
    </div>
  );
}
