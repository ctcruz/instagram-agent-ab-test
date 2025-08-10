import { cn } from "@/lib/utils";
import type { SelectedOption } from "@/types/content";

type OptionCardProps = {
  optionKey: SelectedOption;
  caption: string;
  hashtags: string[];
  selected: boolean;
  onSelect: (opt: SelectedOption) => void;
};

export function OptionCard({
  optionKey,
  caption,
  hashtags,
  selected,
  onSelect,
}: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(optionKey)}
      aria-selected
      className={cn(
        "group relative w-full text-left rounded-2xl p-[2px]",
        "bg-gradient-to-br from-[#F8D7E8] via-[#FF6EA9] to-[#FD8A44]",
        "cursor-pointer select-none transition-transform duration-150 ease-out",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6EA9]/60",
        selected
          ? "shadow-[0_8px_30px_rgba(255,105,180,0.35)] scale-[1.01]"
          : "shadow-sm"
      )}
    >
      <div className="h-full rounded-2xl bg-white/95 dark:bg-zinc-900/80 backdrop-blur border border-white/60 dark:border-white/10 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
            Option {optionKey}
          </h3>

          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs",
              selected
                ? "bg-gradient-to-r from-[#FF6EA9] to-[#FD8A44] text-white"
                : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
            )}
          >
            {selected ? "Selected" : "Select"}
          </span>
        </div>

        <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
          {caption}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {hashtags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="absolute inset-x-6 bottom-0 h-px opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-transparent via-black/20 to-transparent dark:via-white/20" />
      </div>
    </button>
  );
}
