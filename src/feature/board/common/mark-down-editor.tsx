"use client";

import { toast } from "@/shared/hooks/use-toast";
import { SupabaseBrowserClient } from "@/shared/lib/supabase/supabase-browser-client";
import { compressImage } from "@/shared/utils/compress-image";
import { commands } from "@uiw/react-md-editor";
import dayjs from "dayjs";
import { ImageUp } from "lucide-react";
import mermaid from "mermaid";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import rehypeHighlight from "rehype-highlight";
import { getCodeString } from "rehype-rewrite";
import rehypeSanitize from "rehype-sanitize";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: true });

const randomid = () => parseInt(String(Math.random() * 1e15), 10).toString(36);
const Code = ({ inline, children = [], className, ...props }: any) => {
  const demoid = useRef(`dome${randomid()}`);
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const isMermaid =
    className && /^language-mermaid/.test(className.toLocaleLowerCase());
  const code = children
    ? getCodeString(props.node.children)
    : children[0] || "";

  useEffect(() => {
    if (container && isMermaid && demoid.current && code) {
      mermaid
        .render(demoid.current, code)
        .then(({ svg, bindFunctions }) => {
          container.innerHTML = svg as string;
          if (bindFunctions) {
            bindFunctions(container);
          }
        })
        .catch((error) => {
          console.log("error:", error);
        });
    }
  }, [container, isMermaid, code, demoid]);

  const refElement = useCallback((node: HTMLElement) => {
    if (node !== null) {
      setContainer(node);
    }
  }, []);

  if (isMermaid) {
    return (
      <Fragment>
        <code id={demoid.current} style={{ display: "none" }} />
        <code className={className} ref={refElement} data-name="mermaid" />
      </Fragment>
    );
  }
  return <code className={className}>{children}</code>;
};

interface MarkDownEditorProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  onImageUpload?: (imageUrl: string) => void;
}

const supabase = SupabaseBrowserClient();

const MarkDownEditor = ({
  name,
  value,
  onChange,
  onImageUpload,
}: MarkDownEditorProps) => {
  const [error, setError] = React.useState<string>("");
  const [mounted, setMounted] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);
  const handleChange = React.useCallback(
    (val?: string) => {
      const newValue = val || "";
      onChange(newValue);
    },
    [onChange],
  );

  const showError = React.useCallback((message: string) => {
    setError(message);
    toast({
      title: "이미지 업로드 오류",
      description: message,
      duration: 3000,
    });
  }, []);

  const handleImageUpload = React.useCallback(
    async (file: File) => {
      if (!file || file.size === 0) {
        showError("파일이 비어있습니다.");
        return;
      }
      const result = await compressImage(file, {
        fileType: "image/jpeg",
        maxSizeMB: 0.1,
        maxHeight: 500,
      });
      if (result.status === "error") {
        showError(`이미지 압축에 실패했습니다. ${result.errorMessage}`);
        return;
      }
      const timestamp = dayjs().format("YYYYMMDDHHmmss");
      const fileExtension = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const saveStorageUrl = `public/image_${timestamp}.${fileExtension}`;

      const { data, error } = await supabase.storage
        .from("images")
        .upload(saveStorageUrl, result.file, {
          cacheControl: "3600",
          upsert: false,
          contentType: result.file.type,
        });

      if (error) {
        showError(`이미지 업로드 실패: ${error.message}`);
        return;
      }

      // upload 성공 후 public URL 생성
      const publicUrl = supabase.storage.from("images").getPublicUrl(data.path)
        .data.publicUrl;

      const imageMarkdown = `![image_${timestamp}](${publicUrl})`;
      const newValue = value + (value ? "\n" : "") + imageMarkdown;
      handleChange(newValue);

      // 이미지 업로드 완료 콜백 호출
      if (onImageUpload) {
        onImageUpload(publicUrl);
      }
    },
    [value, handleChange, showError, onImageUpload],
  );

  const uploadImageCommand = React.useMemo(
    () => ({
      name: "upload-image",
      keyCommand: "upload-image",
      buttonProps: { "aria-label": "Upload image" },
      icon: <ImageUp size={16} />,
      execute: () => fileInputRef.current?.click(),
    }),
    [],
  );

  const editorCommands = React.useMemo(
    () => [
      commands.title,
      commands.bold,
      commands.unorderedListCommand,
      commands.hr,
      commands.divider,
      commands.code,
      commands.quote,
      commands.divider,
      uploadImageCommand,
    ],
    [uploadImageCommand],
  );

  return (
    <article>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            handleImageUpload(file);
          }
          e.target.value = "";
        }}
      />

      <MDEditor
        value={value}
        onChange={handleChange}
        data-color-mode={theme === "dark" ? "dark" : "light"}
        style={
          {
            backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
            color: "inherit",
            border: "none",
            fontFamily: "inherit",
            fontSize: "14px",
            "--md-editor-preview-line-height": "1.5",
            "--md-editor-text-line-height": "1.5",
          } as React.CSSProperties
        }
        textareaProps={{
          style: {
            fontSize: "14px",
            fontFamily: "inherit",
            lineHeight: "1.5",
          },
        }}
        height={500}
        commands={editorCommands}
        previewOptions={{
          remarkPlugins: [remarkGfm, remarkBreaks],
          rehypePlugins: [rehypeSanitize, rehypeHighlight],
          components: {
            code: Code,
          },
          wrapperElement: mounted
            ? {
                "data-color-mode": theme === "dark" ? "dark" : "light",
                className: `prose max-w-none prose-pre:bg-transparent prose-pre:p-0 prose-pre:m-0 ${theme === "dark" ? "prose-invert" : ""}`,
              }
            : undefined,
        }}
      />
    </article>
  );
};

export default React.memo(MarkDownEditor);
