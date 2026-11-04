import { useCallback, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { drinks, wrapIndex } from "@/data/drinks";
import { Header } from "@/components/coffee/Header";
import { Hero } from "@/components/coffee/Hero";
import { DrinkInfo, Footer, MenuSection, Story } from "@/components/coffee/Sections";
import { Testimonials, WhatsAppFloat } from "@/components/coffee/Extras";
import { DrinkRecommendation } from "@/components/coffee/Recommendation";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aroma Coffee House — A vida fica melhor com café" },
      { name: "description", content: "Cappuccino, Iced Latte, Espresso e Caramel Latte. Descubra a Aroma Coffee House e desacelere." },
      { property: "og:title", content: "Aroma Coffee House" },
      { property: "og:description", content: "Uma pausa. Um aroma. Um momento seu." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [index, setIndex] = useState(0);
  const select = useCallback((i: number) => setIndex(wrapIndex(i, drinks.length)), []);
  const step = useCallback((d: 1 | -1) => setIndex((i) => wrapIndex(i + d, drinks.length)), []);

  return (
    <div
      onKeyDown={(e) => {
        const t = e.target as HTMLElement;
        if (t.closest("[role=tablist]")) {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }
      }}
    >
      <Header />
      <main>
        <Hero index={index} select={select} step={step} />
        <DrinkInfo index={index} step={step} />
        <MenuSection index={index} select={select} />
        <DrinkRecommendation select={select} />
        <Story />
        <Testimonials />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
