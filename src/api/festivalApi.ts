import { type FestivalType } from "../types/types";

const BASE_URL = "https://festival-server-1.onrender.com";

export const fetchFestivals = async (
  artistIds: number[]
): Promise<FestivalType[]> => {
  const response = await fetch(`${BASE_URL}/getFestivalsByArtists`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ artistIds }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch festivals");
  }
  return response.json();
};
