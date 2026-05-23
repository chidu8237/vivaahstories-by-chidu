"use client";

import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  isBefore,
  isSameDay,
  isSameMonth,
  parseISO,
  startOfMonth,
  startOfToday,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface BookingCalendarProps {
  value?: string;
  onChange: (date: string) => void;
  unavailableDates?: string[];
}

export function BookingCalendar({
  value,
  onChange,
  unavailableDates = [],
}: BookingCalendarProps) {
  const [viewDate, setViewDate] = useState(() =>
    value ? parseISO(value) : startOfToday(),
  );
  const today = startOfToday();
  const selected = value ? parseISO(value) : null;

  const monthStart = startOfMonth(viewDate);
  const monthEnd = endOfMonth(viewDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const isUnavailable = (day: Date) =>
    unavailableDates.some((d) => isSameDay(parseISO(d), day));

  return (
    <div className="glass-card rounded-sm border border-border p-4 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setViewDate(addMonths(viewDate, -1))}
          className="flex h-9 w-9 items-center justify-center rounded-sm border border-border transition-colors hover:bg-muted"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="font-display text-lg">{format(viewDate, "MMMM yyyy")}</span>
        <button
          type="button"
          onClick={() => setViewDate(addMonths(viewDate, 1))}
          className="flex h-9 w-9 items-center justify-center rounded-sm border border-border transition-colors hover:bg-muted"
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center font-sans text-xs uppercase tracking-wider text-muted-foreground">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d} className="py-2">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: monthStart.getDay() }).map((_, i) => (
          <div key={`pad-${i}`} />
        ))}
        {days.map((day) => {
          const past = isBefore(day, today);
          const unavailable = isUnavailable(day);
          const disabled = past || unavailable;
          const isSelected = selected && isSameDay(day, selected);

          return (
            <button
              key={day.toISOString()}
              type="button"
              disabled={disabled}
              onClick={() => onChange(format(day, "yyyy-MM-dd"))}
              className={cn(
                "aspect-square rounded-sm font-sans text-sm transition-all duration-300",
                !isSameMonth(day, viewDate) && "text-muted-foreground/40",
                disabled && "cursor-not-allowed text-muted-foreground/30 line-through",
                !disabled && "hover:bg-muted",
                isSelected && "bg-foreground text-background",
                unavailable && !past && "text-gold/60",
              )}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>

      <p className="mt-4 font-sans text-xs text-muted-foreground">
        <span className="text-gold">—</span> Unavailable dates shown for reference
      </p>
    </div>
  );
}
