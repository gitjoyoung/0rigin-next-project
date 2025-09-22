import { useState } from "react";

type MemoWindow = {
  id: number;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  content: string;
};

export function useMemoManager() {
  const [windows, setWindows] = useState<MemoWindow[]>([]);
  const [zIndexCounter, setZIndexCounter] = useState(1000);
  const [focusedId, setFocusedId] = useState<number | null>(null);

  const handleOpen = () => {
    const newId = Date.now() + Math.floor(Math.random() * 1000);
    setWindows((ws) => [
      ...ws,
      {
        id: newId,
        isMinimized: false,
        isMaximized: false,
        zIndex: zIndexCounter + 1,
        content: "",
      },
    ]);
    setZIndexCounter((z) => z + 1);
    setFocusedId(newId);
  };
  const handleClose = (id: number) => {
    setWindows((ws) => ws.filter((w) => w.id !== id));
    setFocusedId((prev) => (prev === id ? null : prev));
  };
  const handleMinimize = (id: number) => {
    setWindows((ws) =>
      ws.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)),
    );
    setFocusedId((prev) => (prev === id ? null : prev));
  };
  const handleMaximize = (id: number) => {
    setWindows((ws) =>
      ws.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w)),
    );
  };
  const handleRestore = (id: number) => {
    setWindows((ws) =>
      ws.map((w) => (w.id === id ? { ...w, isMinimized: false } : w)),
    );
    setFocusedId(id);
    handleFocus(id);
  };
  const handleFocus = (id: number) => {
    setZIndexCounter((z) => {
      setWindows((ws) =>
        ws.map((w) => (w.id === id ? { ...w, zIndex: z + 1 } : w)),
      );
      return z + 1;
    });
    setFocusedId(id);
  };

  const handleUpdateContent = (id: number, content: string) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, content } : w)));
  };

  return {
    windows,
    focusedId,
    handleOpen,
    handleClose,
    handleMinimize,
    handleMaximize,
    handleRestore,
    handleFocus,
    handleUpdateContent,
  };
}
