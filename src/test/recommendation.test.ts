import { describe, expect, it } from "vitest";
import { recommendationSchema } from "@/lib/recommendation-schema";

describe("Menu-only AI recommendations", () => {
  it("accepts only the four drinks on the menu", () => {
    for (const drinkId of ["cappuccino", "iced-latte", "espresso", "caramel-latte"]) {
      expect(recommendationSchema.safeParse({ message: "", recommendations: [{ drinkId, reason: "" }] }).success).toBe(true);
    }
    expect(recommendationSchema.safeParse({ message: "", recommendations: [{ drinkId: "mocha", reason: "" }] }).success).toBe(false);
  });
});