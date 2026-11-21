import { Reveal } from "@/components/site/reveal";

/** Numbered notebook-style section label, a heading and an optional intro line. */
export function SectionHeading({
  n,
  label,
  title,
  intro,
  className,
}: {
  n: string;
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <p className="flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
        <span className="text-primary">{n}</span>
        <span className="h-px w-8 bg-foreground/20" />
        {label}
      </p>
      <h2 className="mt-4 font-heading text-[clamp(2.1rem,4.4vw,3.4rem)] font-bold leading-[1.04] tracking-[-0.035em]">{title}</h2>
      {intro && <p className="mt-4 max-w-[60ch] text-[17px] leading-relaxed text-muted-foreground">{intro}</p>}
    </Reveal>
  );
}
