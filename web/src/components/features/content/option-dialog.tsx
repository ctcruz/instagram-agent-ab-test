import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { OptionCard } from "./option-card";
import { toast } from "sonner";

export function OptionSelectDialog({
  trigger,
  contentId,
  optionA,
  optionB,
  open,
  onOpenChange,
  selectEndpoint = "/api/content/select",
  closeAfterConfirm = true,
  onSuccess,
}: {
  trigger?: React.ReactNode;
  contentId: string;
  optionA: { caption: string; hashtags: string[] };
  optionB: { caption: string; hashtags: string[] };
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  selectEndpoint?: string;
  closeAfterConfirm?: boolean;
  onSuccess?: (selected: "A" | "B") => void;
}) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<"A" | "B" | null>(null);
  const [loading, setLoading] = React.useState(false);

  const isOpen = typeof open === "boolean" ? open : internalOpen;
  const setOpen = (o: boolean) => {
    if (typeof open !== "boolean") setInternalOpen(o);
    onOpenChange?.(o);
  };

  const handleConfirm = async () => {
    if (!selected || loading) return;
    setLoading(true);
    try {
      // const res = await fetch(selectEndpoint, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ id: contentId, selectedOption: selected }), // ← inclui o ID
      // });
      // if (!res.ok) {
      //   const text = await res.text().catch(() => "");
      //   throw new Error(text || `HTTP ${res.status}`);
      // }
      toast("Option selected!", {
        description: `Option ${selected} saved.`,
      });
      onSuccess?.(selected);
      if (closeAfterConfirm) {
        setOpen(false);
        setSelected(null);
      }
    } catch (err: any) {
      toast("Error when confirming", {
        description: err?.message ?? "Try again",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (o: boolean) => {
    if (!o) setSelected(null);
    setOpen(o);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="!max-w-4xl">
        <DialogHeader>
          <DialogTitle className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF6EA9] via-[#FF4E88] to-[#FD8A44]">
            Pick your favorite
          </DialogTitle>
          <DialogDescription>
            Compare the generated options and select the one you want to
            publish.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <OptionCard
            optionKey="A"
            caption={optionA.caption}
            hashtags={optionA.hashtags}
            selected={selected === "A"}
            onSelect={setSelected}
          />
          <OptionCard
            optionKey="B"
            caption={optionB.caption}
            hashtags={optionB.hashtags}
            selected={selected === "B"}
            onSelect={setSelected}
          />
        </div>

        <DialogFooter className="gap-2 sm:gap-3">
          <DialogClose asChild>
            <Button
              variant="outline"
              disabled={loading}
              className="rounded-full"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            disabled={!selected || loading}
            onClick={handleConfirm}
            className="text-white rounded-full bg-gradient-to-r from-[#FF6EA9] via-[#FF4E88] to-[#FD8A44] shadow-[0_8px_30px_rgba(255,105,180,0.35)] hover:brightness-105 active:scale-[.98] transition-all"
          >
            {loading ? "Confirming…" : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
