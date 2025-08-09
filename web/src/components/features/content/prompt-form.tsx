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
import { cn } from "@/lib/utils";
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
import { toast } from "sonner";

const FormSchema = z.object({
  prompt: z
    .string()
    .min(4, "Enter at least 4 characters")
    .max(500, "Max. 500 characters"),
  type: z.enum(["POST", "STORY"], { required_error: "Select a type" }),
});

export type PromptFormValues = z.infer<typeof FormSchema>;

export function PromptForm({
  defaultValues = { prompt: "", type: "" },
  onSubmit,
  submitting = false,
}: {
  defaultValues?: PromptFormValues;
  onSubmit: (values: PromptFormValues) => Promise<void> | void;
  submitting?: boolean;
}) {
  const form = useForm<PromptFormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues,
    mode: "onChange",
  });

  function handleSubmit(data: z.infer<typeof FormSchema>) {
    onSubmit(data);
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  const localSubmitting = submitting || form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4"
        noValidate
      >
        <Card className="border-1 shadow-none">
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
                          id="prompt"
                          autoFocus
                          placeholder='Ex.: "Post about summer skincare"'
                          className="min-h-[35px] resize-y border-none bg-transparent focus-visible:ring-0 text-sm"
                          maxLength={700}
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
            <Button
              type="submit"
              disabled={localSubmitting}
              className={cn(
                "text-white rounded-full px-5 h-10",
                "bg-gradient-to-r from-[#FF6EA9] via-[#FF4E88] to-[#FD8A44]",
                "shadow-[0_8px_30px_rgba(255,105,180,0.35)] hover:brightness-105 active:scale-[.98] transition-all"
              )}
            >
              {localSubmitting ? "Generating…" : "Generate"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
