import React from "react";
import { ContentHistoryTable } from "@/components/features/content/HistoryTable/newtable";
import { OptionSelectDialog } from "@/components/features/content/option-dialog";
import {
  PromptForm,
  type PromptFormValues,
} from "@/components/features/content/prompt-form";
import { toast } from "sonner";
import { useHistory } from "@/hooks/queries/useContents";
import { useGenerateContent } from "@/hooks/mutations/useGenerateContent";
import type { Content } from "@/types/content";

const HistoryPage = () => {
  const { data: historyData, refetch } = useHistory();
  const { mutateAsync: generateContent } = useGenerateContent();
  const [generated, setGenerated] = React.useState<Content | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  async function onSubmit(values: PromptFormValues) {
    try {
      setSubmitting(true);

      const { data: generatedContentData } = await generateContent({
        prompt: values.prompt,
        type: values.type,
      });

      setDialogOpen(true);
      setGenerated(generatedContentData);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast("Error when generating", {
        description: err?.message ?? "Try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className="max-w-2xl mx-auto pt-6 gap-4 flex flex-col">
        <PromptForm onSubmit={onSubmit} submitting={submitting} />
        <ContentHistoryTable data={historyData} />
      </div>
      {!!generated && (
        <OptionSelectDialog
          open={dialogOpen}
          contentId={generated?.id}
          onOpenChange={setDialogOpen}
          optionA={generated?.optionA}
          optionB={generated?.optionB}
          onSuccess={(selected) => {
            refetch();
            toast("Registered selection", {
              description: `Option ${selected} saved successfuly.`,
            });
          }}
        />
      )}
    </>
  );
};

export default HistoryPage;
