import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  fullWidth?: boolean;
  bordered?: boolean;
  dark?: boolean;
  ariaLabel?: string;
}

/**
 * Consistent section shell — spacing, width, optional dark variant.
 */
export function SectionWrapper({
  id,
  children,
  className,
  containerClassName,
  fullWidth = false,
  bordered = false,
  dark = false,
  ariaLabel,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(
        "section-padding relative",
        bordered && "border-t border-border",
        dark && "bg-cinematic-black text-cinematic-white",
        className,
      )}
    >
      {fullWidth ? (
        children
      ) : (
        <div className={cn("container-editorial", containerClassName)}>{children}</div>
      )}
    </section>
  );
}
