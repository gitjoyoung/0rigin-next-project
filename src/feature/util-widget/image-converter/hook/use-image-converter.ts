"use client";

import { compressImage, ImageFileType } from "@/shared/utils/compress-image";
import { useCallback, useEffect, useMemo, useReducer } from "react";
import { useDropzone } from "react-dropzone";

// 상태 머신 패턴으로 최적화
type ImageConverterState =
  | { status: "idle" }
  | { status: "file-loaded"; file: File; format: ImageFileType }
  | { status: "converting"; file: File; format: ImageFileType }
  | {
      status: "converted";
      file: File;
      format: ImageFileType;
      result: File;
      downloadUrl: string;
    }
  | { status: "error"; error: string };

type ImageAction =
  | { type: "LOAD_FILE"; payload: File }
  | { type: "SET_FORMAT"; payload: ImageFileType }
  | { type: "START_CONVERSION" }
  | { type: "CONVERSION_SUCCESS"; payload: File }
  | { type: "CONVERSION_ERROR"; payload: string }
  | { type: "RESET" };

const initialState: ImageConverterState = { status: "idle" };

function imageReducer(
  state: ImageConverterState,
  action: ImageAction,
): ImageConverterState {
  switch (action.type) {
    case "LOAD_FILE":
      return {
        status: "file-loaded",
        file: action.payload,
        format: "image/png", // 기본값
      };

    case "SET_FORMAT":
      if (state.status === "file-loaded" || state.status === "converted") {
        return { ...state, format: action.payload };
      }
      return state;

    case "START_CONVERSION":
      if (state.status === "file-loaded" || state.status === "converted") {
        return {
          status: "converting",
          file: state.file,
          format: state.format,
        };
      }
      return state;

    case "CONVERSION_SUCCESS":
      if (state.status === "converting") {
        return {
          status: "converted",
          file: state.file,
          format: state.format,
          result: action.payload,
          downloadUrl: URL.createObjectURL(action.payload),
        };
      }
      return state;

    case "CONVERSION_ERROR":
      return { status: "error", error: action.payload };

    case "RESET":
      // 기존 URL 정리 (side effect를 reducer 밖으로)
      if (state.status === "converted") {
        URL.revokeObjectURL(state.downloadUrl);
      }
      return initialState;

    default:
      return state;
  }
}

export default function useImageConverter() {
  const [state, dispatch] = useReducer(imageReducer, initialState);

  // 파생 상태들을 메모이제이션으로 최적화
  const derivedState = useMemo(() => {
    const currentFile =
      state.status === "file-loaded" ||
      state.status === "converting" ||
      state.status === "converted"
        ? state.file
        : null;

    return {
      // 파일 정보 (파생 상태)
      image: currentFile,
      preview: currentFile ? URL.createObjectURL(currentFile) : null,
      selectedFormat:
        state.status === "file-loaded" ||
        state.status === "converting" ||
        state.status === "converted"
          ? state.format
          : ("image/png" as ImageFileType),

      // 변환 정보 (파생 상태)
      conversionInfo: currentFile
        ? {
            before: { size: currentFile.size, format: currentFile.type },
            after:
              state.status === "converted"
                ? {
                    size: state.result.size,
                    format: state.format,
                  }
                : null,
          }
        : null,

      // UI 상태
      isLoading: state.status === "converting",
      downloadUrl: state.status === "converted" ? state.downloadUrl : null,
      error: state.status === "error" ? state.error : null,

      // 상태 플래그들
      hasFile: Boolean(currentFile),
      canConvert:
        state.status === "file-loaded" || state.status === "converted",
      isConverted: state.status === "converted",
      hasError: state.status === "error",
    };
  }, [state]);

  // preview URL 정리 (메모리 최적화)
  useEffect(() => {
    return () => {
      if (derivedState.preview) {
        URL.revokeObjectURL(derivedState.preview);
      }
    };
  }, [derivedState.preview]);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    if (rejectedFiles.length > 0) {
      dispatch({
        type: "CONVERSION_ERROR",
        payload: "이미지 파일만 업로드 가능합니다.",
      });
      return;
    }

    const file = acceptedFiles[0];
    if (!file) return;

    // 파일 검증 로직
    const validationError = validateFile(file);
    if (validationError) {
      dispatch({ type: "CONVERSION_ERROR", payload: validationError });
      return;
    }

    dispatch({ type: "LOAD_FILE", payload: file });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"] },
    maxFiles: 1,
    multiple: false,
  });

  const handleConvert = useCallback(async () => {
    if (!derivedState.canConvert || !derivedState.image) return;

    dispatch({ type: "START_CONVERSION" });

    try {
      const result = await compressImage(derivedState.image, {
        fileType: derivedState.selectedFormat,
        maxSizeMB: 0.1,
        maxWidthOrHeight: 1920,
      });

      // UI 피드백을 위한 최소 로딩 시간
      await new Promise((r) => setTimeout(r, 300));

      if (result.status === "success") {
        dispatch({ type: "CONVERSION_SUCCESS", payload: result.file });
      } else {
        dispatch({
          type: "CONVERSION_ERROR",
          payload: "이미지 변환에 실패했습니다.",
        });
      }
    } catch (error) {
      dispatch({
        type: "CONVERSION_ERROR",
        payload: "이미지 변환 중 오류가 발생했습니다.",
      });
    }
  }, [
    derivedState.canConvert,
    derivedState.image,
    derivedState.selectedFormat,
  ]);

  const handleReset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  const setSelectedFormat = useCallback((format: ImageFileType) => {
    dispatch({ type: "SET_FORMAT", payload: format });
  }, []);

  const getFileExtension = useCallback((mimeType: string) => {
    const extensionMap: Record<string, string> = {
      "image/jpeg": "jpg",
      "image/jpg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
      "image/gif": "gif",
    };
    return extensionMap[mimeType] || "jpg";
  }, []);

  return {
    // 파일 상태 (파생 상태 포함)
    file: {
      image: derivedState.image,
      preview: derivedState.preview,
      selectedFormat: derivedState.selectedFormat,
      conversionInfo: derivedState.conversionInfo,
      hasFile: derivedState.hasFile,
    },

    // UI 상태 (최적화됨)
    ui: {
      isLoading: derivedState.isLoading,
      downloadUrl: derivedState.downloadUrl,
      error: derivedState.error,
      canConvert: derivedState.canConvert,
      isConverted: derivedState.isConverted,
      hasError: derivedState.hasError,
    },

    // 드롭존 (변경 없음)
    dropzone: {
      getRootProps,
      getInputProps,
      isDragActive,
    },

    // 액션들 (메모이제이션 적용)
    actions: {
      handleConvert,
      handleReset,
      setSelectedFormat,
    },

    // 유틸리티 (메모이제이션 적용)
    utils: {
      getFileExtension,
    },
  };
}

// 파일 검증 로직 분리
function validateFile(file: File): string | null {
  if (!file.type.startsWith("image/")) {
    return "이미지 파일만 업로드 가능합니다.";
  }

  if (file.size > 10 * 1024 * 1024) {
    return "파일 크기는 10MB를 초과할 수 없습니다.";
  }

  return null;
}
