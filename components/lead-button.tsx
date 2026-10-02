"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { LeadDialog } from "@/components/lead-dialog";

type LeadButtonProps = Pick<
  ButtonProps,
  "className" | "size" | "variant"
> & {
  label: string;
  showArrow?: boolean;
};

export function LeadButton({
  className,
  label,
  showArrow = false,
  size,
  variant,
}: LeadButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        className={className}
        size={size}
        variant={variant}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        {label}
        {showArrow ? (
          <ArrowRight data-icon="inline-end" aria-hidden="true" />
        ) : null}
      </Button>
      <LeadDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
