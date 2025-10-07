"use client";
import { Label } from "@/shared/shadcn/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shared/shadcn/ui/radio-group";

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
      className="flex-col flex justify-center"
      onValueChange={onSelect}
      value={selectedOption}
      defaultValue=""
    >
      {options.map(({ id, text }) => (
        <div
          key={id}
          className="flex items-center space-x-4 p-2 border"
          onClick={() => onSelect(id)}
        >
          <RadioGroupItem value={id} id={id} className="w-5 h-5" />
          <Label
            htmlFor={id}
            className="text-sm font-medium cursor-pointer flex items-center flex-1"
          >
            {text}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
