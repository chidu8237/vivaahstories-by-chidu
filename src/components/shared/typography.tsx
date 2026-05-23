import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  gold?: boolean;
}

export function Eyebrow({ children, className, gold = false }: EyebrowProps) {
  return (
    <p
      className={cn(
        "eyebrow",
        gold && "text-gold",
        className,
      )}
    >
      {children}
    </p>
  );
}

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-14 md:mb-20",
        align === "center" && "mx-auto max-w-3xl text-center",
        className,
      )}
    >
      <div className={cn("accent-gold-line mb-6", align === "center" && "mx-auto")} />
      <h2 className="section-title text-balance">{title}</h2>
      {subtitle && (
        <p className={cn("section-subtitle", align === "center" && "mx-auto")}>{subtitle}</p>
      )}
    </div>
  );
}

interface DisplayTextProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "p";
  size?: "xl" | "lg" | "md";
  className?: string;
}

export function DisplayText({
  children,
  as: Tag = "h1",
  size = "xl",
  className,
}: DisplayTextProps) {
  const sizeClass = {
    xl: "text-display-xl",
    lg: "text-display-lg",
    md: "text-display-md",
  }[size];

  return <Tag className={cn("font-display font-medium tracking-tight", sizeClass, className)}>{children}</Tag>;
}
