"use client";

import { Button } from "@/shared/shadcn/ui/button";
import { cn } from "@/shared/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";

interface Props {
  likesCount: number;
  toggleLike: () => void;
  isLoading: boolean;
  isPending: boolean;
  hasLiked: boolean;
}

export default function LikeButton({
  likesCount,
  toggleLike,
  isLoading,
  isPending,
  hasLiked,
}: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex flex-col items-center my-5 space-y-2"
    >
      <Button
        variant="ghost"
        onClick={() => {
          toggleLike();
        }}
        disabled={isLoading || isPending}
        className={cn(
          "flex items-center h-auto py-2 transition-all duration-300 rounded-full",
          "hover:bg-pink-50/50 hover:shadow-pink-100/50 hover:border-pink-300",
          hasLiked && "border-pink-300 text-pink-600",
        )}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={hasLiked ? "liked" : "unliked"}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Heart
              fill={hasLiked ? "pink-500" : "black"}
              stroke={hasLiked ? "pink" : "white"}
              strokeWidth={2}
              absoluteStrokeWidth
              className={cn(
                "h-5 w-5 transition-colors duration-300",
                hasLiked && "fill-pink-500",
              )}
            />
          </motion.div>
        </AnimatePresence>
        <motion.span
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {likesCount}
        </motion.span>
      </Button>
    </motion.div>
  );
}
