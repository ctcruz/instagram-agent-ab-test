import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { ContentType } from "@/types/content";

const FormSchema = z.object({
  prompt: z
    .string()
    .min(4, "Enter at least 4 characters")
    .max(500, "Max. 500 characters"),
  type: z.enum(
    ["POST", "STORY"] as [ContentType, ContentType],
    "Select a type"
  ),
});

export type PromptFormValues = z.infer<typeof FormSchema>;

export function PromptForm({
  onSubmit,
  submitting = false,
}: {
  onSubmit: (values: PromptFormValues) => Promise<void> | void;
  submitting?: boolean;
}) {
  const form = useForm<PromptFormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { prompt: "", type: "POST" },
    mode: "onChange",
  });

  const isSubmitting = submitting || form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        noValidate
      >
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="text-base font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#FF6EA9] via-[#FF4E88] to-[#FD8A44]">
              Generate Content
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 pt-0">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prompt</FormLabel>
                  <FormControl>
                    <div className="rounded-2xl p-[2px] bg-gradient-to-br from-[#F8D7E8] via-[#FF6EA9] to-[#FD8A44]">
                      <div className="rounded-2xl bg-white/95 dark:bg-zinc-900/80 border border-white/60 dark:border-white/10 p-0.5">
                        <Textarea
                          placeholder='Ex.: "Post about summer skincare"'
                          className="min-h-[35px] resize-y border-none bg-transparent focus-visible:ring-0 text-sm"
                          maxLength={500}
                          {...field}
                        />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="h-9 rounded-full border-0 bg-zinc-100 dark:bg-zinc-900 focus:ring-0 focus:ring-offset-0">
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="POST">Post</SelectItem>
                        <SelectItem value="STORY">Story</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter>
            <Button type="submit" disabled={isSubmitting} variant="ig">
              {isSubmitting ? "Generating…" : "Generate"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
