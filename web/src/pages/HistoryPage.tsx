import { ContentHistoryTable } from "@/components/features/content/history-table";
import { OptionSelectDialog } from "@/components/features/content/option-dialog";
import {
  PromptForm,
  type PromptFormValues,
} from "@/components/features/content/prompt-form";
import { toast } from "sonner";
import { useHistory } from "@/hooks/queries/useContents";
import { useGenerateContent } from "@/hooks/mutations/useGenerateContent";
import type { Content } from "@/types/content";
import { useState } from "react";

const HistoryPage = () => {
  const { data: historyData, refetch } = useHistory();
  const { mutateAsync: generateContent, isPending } = useGenerateContent();
  const [generated, setGenerated] = useState<Content | null>(null);

  async function onSubmit(values: PromptFormValues) {
    try {
      const { data: generatedContentData } = await generateContent({
        prompt: values.prompt,
        type: values.type,
      });
      setGenerated(generatedContentData);
      refetch();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error(errorMessage);
      toast.error("Ops! Something went wrong", {
        description: "Please, try again later.",
      });
    }
  }

  const open = Boolean(generated);

  return (
    <>
      <div className="max-w-2xl mx-auto pt-6 gap-4 flex flex-col">
        <PromptForm onSubmit={onSubmit} submitting={isPending} />
        <ContentHistoryTable data={historyData ?? []} />
      </div>
      {generated && (
        <OptionSelectDialog
          open={open}
          onOpenChange={(o) => !o && setGenerated(null)}
          contentId={generated.id}
          optionA={generated.optionA}
          optionB={generated.optionB}
          onSuccess={() => {
            refetch();
            toast.success("All set!", {
              description: `Your choice lives here now.`,
            });
            setGenerated(null);
          }}
        />
      )}
    </>
  );
};

export default HistoryPage;
