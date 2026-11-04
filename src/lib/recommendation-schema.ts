import { z } from "zod";

export const preferenceSchema = z.object({ preferences: z.string().trim().min(3).max(1000) });
export const recommendationSchema = z.object({
  message: z.string(),
  recommendations: z.array(z.object({
    drinkId: z.enum(["cappuccino", "iced-latte", "espresso", "caramel-latte"]),
    reason: z.string(),
  }).strict()),
}).strict();
export type Recommendation = z.infer<typeof recommendationSchema>;