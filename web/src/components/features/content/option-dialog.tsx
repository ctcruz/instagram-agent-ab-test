import * as React from "react";
import {
  Dialog,
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
import { type SelectedOption, type Option } from "@/types/content";
import { useSelectOption } from "@/hooks/mutations/useSelectOption";

export function OptionSelectDialog({
  contentId,
  optionA,
  optionB,
  open,
  onOpenChange,
  onSuccess,
}: {
  contentId: string;
  optionA: Option;
  optionB: Option;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (selected: SelectedOption) => void;
}) {
  const [selected, setSelected] = React.useState<SelectedOption | null>(null);

  const { mutateAsync: selectOption, isPending } = useSelectOption();

  const handleConfirm = async () => {
    if (!selected || isPending) return;

    try {
      await selectOption({ id: contentId, selected });

      toast("Option selected!", {
        description: `Option ${selected} saved.`,
      });
      onSuccess?.(selected);
    } catch (error: unknown) {
      toast.error("Ops! Something went wrong", {
        description: "Please, try again later.",
      });
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error(errorMessage);
    }
  };

  const handleOpenChange = (o: boolean) => {
    if (!o) setSelected(null);
    onOpenChange(o);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
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
              disabled={isPending}
              className="rounded-full"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            disabled={!selected || isPending}
            onClick={handleConfirm}
            className="text-white rounded-full bg-gradient-to-r from-[#FF6EA9] via-[#FF4E88] to-[#FD8A44] shadow-[0_8px_30px_rgba(255,105,180,0.35)] hover:brightness-105 active:scale-[.98] transition-all"
          >
            {isPending ? "Confirming…" : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
