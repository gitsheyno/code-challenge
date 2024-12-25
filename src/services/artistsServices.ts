import { fetchArtist } from "../api/artistApi";
import { type ArtistData } from "../types/types";

export const getArtistData = async (id: number): Promise<ArtistData> => {
  return await fetchArtist(id);
};
