import { InputHTMLAttributes } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LabelInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

export function LabelInput({ label, name, ...rest }: LabelInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name} className="font-medium text-lg">
        {label}
      </Label>
      <Input
        id={name}
        {...rest}
        className="h-12 rounded-md outline-none p-3 font-medium bg-white text-black"
      />
    </div>
  );
}
