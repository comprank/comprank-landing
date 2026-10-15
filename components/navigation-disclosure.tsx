"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";

/** Inline disclosure: unlike a portaled menu, closed links remain in server HTML. */
export function NavigationDisclosure({
  open, onOpenChange, label, children, className, triggerClassName, panelClassName, hover = false,
}: {
  hover?: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  label: ReactNode;
  children: ReactNode;
  className?: string;
  triggerClassName?: string;
  panelClassName?: string;
}) {
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelClose = () => { if (closeTimer.current) clearTimeout(closeTimer.current); };
  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !root.current?.contains(event.target)) {
        onOpenChange(false);
      }
    };
    // Never leave an open, focused panel behind after changing layout breakpoints.
    const resize = () => onOpenChange(false);
    document.addEventListener("pointerdown", dismiss);
    window.addEventListener("resize", resize);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      window.removeEventListener("resize", resize);
    };
  }, [open, onOpenChange]);

  return (
    <div
      ref={root}
      className={className}
      onPointerEnter={(event) => {
        if (!hover || event.pointerType !== "mouse") return;
        cancelClose();
        onOpenChange(true);
      }}
      onPointerLeave={(event) => {
        if (!hover || event.pointerType !== "mouse") return;
        cancelClose();
        closeTimer.current = setTimeout(() => {
          if (!root.current?.contains(document.activeElement)) onOpenChange(false);
        }, 180);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          event.stopPropagation();
          onOpenChange(false);
          trigger.current?.focus();
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) onOpenChange(false);
      }}
    >
      <button
        ref={trigger}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        className={triggerClassName}
        onClick={() => onOpenChange(!open)}
      >
        {label}
      </button>
      <div id={id} hidden={!open} className={panelClassName}>
        {children}
      </div>
    </div>
  );
}
