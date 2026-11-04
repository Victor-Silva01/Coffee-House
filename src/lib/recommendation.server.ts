import { preferenceSchema, recommendationSchema } from "./recommendation-schema";
import { recommendLocally } from "./recommendation-local";

export async function handleRecommendation(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return Response.json({ message: "Origem não permitida." }, { status: 403 });
  }
  const input = preferenceSchema.safeParse(await request.json().catch(() => null));
  if (!input.success) return Response.json({ message: "Descreva seus gostos em 3 a 1.000 caracteres." }, { status: 400 });

  const data = recommendationSchema.parse(recommendLocally(input.data.preferences));
  const encoder = new TextEncoder();
  const body = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(JSON.stringify({ type: "result", data }) + "\n"));
      controller.close();
    },
  });
  return new Response(body, { headers: { "Content-Type": "application/x-ndjson", "Cache-Control": "no-cache, no-transform" } });
}
