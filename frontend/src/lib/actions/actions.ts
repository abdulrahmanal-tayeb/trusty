"use server"

import { HumanizerOptions } from "@/config/models/models"
import { HumanizerResult } from "@/config/stores/stores";

export const handleHumanize = async (
  text: string,
  options: HumanizerOptions
): Promise<HumanizerResult[]> => {
  const response = await fetch(`${process.env.BASE_URL}/api/humanize`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text, options }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch humanized result");
  }

  const data: HumanizerResult[] = await response.json();
  console.log(data);
  return data;
};
