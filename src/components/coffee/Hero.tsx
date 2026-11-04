import { useRef } from "react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { drinks, formatPrice } from "@/data/drinks";

type Props = {
  index: number;
  select: (i: number) => void;
  step: (d: 1 | -1) => void;
};

export function Hero({ index, select, step }: Props) {
  const drink = drinks[index]!;
  const reduce = useReducedMotion();
  const hoverTimer = useRef<number | null>(null);

  // Hover preview with delay to avoid accidental fast swaps (mouse only)
  const hoverSelect = (e: React.PointerEvent, i: number) => {
    if (e.pointerType !== "mouse") return;
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => select(i), 350);
  };
  const cancelHover = () => {
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
  };

  const fadeUp = (d: number) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] as const } };

  return (
    <section id="inicio" className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-16 pt-4 md:px-10 lg:min-h-[78vh] lg:grid-cols-2 lg:gap-8">
      <div className="max-w-xl">
        <motion.span {...fadeUp(0)} className="eyebrow inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden />
          Seu momento especial começa aqui
        </motion.span>
        <motion.h1 {...fadeUp(0.1)} className="mt-8 font-display text-5xl leading-[1.05] sm:text-6xl xl:text-7xl">
          A vida fica melhor com <em className="text-accent">café.</em>
        </motion.h1>
        <motion.p {...fadeUp(0.2)} className="mt-6 text-lg leading-relaxed text-muted-foreground">
          Mais do que uma bebida, um convite para desacelerar. Descubra sabores especiais, aromas marcantes e pequenos
          momentos que fazem toda a diferença.
        </motion.p>
        <motion.div {...fadeUp(0.3)} className="mt-10 flex flex-wrap items-center gap-6">
          <a
            href="#cardapio"
            className="group inline-flex items-center gap-3 rounded-full bg-primary px-7 py-4 text-sm font-medium text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
          >
            Explorar cardápio
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </a>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span><strong className="font-display text-2xl text-foreground">04</strong> bebidas</span>
            <span className="h-8 w-px bg-border" aria-hidden />
            <span>Grãos <em className="font-display text-foreground">selecionados</em></span>
          </div>
        </motion.div>
      </div>

      {/* Interactive cup */}
      <div className="relative mx-auto w-full max-w-[560px]">
        <div className="relative aspect-square">
          <div className="absolute inset-0 rounded-full bg-secondary" aria-hidden />
          <motion.div
            className="absolute inset-[-4%] rounded-full border border-dashed border-accent/40"
            animate={reduce ? { rotate: 0 } : { rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            aria-hidden
          />
          <motion.div
            className="absolute inset-[6%] rounded-full border-2"
            animate={{ borderColor: drink.accent }}
            transition={{ duration: 0.6 }}
            aria-hidden
          />
          <div className="absolute inset-[10%] overflow-hidden rounded-full shadow-soft">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.img
                key={drink.id}
                src={drink.image}
                alt={drink.name}
                width={1024}
                height={1024}
                className="absolute inset-0 h-full w-full object-cover"
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.12, rotate: -12 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9, rotate: 12 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>
          </div>

          <button
            onClick={() => step(-1)}
            aria-label="Bebida anterior"
            className="absolute left-0 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-border bg-card shadow-card transition hover:bg-primary hover:text-primary-foreground sm:-left-4"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => step(1)}
            aria-label="Próxima bebida"
            className="absolute right-0 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-border bg-card shadow-card transition hover:bg-primary hover:text-primary-foreground sm:-right-4"
          >
            <ArrowRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-[4%] left-1/2 w-max -translate-x-1/2 rounded-full border border-border bg-card px-5 py-2.5 text-center shadow-card">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={drink.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="text-sm"
                aria-live="polite"
              >
                <span className="font-display text-base italic">{drink.name}</span>
                <span className="mx-2 text-muted-foreground">·</span>
                <span className="font-medium text-accent">{formatPrice(drink.price)}</span>
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4" role="tablist" aria-label="Escolher bebida">
          <span className="eyebrow text-muted-foreground">0{index + 1} — 0{drinks.length}</span>
          {drinks.map((d, i) => (
            <button
              key={d.id}
              role="tab"
              aria-selected={i === index}
              aria-label={`Ver ${d.name}`}
              onClick={() => select(i)}
              onPointerEnter={(e) => hoverSelect(e, i)}
              onPointerLeave={cancelHover}
              className="grid h-8 place-items-center px-1"
            >
              <motion.span
                className="block h-2 rounded-full"
                animate={{ width: i === index ? 32 : 8, backgroundColor: i === index ? "var(--primary)" : "var(--border)" }}
                transition={{ duration: 0.3 }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
