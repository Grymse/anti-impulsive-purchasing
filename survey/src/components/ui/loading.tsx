import { cn } from "@/lib/utils";
import "./loading.css";

type Props = {
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
};

export function Loading({ disabled, className, size = "md", children }: Props) {
  if (disabled) return children;

  const sizeClasses =
    size === "sm"
      ? "h-5 h-5 p-1"
      : size === "lg"
      ? "w-10 h-10 p-2"
      : "w-8 h-8 p-1";
  return <div className={cn("loader bg-primary", sizeClasses, className)} />;
}
