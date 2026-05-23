import { cn } from "@/lib/utils";

interface GrainOverlayProps {
  className?: string;
  intensity?: "light" | "medium" | "heavy";
}

export function GrainOverlay({ className, intensity = "medium" }: GrainOverlayProps) {
  const opacity = {
    light: "opacity-[0.06]",
    medium: "opacity-[0.12]",
    heavy: "opacity-[0.18]",
  }[intensity];

  return (
    <div
      className={cn("grain-overlay", opacity, className)}
      aria-hidden
    />
  );
}
