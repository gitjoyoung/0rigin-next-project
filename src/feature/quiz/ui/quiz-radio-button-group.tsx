"use client";
import { Label } from "@/shared/shadcn/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shared/shadcn/ui/radio-group";
import { cn } from "@/shared/utils/cn";

interface QuizOption {
  id: string;
  text: string;
}

interface Props {
  options: QuizOption[];
  selectedOption: string;
  onSelect: (value: string) => void;
}

export default function QuizRadioButtonGroup({
  options,
  selectedOption,
  onSelect,
}: Props) {
  return (
    <RadioGroup
      className="flex-col flex gap-3 my-2 justify-center"
      onValueChange={onSelect}
      value={selectedOption}
      defaultValue=""
    >
      {options.map(({ id, text }) => (
        <div
          key={id}
          className={cn(
            "flex items-center space-x-4 p-3 border transition-all duration-200 cursor-pointer rounded-md",
            "border-black dark:border-white bg-white dark:bg-black",
            "hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black",
            selectedOption === id &&
              "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white",
          )}
          onClick={() => onSelect(id)}
        >
          <RadioGroupItem
            value={id}
            id={id}
            className={cn(
              "border w-5 h-5",
              selectedOption === id
                ? "border-white dark:border-black bg-white dark:bg-black"
                : "border-black dark:border-white bg-white dark:bg-black",
            )}
          />
          <Label
            htmlFor={id}
            className="text-sm font-medium leading-relaxed cursor-pointer flex items-center flex-1"
          >
            {text}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
