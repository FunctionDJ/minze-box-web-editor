import type { Dispatch, InputHTMLAttributes } from "react";

interface CustomProps {
  onValue: Dispatch<number>;
}

export const NumValue = ({
  children,
  onValue,
  ...props
}: CustomProps & InputHTMLAttributes<HTMLInputElement>) => (
  <div className="border rounded flex *:grow *:px-2">
    <code className="border-r text-gray-500 w-0">{children}</code>
    <input
      type="number"
      title={props.disabled ? "Analog shields are disabled" : undefined}
      className={`w-0 font-mono ${props.disabled ? "text-gray-500" : ""}`}
      onChange={(e) => onValue(Number.parseInt(e.currentTarget.value, 10))}
      {...props}
    />
  </div>
);
