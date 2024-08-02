import React from "react";

interface Props {
  title: string;
}
export default function Label({ title }: Props) {
  return (
    <label className="block text-gray-500 text-sm font-bold mb-2">
      {title}
    </label>
  );
}
