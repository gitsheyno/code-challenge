export interface Song {
  title: string;
  length: number;
  colab?: string;
}

export interface ArtistData {
  artist: string;
  Songs: Song[];
}

export interface FestivalType {
  name: string;
  Artists: number[];
  url: string;
  branding: {
    mainColor: string;
    secondaryColor: string;
  };
}
export type IconStyle = {
  fill: string;
  stroke: string;
};

export interface Artist {
  name: string;
  id: number;
}

export interface Language {
  name: string;
  code: string;
}

export interface FestivalData {
  festivals: FestivalType[];
  icons: {
    [key: string]: IconStyle;
  };
}
