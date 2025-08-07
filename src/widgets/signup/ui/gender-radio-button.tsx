import { Label } from "@/shared/shadcn/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shared/shadcn/ui/radio-group";

const genderOptions = [
  { id: "man", label: "남성", value: "man" },
  {
    id: "women",
    label: "여성",
    value: "women",
  },
  { id: "etc", label: "기타", value: "etc" },
];

interface GenderRadioButtonProps {
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

export default function GenderRadioButton({
  disabled = false,
  value,
  onChange,
}: GenderRadioButtonProps) {
  return (
    <RadioGroup
      name="gender"
      value={value}
      onValueChange={onChange}
      className="flex items-center justify-between gap-2 px-2"
      disabled={disabled}
      aria-label="성별 선택"
    >
      {genderOptions.map(({ id, label }) => (
        <div key={id} className="flex gap-2 items-center">
          <RadioGroupItem value={id} id={id} />
          <Label htmlFor={id}>{label}</Label>
        </div>
      ))}
    </RadioGroup>
  );
}
