import { InputHTMLAttributes } from "react";
import { Input } from "./ui/input";

interface LabelInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

export function LabelInput({ label, name, ...rest }: LabelInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-medium text-lg">
        {label}
      </label>
      <Input
        name={name}
        {...rest}
        className="h-12 rounded-lg outline-none p-3 font-medium bg-primary text-black"
      />
    </div>
  );
}
