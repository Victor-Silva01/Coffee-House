import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MessageCircle, Quote, Star } from "lucide-react";
import { WHATSAPP_URL } from "@/data/drinks";

const testimonials = [
  {
    quote:
      "O melhor cappuccino da região, sem exagero. A espuma é perfeita e o atendimento faz você se sentir em casa.",
    name: "Mariana L.",
    detail: "Cliente de todo sábado",
  },
  {
    quote:
      "Descobri a Aroma por acaso e virou meu refúgio. O Iced Latte é imbatível nos dias quentes.",
    name: "Carlos R.",
    detail: "Vizinho do bairro",
  },
  {
    quote:
      "Ambiente tranquilo, café sempre fresquinho e aquele cheirinho que abre a porta antes de você.",
    name: "Beatriz S.",
    detail: "Trabalha por aqui",
  },
];

export function Testimonials() {
  return (
    <section aria-label="Depoimentos de clientes" className="bg-secondary/60">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <div className="max-w-2xl">
          <p className="eyebrow text-accent">Quem prova, comenta</p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">
            Histórias que a gente <em className="text-accent">adora ouvir</em>
          </h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="flex flex-col gap-5 rounded-3xl border border-border bg-card p-8 shadow-card"
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-1" aria-label="Avaliação: 5 de 5 estrelas">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-accent text-accent" aria-hidden />
                  ))}
                </div>
                <Quote className="h-5 w-5 text-accent/50" aria-hidden />
              </div>
              <blockquote className="leading-relaxed text-muted-foreground">“{t.quote}”</blockquote>
              <figcaption className="mt-auto">
                <span className="block font-display text-lg">{t.name}</span>
                <span className="text-sm text-muted-foreground">{t.detail}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhatsAppFloat() {
  // appears only after the hero leaves the screen, so it never covers the drink arrows
  const [show, setShow] = useState(false);
  useEffect(() => {
    const target = document.getElementById("inicio");
    if (!target) return;
    const obs = new IntersectionObserver((entries) => {
      const e = entries[0];
      if (e) setShow(!e.isIntersecting);
    });
    obs.observe(target);
    return () => obs.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Pedir no WhatsApp"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2.5 rounded-full bg-whatsapp px-5 py-3.5 text-sm font-medium text-whatsapp-foreground shadow-soft transition-transform hover:-translate-y-1"
        >
          <MessageCircle className="h-5 w-5" aria-hidden />
          <span className="hidden sm:inline">Pedir no WhatsApp</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
