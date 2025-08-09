import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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

const schema = z.object({
  prompt: z
    .string()
    .min(4, "Digite pelo menos 4 caracteres")
    .max(500, "Máx. 500 caracteres"),
  type: z.enum(["POST", "STORY"], { required_error: "Selecione um tipo" }),
});

export type PromptFormValues = z.infer<typeof schema>;

export function PromptForm({
  defaultValues = { prompt: "", type: "" },
  onSubmit,
  submitting = false,
}: {
  defaultValues?: PromptFormValues;
  onSubmit: (values: PromptFormValues) => Promise<void> | void;
  submitting?: boolean;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PromptFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onChange",
  });

  const type = watch("type");
  const prompt = watch("prompt") ?? "";
  const count = prompt.length;
  const max = 500;

  const localSubmitting = submitting || isSubmitting;

  return (
    <Card className="border-0 shadow-none">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <CardHeader>
          <CardTitle className="text-base font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#FF6EA9] via-[#FF4E88] to-[#FD8A44]">
            Login to your account
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 pt-0">
          <div className="flex items-center justify-between">
            <Label htmlFor="prompt" className="text-sm">
              Prompt
            </Label>
            <span
              className={cn(
                "text-xs",
                count > max ? "text-red-600" : "text-muted-foreground"
              )}
            >
              {count}/{max}
            </span>
          </div>

          <div className="rounded-2xl p-[2px] bg-gradient-to-br from-[#F8D7E8] via-[#FF6EA9] to-[#FD8A44]">
            <div className="rounded-2xl bg-white/95 dark:bg-zinc-900/80 border border-white/60 dark:border-white/10 p-0.5">
              <Textarea
                id="prompt"
                autoFocus
                placeholder='Ex.: "Post sobre skincare no verão"'
                className="min-h-[35px] resize-y border-none bg-transparent focus-visible:ring-0 text-sm"
                maxLength={700}
                {...register("prompt")}
              />
            </div>
          </div>
          {errors.prompt && (
            <p className="text-sm text-red-600 -mt-1">
              {errors.prompt.message}
            </p>
          )}

          <div className="space-y-2">
            <Label className="text-sm">Tipo de conteúdo</Label>
            <Select
              value={type}
              onValueChange={(v) =>
                setValue("type", v as "POST" | "STORY", {
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger className="h-9 rounded-full border-0 bg-zinc-100 dark:bg-zinc-900 focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="Selecione um tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="POST">Post</SelectItem>
                <SelectItem value="STORY">Story</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {errors.type && (
            <p className="text-sm text-red-600 -mt-1">{errors.type.message}</p>
          )}
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
            {localSubmitting ? "Gerando…" : "Gerar variações"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
