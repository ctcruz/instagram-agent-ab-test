import React, { useEffect, useState } from "react";
import { ContentHistoryTable } from "@/components/features/content/HistoryTable/newtable";
import { OptionSelectDialog } from "@/components/features/content/option-dialog";
import {
  PromptForm,
  type PromptFormValues,
} from "@/components/features/content/prompt-form";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

type GeneratedContent = {
  id: string;
  prompt: string;
  type: "POST" | "STORY";
  optionA: { caption: string; hashtags: string[] };
  optionB: { caption: string; hashtags: string[] };
  selectedOption: "A" | "B" | null;
  createdAt: string;
};

const HistoryPage = () => {
  const [data, setData] = useState([]);
  const [generated, setGenerated] = React.useState<GeneratedContent | null>(
    null
  );

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const optionA = { caption: "Legend A…", hashtags: ["#summer", "#skincare"] };
  const optionB = { caption: "Legend B…", hashtags: ["#sun", "#care"] };

  useEffect(() => {
    fetch("http://localhost:8080/content/history")
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  async function onSubmit(values: PromptFormValues) {
    try {
      setSubmitting(true);
      // const res = await fetch("/api/content/generate", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(values),
      // });
      // if (!res.ok) {
      //   const text = await res.text().catch(() => "");
      //   throw new Error(text || `HTTP ${res.status}`);
      // }
      // const data: GeneratedContent = await res.json();

      const data: GeneratedContent = {
        id: "asdf",
        prompt: values.prompt,
        type: values.type,
        createdAt: new Date().toISOString(),
        optionA,
        optionB,
        selectedOption: "A",
      };

      setGenerated(data);
      setDialogOpen(true);
      toast("Generated variations!", { description: "Choose your option." });
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
        <ContentHistoryTable data={data} />
      </div>

      {generated && (
        <OptionSelectDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          contentId={generated.id}
          optionA={generated.optionA}
          optionB={generated.optionB}
          onSuccess={(selected) => {
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
