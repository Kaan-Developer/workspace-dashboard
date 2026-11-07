import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardType = {
  id?: string | number;
  children?: ReactNode;
  className?: string;
};

const Card = ({ children, id, className }: CardType) => {
  return (
    <div
      id={id === undefined ? undefined : String(id)}
      className={cn("flex flex-col gap-2 rounded-xl border border-border bg-card p-4 shadow-sm", className)}
    >
      {children}
    </div>
  );
};

export default Card;
