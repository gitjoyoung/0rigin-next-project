import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import SearchOverlay from "./search-overlay";

export default function SearchButton() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsSearchOpen(true)}
        aria-label="검색"
        title="검색 (⌘J / Ctrl+J)"
      >
        <Search size={18} />
      </button>
      <SearchOverlay open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </>
  );
}
