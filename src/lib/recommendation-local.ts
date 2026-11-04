import { drinks } from "@/data/drinks";
import type { Recommendation } from "./recommendation-schema";

type DrinkId = Recommendation["recommendations"][number]["drinkId"];

/** Palavras (sem acento, minúsculas) que ligam o texto do visitante a cada bebida. */
const keywords: Record<DrinkId, { words: string[]; reason: string }> = {
  cappuccino: {
    words: ["cappuccino", "capuccino", "cremoso", "espuma", "quente", "aveludado", "classico", "equilibrado", "leite", "morno", "inverno", "abraco"],
    reason: "Combina com o que você descreveu: espresso encorpado, leite vaporizado e espuma aveludada.",
  },
  "iced-latte": {
    words: ["gelado", "gelo", "frio", "fresco", "refrescante", "iced", "verao", "calor", "leite", "gelada", "latte", "suave"],
    reason: "Combina com o que você descreveu: espresso com leite gelado e gelo, bem refrescante.",
  },
  espresso: {
    words: ["espresso", "expresso", "forte", "intenso", "puro", "amargo", "curto", "concentrado", "preto", "essencial", "chocolate"],
    reason: "Combina com o que você descreveu: café curto, intenso e puro, com notas de chocolate amargo.",
  },
  "caramel-latte": {
    words: ["caramelo", "caramel", "doce", "adocado", "sobremesa", "aconchegante", "docinho", "cremoso", "suave", "calda", "latte"],
    reason: "Combina com o que você descreveu: espresso suave, leite cremoso e calda de caramelo.",
  },
};

const stopwords = new Set(["de", "do", "da", "o", "a", "e", "um", "uma", "com", "que", "eu", "gosto", "quero", "cafe", "para", "pra", "meu", "minha", "bem", "muito", "mais", "tem", "ser"]);

function normalize(text: string) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function tokenize(text: string) {
  return normalize(text).split(/[^a-z0-9]+/).filter((word) => word.length > 1 && !stopwords.has(word));
}

function distance(a: string, b: string) {
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const curr = [i];
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min((prev[j] ?? 0) + 1, (curr[j - 1] ?? 0) + 1, (prev[j - 1] ?? 0) + cost);
    }
    prev = curr;
  }
  return prev[b.length] ?? 0;
}

/** 3 = igual, 2 = parecido (erro de digitação ou prefixo), 0 = sem relação. */
function similarity(word: string, key: string) {
  if (word === key) return 3;
  if (word.length >= 4 && (key.startsWith(word) || word.startsWith(key))) return 2;
  const limit = Math.max(key.length, word.length) >= 7 ? 2 : 1;
  if (word.length >= 4 && distance(word, key) <= limit) return 2;
  return 0;
}

export function recommendLocally(preferences: string): Recommendation {
  const text = normalize(preferences);
  const tokens = tokenize(preferences);
  const scores = new Map<DrinkId, number>();

  for (const id of Object.keys(keywords) as DrinkId[]) {
    let score = 0;
    for (const token of tokens) {
      let best = 0;
      for (const key of keywords[id].words) best = Math.max(best, similarity(token, key));
      score += best;
    }
    // Palavras da própria descrição do cardápio valem pouco, mas desempatam.
    const drink = drinks.find((item) => item.id === id);
    if (drink) {
      const descriptionWords = new Set(tokenize(`${drink.name} ${drink.category} ${drink.description}`));
      for (const token of tokens) if (descriptionWords.has(token)) score += 1;
    }
    scores.set(id, score);
  }

  // Negações comuns.
  if (/\bsem (leite|lactose)\b/.test(text)) {
    scores.set("espresso", (scores.get("espresso") ?? 0) + 4);
    for (const id of ["cappuccino", "iced-latte", "caramel-latte"] as const) scores.set(id, (scores.get(id) ?? 0) - 3);
  }
  if (/\b(pouco doce|sem acucar|nao (gosto|curto|quero) (de )?doce|nada doce)\b/.test(text)) {
    scores.set("caramel-latte", (scores.get("caramel-latte") ?? 0) - 5);
  }

  const ranked = [...scores.entries()].filter(([, score]) => score > 0).sort((a, b) => b[1] - a[1]).slice(0, 2);
  const top = ranked[0]?.[1] ?? 0;
  const chosen = ranked.filter(([, score]) => score >= Math.max(2, top * 0.6));

  if (chosen.length === 0) {
    return { message: "Não achei uma bebida clara para isso. Conte se prefere gelado, quente, doce ou forte.", recommendations: [] };
  }
  return {
    message: chosen.length === 1 ? "Esta é a minha escolha para você:" : "Estas duas combinam com o que você pediu:",
    recommendations: chosen.map(([drinkId]) => ({ drinkId, reason: keywords[drinkId].reason })),
  };
}
