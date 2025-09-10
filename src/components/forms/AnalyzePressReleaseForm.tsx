"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
import type { PressReleaseAnalysisResponse, PressReleaseInput } from "@/types/api";
import { schemas } from "@/types/zod-schemas";

type AnalyzePressReleaseFormProps = {
  setIsAnalyzePressReleaseDialogOpen: (value: boolean) => void;
  contentHtml: string;
  setAnalysisResponse: (analysisResponse: PressReleaseAnalysisResponse | undefined) => void;
  isPending: boolean;
  startTransition: (callback: () => void) => void;
};

export default function AnalyzePressReleaseForm({
  setIsAnalyzePressReleaseDialogOpen,
  contentHtml,
  setAnalysisResponse,
  isPending,
  startTransition,
}: AnalyzePressReleaseFormProps) {
  const form = useForm<PressReleaseInput>({
    resolver: zodResolver(schemas.PressReleaseInput),
    defaultValues: {
      title: "",
      top_image: { url: "" },
      content_html: contentHtml,
      metadata: {
        persona: "",
      },
    },
  });

  const onFormSubmit = (value: PressReleaseInput) => {
    setIsAnalyzePressReleaseDialogOpen(false);

    startTransition(() => {
      analyzePressReleaseAction(value).then((data) => {
        if ("success" in data && data.success) {
          toast.success(data.success);
          setAnalysisResponse(data);
        }

        if (data.error) {
          toast.error(data.error);
        }
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
                <FormLabel className="flex items-center gap-1">
                  タイトル
                  <span className="text-[20px] text-red-500 leading-none">*</span>
                </FormLabel>

                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="タイトルを入力してください"
                    type="text"
                    required
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
          解析を実行
        </Button>
      </form>
    </Form>
  );
}
