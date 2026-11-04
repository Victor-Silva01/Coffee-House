import { useState } from "react";
import { Coffee, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const links = [
  { href: "#inicio", label: "Início" },
  { href: "#cardapio", label: "Cardápio" },
  { href: "#historia", label: "Nossa história" },
];

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <a href="#inicio" className="flex items-center gap-2.5" aria-label="Aroma Coffee House — início">
      <span
        className={`grid h-10 w-10 place-items-center rounded-full ${inverted ? "bg-espresso-foreground text-espresso" : "bg-primary text-primary-foreground"}`}
      >
        <Coffee className="h-5 w-5" aria-hidden />
      </span>
      <span className="leading-none">
        <span className="block font-display text-2xl italic">Aroma</span>
        <span className={`eyebrow mt-1 block text-[0.6rem] ${inverted ? "opacity-70" : "text-muted-foreground"}`}>
          Coffee House
        </span>
      </span>
    </a>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="relative z-30 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-10 md:py-8">
      <Logo />
      <nav className="hidden items-center gap-10 md:flex" aria-label="Principal">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="text-sm text-foreground/80 transition-colors hover:text-accent">
            {l.label}
          </a>
        ))}
      </nav>
      <a
        href="#cardapio"
        className="hidden rounded-full border border-primary px-5 py-2.5 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground md:inline-flex"
      >
        Descobrir cafés
      </a>
      <button
        className="grid h-11 w-11 place-items-center rounded-full border border-border md:hidden"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-expanded={open}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute inset-x-4 top-full rounded-2xl border border-border bg-card p-4 shadow-card md:hidden"
            aria-label="Menu mobile"
          >
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 hover:bg-secondary">
                {l.label}
              </a>
            ))}
            <a
              href="#cardapio"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-full bg-primary px-4 py-3 text-center text-sm font-medium text-primary-foreground"
            >
              Descobrir cafés
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
