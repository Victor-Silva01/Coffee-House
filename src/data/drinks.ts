import cappuccino from "@/assets/cappuccino.jpg";
import icedLatte from "@/assets/iced-latte.jpg";
import espresso from "@/assets/espresso.jpg";
import caramelLatte from "@/assets/caramel-latte.jpg";

export type Drink = {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  price: number;
  image: string;
  /** accent color for decorative ring */
  accent: string;
};

export const drinks: Drink[] = [
  {
    id: "cappuccino",
    name: "Cappuccino",
    category: "Clássico & cremoso",
    tagline: "Equilíbrio perfeito em cada xícara.",
    description:
      "Espresso encorpado, leite vaporizado e uma camada aveludada de espuma. O abraço quente que todo dia merece.",
    price: 14.9,
    image: cappuccino,
    accent: "oklch(0.62 0.1 60)",
  },
  {
    id: "iced-latte",
    name: "Iced Latte",
    category: "Gelado & delicioso",
    tagline: "Frescor em cada gole.",
    description:
      "Uma combinação irresistível de espresso, leite gelado e gelo, perfeita para renovar o seu dia.",
    price: 16.9,
    image: icedLatte,
    accent: "oklch(0.7 0.06 75)",
  },
  {
    id: "espresso",
    name: "Espresso",
    category: "Intenso & puro",
    tagline: "A essência do café, sem rodeios.",
    description:
      "Extração curta e intensa, com crema dourada e notas de chocolate amargo. Para quem aprecia o essencial.",
    price: 8.9,
    image: espresso,
    accent: "oklch(0.45 0.08 45)",
  },
  {
    id: "caramel-latte",
    name: "Caramel Latte",
    category: "Doce & aconchegante",
    tagline: "Um carinho em forma de café.",
    description:
      "Espresso suave, leite cremoso e calda de caramelo artesanal. Doçura na medida para desacelerar.",
    price: 17.9,
    image: caramelLatte,
    accent: "oklch(0.7 0.12 65)",
  },
];

export const formatPrice = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

/** circular index helper */
export const wrapIndex = (i: number, len: number) => ((i % len) + len) % len;

/** configurable social link — set to the real profile when available */
export const INSTAGRAM_URL = "https://instagram.com/";

/** WhatsApp order line — replace the placeholder number with the real one */
const WHATSAPP_NUMBER = "5511999999999";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Olá! Gostaria de fazer um pedido na Aroma Coffee House ☕",
)}`;
