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
  category?: number;
  dlcs?: Game[];
  expansions?: Game[];
  ports?: Game[];
  remakes?: Game[];
  remasters?: Game[];
  parent_game?: Game;
  franchises: Franchise[];
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
  category: number;
  rating: number;
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
  human: string;
  platform: number;
  status: GameStatus;
  release_region: number;
};

export type Screenshot = {
  id: string;
  url: string;
};

export type Website = {
  id: number;
  type: number;
  url: string;
};

export type Franchise = {
  id: number;
  created_at: number;
  games: Game[];
  name: string;
  slug: string;
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
