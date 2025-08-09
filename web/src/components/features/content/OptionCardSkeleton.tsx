import { Skeleton } from "@/components/ui/skeleton";

export function OptionCardSkeleton() {
  return (
    <div
      className={[
        "w-full rounded-2xl p-[2px]",
        "bg-gradient-to-br from-[#F8D7E8] via-ig.pink to-ig.orange",
        "shadow-sm",
      ].join(" ")}
    >
      <div className="rounded-2xl bg-white/95 dark:bg-zinc-900/80 border border-white/60 dark:border-white/10 p-4 sm:p-5 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <Skeleton className="h-4 w-24 rounded-full" />
          <Skeleton className="h-4 w-16 rounded-full" />
        </div>

        {/* Caption (3 linhas) */}
        <div className="space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-[92%]" />
          <Skeleton className="h-3 w-[70%]" />
        </div>

        {/* Hashtags (pills) */}
        <div className="flex flex-wrap gap-2 pt-2">
          <Skeleton className="h-5 w-14 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>
      </div>
    </div>
  );
}
