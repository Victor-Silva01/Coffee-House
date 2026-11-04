import { ArrowRight, Coffee, Instagram } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { drinks, formatPrice, INSTAGRAM_URL } from "@/data/drinks";
import { Logo } from "./Header";

export function DrinkInfo({ index, step }: { index: number; step: (d: 1 | -1) => void }) {
  const d = drinks[index]!;
  return (
    <section className="bg-secondary" aria-label="Detalhes da bebida">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-end"
          >
            <div>
              <p className="eyebrow text-accent">{d.category}</p>
              <h2 className="mt-4 font-display text-5xl md:text-6xl">{d.name}</h2>
              <p className="mt-4 font-display text-xl italic text-muted-foreground">{d.tagline}</p>
            </div>
            <div className="md:border-l md:border-border md:pl-10">
              <p className="leading-relaxed text-muted-foreground">{d.description}</p>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <span className="font-display text-4xl">{formatPrice(d.price)}</span>
                <button
                  onClick={() => step(1)}
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                  Descobrir próximo café
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export function MenuSection({ index, select }: { index: number; select: (i: number) => void }) {
  return (
    <section id="cardapio" className="mx-auto max-w-7xl scroll-mt-8 px-6 py-24 md:px-10">
      <div className="max-w-2xl">
        <p className="eyebrow text-accent">Feito com carinho, servido com alma</p>
        <h2 className="mt-4 font-display text-4xl md:text-5xl">
          Encontre seu café <em className="text-accent">favorito</em>
        </h2>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {drinks.map((d, i) => {
          const active = i === index;
          return (
            <motion.button
              key={d.id}
              onClick={() => {
                select(i);
                document.getElementById("inicio")?.scrollIntoView({ behavior: "smooth" });
              }}
              aria-pressed={active}
              aria-label={`Selecionar ${d.name}, ${formatPrice(d.price)}`}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className={`group rounded-3xl border p-4 text-left transition-colors ${active ? "border-primary bg-primary text-primary-foreground shadow-soft" : "border-border bg-card shadow-card hover:border-accent"}`}
            >
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={d.image}
                  alt=""
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="px-2 pb-2 pt-5">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-display text-2xl">{d.name}</h3>
                  <span className={`text-sm font-medium ${active ? "" : "text-accent"}`}>{formatPrice(d.price)}</span>
                </div>
                <p className={`mt-2 line-clamp-2 text-sm ${active ? "opacity-80" : "text-muted-foreground"}`}>{d.description}</p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}

export function Story() {
  return (
    <section id="historia" className="mx-auto max-w-7xl scroll-mt-8 px-6 pb-24 md:px-10">
      <div className="grid gap-8 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="rounded-[2rem] bg-secondary p-8 md:p-14 lg:col-span-7"
        >
          <p className="eyebrow text-accent">Nossa história</p>
          <h2 className="mt-5 font-display text-4xl leading-tight md:text-5xl">
            Café bom combina com <em className="text-accent">tempo de qualidade.</em>
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex flex-col justify-end gap-6 lg:col-span-5 lg:pt-24"
        >
          <Coffee className="h-8 w-8 text-accent" aria-hidden />
          <p className="text-lg leading-relaxed text-muted-foreground">
            A Aroma nasceu de uma ideia simples: o melhor café é aquele que você toma sem pressa. Cada xícara é preparada
            com atenção, do grão à espuma, para transformar uma pausa comum em um pequeno ritual.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            Aqui, o tempo desacelera. Sente-se, respire o aroma e aproveite o sabor — o resto pode esperar.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-espresso text-espresso-foreground">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 pb-28 pt-14 md:flex-row md:items-center md:justify-between md:px-10 md:pb-14">
        <div>
          <Logo inverted />
          <p className="mt-5 font-display text-xl italic opacity-90">Uma pausa. Um aroma. Um momento seu.</p>
        </div>
        <div className="flex flex-col gap-4 md:items-end">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram da Aroma Coffee House"
            className="inline-flex items-center gap-2 rounded-full border border-espresso-foreground/30 px-5 py-2.5 text-sm transition-colors hover:bg-espresso-foreground hover:text-espresso"
          >
            <Instagram className="h-4 w-4" aria-hidden /> Instagram
          </a>
          <p className="text-xs opacity-60">© {new Date().getFullYear()} Aroma Coffee House. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
