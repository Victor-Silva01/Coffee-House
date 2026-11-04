import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/recommend-drinks")({
  server: { handlers: { POST: async ({ request }) => {
    const { handleRecommendation } = await import("@/lib/recommendation.server");
    return handleRecommendation(request);
  } } },
});