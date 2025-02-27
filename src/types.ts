export type Games = {
  games: Game[];
};

export type Game = {
  id: number;
  name: string;
  cover?: Cover;
  platforms?: Platform[];
  genres?: Genre[];
  age_ratings?: AgeRating[];
  involved_companies?: InvolvedCompany[];
  first_release_date?: number;
  release_dates?: ReleaseDate[];
  screenshots?: Screenshot[];
  websites?: Website[];
  summary?: string;
  storyline?: string;
  total_rating?: number;
  total_rating_count?: number;
  category?: number; // e.g., Main game, DLC, Expansion
  dlcs?: Game[];
  expansions?: Game[];
  ports?: Game[];
  remakes?: Game[];
  remasters?: Game[];
  parent_game?: Game;
  url: string;
};

export type Cover = {
  id: string;
  url: string;
};

export type Platform = {
  id: number;
  name: string;
};

export type Genre = {
  id: number;
  name: string;
};

export type AgeRating = {
  id: number;
  category: number; // e.g., PEGI or ESRB
  rating: number; // Rating value (e.g., 3, 7, 12, 16, 18)
};

export type Company = {
  id: number;
  name: string;
};

export type InvolvedCompany = {
  id: number;
  company: Company;
  developer: boolean;
  publisher: boolean;
};

export type ReleaseDate = {
  id: number;
  human: string; // e.g., "2024-12-01"
  platform: number;
  status: GameStatus;
  region: number;
};

export type Screenshot = {
  id: string;
  url: string;
};

export type Website = {
  id: number;
  category: number; // Category of the website (e.g., official, social)
  url: string;
};

export type GameStatus = {
  status: number;
  checksum: string;
  created_at: number;
  description: string;
  id: number;
  name: string;
  updated_at: number;
};

export type Filters = {
  search: string;
  year: string;
  genre: string;
  platform: string;
  company: string;
  dlcs: string;
};

export type FilterInputs = {
  year: string;
  genre: string;
  platform: string;
  company: string;
};

export type FilterTypes = "year" | "platform" | "company" | "genre";

export type FilterOptions = { id: number; name: string };

export type LinksSideMenuSection = {
  id: number;
  name: string;
  link: string;
};

export type GamesCollection = {
  id: string;
  created_at: string;
  user_id: string;
  game_id: number;
};

export type Review = {
  id: string;
  user_id: string;
  game_id: number;
  rating: number;
  comment: string;
  platform: string;
  updated_at: string;
  profiles: {
    username: string;
  };
  game_title: string;
};

export type AverageRating = {
  average: number;
  count: number;
};

export type ComplexMessage = {
  text: string;
  type: string;
};
