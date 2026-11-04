import { useEffect, useRef, useState } from "react";
import { ArrowRight, Coffee, LoaderCircle, Sparkles, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { drinks, formatPrice } from "@/data/drinks";
import { recommendationSchema, type Recommendation } from "@/lib/recommendation-schema";

export function DrinkRecommendation({ select }: { select: (index: number) => void }) {
  const [preferences, setPreferences] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Recommendation | null>(null);
  const abort = useRef<AbortController | null>(null);
  useEffect(() => () => abort.current?.abort(), []);

  async function recommend(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    const controller = new AbortController();
    abort.current = controller;
    setLoading(true); setError(""); setResult(null);
    try {
      const response = await fetch("/api/public/recommend-drinks", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ preferences }), signal: controller.signal });
      if (!response.ok) { const data = await response.json(); throw new Error(data.message); }
      if (!response.body) throw new Error("A IA não enviou uma resposta.");
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "", received = false;
      while (true) {
        const { done, value } = await reader.read();
        buffer += decoder.decode(value, { stream: !done });
        const lines = buffer.split("\n"); buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.trim()) continue;
          const event = JSON.parse(line);
          if (event.type === "error") throw new Error(event.message);
          if (event.type === "result") { setResult(recommendationSchema.parse(event.data)); received = true; }
        }
        if (done) break;
      }
      if (!received) throw new Error("A recomendação foi interrompida. Tente novamente quando desejar.");
    } catch (err) {
      if (controller.signal.aborted) setError("Recomendação cancelada.");
      else if (err instanceof TypeError) setError("Não foi possível falar com o servidor. Verifique se o app está rodando (npm run dev) e se você abriu o endereço mostrado no terminal.");
      else setError(err instanceof Error ? err.message : "Não foi possível conectar à IA.");
    } finally { setLoading(false); abort.current = null; }
  }

  return <section id="seu-cafe" className="border-y border-border bg-secondary/40">
    <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:px-10 md:py-20 lg:grid-cols-[0.8fr_1.2fr]">
      <div>
        <p className="flex items-center gap-2 text-sm font-medium text-accent"><Sparkles className="h-4 w-4" aria-hidden /> Seu barista · IA</p>
        <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">Um café que combina <em className="text-accent">com você.</em></h2>
      </div>
      <div className="min-w-0">
        <form onSubmit={recommend} className="space-y-4">
          <label htmlFor="coffee-preferences" className="block font-medium">Como você gosta do seu café?</label>
          <Textarea id="coffee-preferences" value={preferences} onChange={(e) => setPreferences(e.target.value)} placeholder="Gosto de café gelado, cremoso e pouco doce…" minLength={3} maxLength={1000} required disabled={loading} className="min-h-32 resize-y bg-card p-4" />
          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit" disabled={loading || preferences.trim().length < 3} className="h-12 px-5"><Sparkles aria-hidden /> Encontrar meu café</Button>
            {loading && <Button type="button" variant="outline" className="h-12" onClick={() => abort.current?.abort()}><Square aria-hidden /> Cancelar</Button>}
          </div>
        </form>
        <div aria-live="polite" aria-busy={loading} className="mt-6">
          {loading && <p role="status" className="flex items-center gap-2 text-sm text-muted-foreground"><LoaderCircle className="h-4 w-4 motion-safe:animate-spin" aria-hidden /> O barista está escolhendo seu café…</p>}
          {error && <p role="alert" className="break-words text-sm text-destructive">{error}</p>}
          {result && <><p className="mb-5 text-muted-foreground">{result.message}</p><div className="grid gap-4 sm:grid-cols-2">
            {result.recommendations.map((item) => {
              const index = drinks.findIndex((drink) => drink.id === item.drinkId);
              const drink = drinks[index];
              if (!drink) return null;
              return <article key={drink.id} className="overflow-hidden rounded-lg border border-border bg-card">
                <img src={drink.image} alt={drink.name} width={1024} height={1024} className="aspect-[4/3] w-full object-cover" />
                <div className="p-5"><h3 className="font-display text-2xl">{drink.name}</h3><p className="mt-2 text-sm font-medium text-accent">{formatPrice(drink.price)}</p><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.reason}</p>
                  <Button type="button" variant="link" className="mt-4 h-auto whitespace-normal p-0 text-left" onClick={() => { select(index); document.getElementById("inicio")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }); }}><Coffee aria-hidden /> Ver bebida <ArrowRight aria-hidden /></Button>
                </div>
              </article>;
            })}
          </div></>}
        </div>
      </div>
    </div>
  </section>;
}