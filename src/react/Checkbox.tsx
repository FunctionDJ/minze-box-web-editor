import type { InputHTMLAttributes } from "react";

export const Checkbox = ({
  title,
  children,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => (
  <label
    className={`cursor-pointer *:cursor-pointer select-none px-1 flex gap-1 ${
      className ?? ""
    }`}
    title={title}
  >
    <input type="checkbox" {...props} className="cursor-pointer" />
    <span>{children}</span>
  </label>
);
