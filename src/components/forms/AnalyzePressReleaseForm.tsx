"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import { analyzePressReleaseAction } from "@/actions/analyze-press-release";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { schemas } from "@/types/zod-schemas";

type AnalyzePressReleaseFormProps = {
  setIsAnalyzePressReleaseDialogOpen: (value: boolean) => void;
  contentMarkdown: string;
};

export default function AnalyzePressReleaseForm({
  setIsAnalyzePressReleaseDialogOpen,
  contentMarkdown,
}: AnalyzePressReleaseFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof schemas.PressReleaseInput>>({
    resolver: zodResolver(schemas.PressReleaseInput),
    defaultValues: {
      title: "",
      top_image: { url: "" },
      content_markdown: contentMarkdown,
      metadata: {
        persona: "",
      },
    },
  });

  const onFormSubmit = (value: z.infer<typeof schemas.PressReleaseInput>) => {
    startTransition(() => {
      analyzePressReleaseAction(value).then((data) => {
        if (data.success) {
          toast.success(data.success);
        }

        if (data.error) {
          toast.error(data.error);
        }
        setIsAnalyzePressReleaseDialogOpen(false);
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem aria-required>
                <FormLabel>タイトル</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="タイトルを入力してください"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="top_image.url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>トップ画像URL</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    disabled={isPending}
                    placeholder="画像のURLを入力してください"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="metadata.persona"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ペルソナ</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="例: 20代女性、IT企業勤務、マーケティング担当"
                    type="text"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={isPending || !form.formState.isDirty}>
          {isPending && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
          解析を実行
        </Button>
      </form>
    </Form>
  );
}
