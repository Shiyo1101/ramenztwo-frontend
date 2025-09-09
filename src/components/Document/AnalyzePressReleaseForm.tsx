"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import { analyzePressReleaseAction } from "@/actions/document/analyze-press-release-acton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { schemas } from "@/types/zod-schemas";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type AnalyzePressReleaseFormProps = {
  setIsAnalyzePressReleaseDialogOpen: (value: boolean) => void;
  contentMarkdown: string;
};

const AnalyzePressReleaseForm = ({
  setIsAnalyzePressReleaseDialogOpen,
  contentMarkdown,
}: AnalyzePressReleaseFormProps) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof schemas.PressReleaseInput>>({
    resolver: zodResolver(schemas.PressReleaseInput),
    defaultValues: {
      title: "",
      top_image: {},
      content_markdown: contentMarkdown,
      metadata: {
        persona: undefined,
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
                    placeholder={"タイトルを入力してください"}
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="top_image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>トップ画像</FormLabel>
                <FormControl>
                  <Input
                    name={field.name}
                    ref={field.ref}
                    disabled={isPending}
                    type="file"
                    onBlur={field.onBlur}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file && ["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
                        field.onChange({ file });
                      } else {
                        field.onChange({});
                        if (file) {
                          toast.error("対応している画像形式は jpg, png, jpeg のみです。");
                        }
                      }
                    }}
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
                    placeholder={"例: 20代女性、IT企業勤務、マーケティング担当"}
                    type="text"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={isPending || !form.formState.isDirty}>
          {isPending && <Loader2Icon className="animate-spin" />}
          解析を実行
        </Button>
      </form>
    </Form>
  );
};

export default AnalyzePressReleaseForm;
