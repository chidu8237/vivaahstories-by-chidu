import { FadeIn } from "@/components/animations/fade-in";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}

export function PageHeader({ eyebrow, title, description, className }: PageHeaderProps) {
  return (
    <header className={cn("section-padding border-b border-border pt-28 md:pt-32", className)}>
      <div className="container-editorial">
        <FadeIn>
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          <h1 className="section-title text-balance">{title}</h1>
          {description && <p className="section-subtitle text-balance">{description}</p>}
        </FadeIn>
      </div>
    </header>
  );
}
