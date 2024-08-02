import React, { InputHTMLAttributes } from "react";
import Label from "./Label";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  error?: string;
}
export default function Input({ title, error, ...rest }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <Label title={title} />
      <input
        {...rest}
        className="input input-bordered flex items-center gap-2 text-blue-700"
        type="text"
      />
      {error && <div className="text-red-400 text-xs">{error}</div>}
    </div>
  );
}
