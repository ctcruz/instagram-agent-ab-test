import * as React from "react";
import { Button } from "@/components/ui/button";
import { OptionCard } from "./option-card";
import { toast } from "sonner";
import type { AB, ContentOption } from "@/types/content";
import { useSelectOption } from "@/hooks/mutations/useSelectOption";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import {
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function OptionSelectDialog({
  contentId,
  optionA,
  optionB,
  onOpenChange,
}: {
  contentId: string;
  optionA: ContentOption;
  optionB: ContentOption;
  onOpenChange: (open: boolean) => void;
}) {
  const [selected, setSelected] = React.useState<AB | null>(null);

  const { mutate: selectOption, isPending } = useSelectOption();

  const handleConfirm = async () => {
    if (!selected || isPending) return;

    try {
      selectOption({ id: contentId, selected });
      toast.success("All set!", {
        description: `Your choice lives here now.`,
      });
    } catch {
      toast.error("Ops! Something went wrong", {
        description: "Please, try again later.",
      });
    } finally {
      handleOpenChange(false);
    }
  };

  const handleOpenChange = (o: boolean) => {
    if (!o) setSelected(null);
    onOpenChange(o);
  };

  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent className="!max-w-4xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF6EA9] via-[#FF4E88] to-[#FD8A44]">
            Pick your favorite
          </AlertDialogTitle>
          <AlertDialogDescription>
            Compare the generated options and select the one you want to
            publish.
          </AlertDialogDescription>
        </AlertDialogHeader>

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

        <AlertDialogFooter className="gap-2 sm:gap-3">
          <Button
            variant="ig"
            disabled={!selected || isPending}
            onClick={handleConfirm}
          >
            {isPending ? "Confirming…" : "Confirm"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
