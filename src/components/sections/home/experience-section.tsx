"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/shared/typography";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { EXPERIENCE_CARDS } from "@/constants/home";
import { fadeInUp, staggerContainer } from "@/constants/animations";
import { cn } from "@/lib/utils";

export function ExperienceSection() {
  return (
    <SectionWrapper ariaLabel="Cinematic experience">
      <Reveal>
        <SectionHeading
          title="The Cinematic Experience"
          subtitle="A premium journey from first conversation to heirloom gallery delivery."
        />
      </Reveal>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={staggerContainer}
        className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-4"
        style={{ scrollbarWidth: "none" }}
      >
        {EXPERIENCE_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <motion.article
              key={card.id}
              variants={fadeInUp}
              className={cn(
                "group min-w-[280px] flex-shrink-0 snap-center",
                "glass-card rounded-sm border border-border/50 p-8",
                "transition-all duration-500 hover:-translate-y-2 hover:border-gold/30 hover:shadow-luxury",
                "md:min-w-0",
              )}
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-sm border border-gold/30 bg-gold/5 transition-colors group-hover:bg-gold/10">
                <Icon className="h-5 w-5 text-gold transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-xl">{card.title}</h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">
                {card.description}
              </p>
              <div className="mt-6 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
            </motion.article>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}
