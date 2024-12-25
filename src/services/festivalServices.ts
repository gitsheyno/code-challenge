import { fetchFestivals } from "../api/festivalApi";
import { type FestivalType } from "../types/types";

export const getFestivalsByArtists = async (
  artistIds: number[]
): Promise<FestivalType[]> => {
  return await fetchFestivals(artistIds);
};
