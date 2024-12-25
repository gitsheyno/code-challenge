import { type ArtistData } from "../types/types";

const BASE_URL = "https://festival-server-1.onrender.com";

export const fetchArtist = async (id: number): Promise<ArtistData> => {
  const response = await fetch(`${BASE_URL}/artist/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch artist data");
  }
  return response.json();
};
