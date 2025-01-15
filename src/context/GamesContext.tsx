"use client";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import axios from "axios";

// Hooks
import { useSorting } from "@/hooks";
import { useQuery } from "@tanstack/react-query";

// Types
import { Game } from "@/types";

type View = "grid" | "list" | "list-min";

type GamesContextType = {
  games: Game[];
  setGames: Dispatch<SetStateAction<Game[]>>;
  view: View;
  toggleView: (view: View) => void;
  hintsEnabled: boolean | undefined;
  toggleHints: () => void;
  showDlcs: boolean | undefined;
  toggleDlcs: () => void;
  search: string;
  handleSearch: (value: string) => void;
  offset: number;
  setOffset: (value: SetStateAction<number>) => void;
  filters: string[];
  handleFilter: (filter: string, action?: string) => void;
  sorting: number;
  handleSorting: (index: number) => void;
  limit: number;
  loadMore: () => void;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  emptyData: boolean;
  error: Error | null;
};

const GamesContext = createContext<GamesContextType | undefined>(undefined);

const fields =
  "fields *, genres.name, platforms.name, release_dates.*, cover.url;";
const sortingOptions = [
  "sort hypes desc;",
  "sort first_release_date desc;",
  "sort total_rating desc;",
  "sort name asc;",
];

const getGames = async (query: string) => {
  const response = await axios.get(`/api/games`, { params: { query } });
  return response.data;
};

/* 
const getCurrentTimestamp = () => {
  const now = new Date();
  return Math.floor(now.getTime() / 1000);
};

const getSixYearsAgoTimestamp = () => {
  const now = new Date();
  const sixYearsAgo = new Date(now.setFullYear(now.getFullYear() - 6));
  return Math.floor(sixYearsAgo.getTime() / 1000);
};
 */

export const GamesProvider = ({ children }: { children: ReactNode }) => {
  const [hintsEnabled, toggleHints] = useSorting("on-hover-hints", false);
  const [showDlcs, toggleDlcs] = useSorting("show-dlc", true);

  const [games, setGames] = useState<Game[]>([]);
  const [view, setView] = useState<View>("grid");
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [filters, setFilters] = useState<string[]>([]);
  const [sorting, setSorting] = useState(0);
  const limit = 60;
  const dlcFilter = "category != (1,2)";

  const activeFilter = filters.length ? `where ${filters.join("& ")};` : "";
  const gamesQuery = `${fields} ${activeFilter} ${sortingOptions[sorting]} limit ${limit}; offset ${offset};`;

  const {
    data,
    isFetched,
    isFetching,
    isLoading: isQueryLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["games", [gamesQuery]],
    queryFn: () => getGames(gamesQuery),
    enabled: showDlcs !== undefined,
  });
  const gamesCount = data?.count || 0;
  const emptyData = !data?.games?.length && isFetched;
  const isLoading = showDlcs === undefined || isQueryLoading;

  const loadMore = () => {
    console.log("in view", offset);
    if (gamesCount > offset + limit) setOffset((prev) => prev + limit);
  };

  const toggleView = (view: View) => {
    setView(view);
  };

  const handleSearch = (value: string) => {
    const searchFilter = `name ~ *"${value}"*`;
    setGames([]);
    setOffset(0);
    setSearch(value);
    setFilters((prev) => {
      const filtered = prev.filter((item) => !item.includes("name ~"));
      return [...filtered, searchFilter];
    });
  };

  const handleFilter = (filter: string, action?: string) => {
    setGames([]);
    if (action === "remove")
      setFilters((prev) => prev.filter((str) => str !== filter));
    else if (!filters.includes(filter)) setFilters((prev) => [...prev, filter]);
  };

  const handleSorting = (index: number) => {
    if (sorting !== index) {
      setGames([]);
      setSorting(index);
    }
  };

  const contextValue = {
    games,
    setGames,
    view,
    toggleView,
    hintsEnabled,
    toggleHints,
    showDlcs,
    toggleDlcs,
    search,
    handleSearch,
    offset,
    setOffset,
    filters,
    handleFilter,
    sorting,
    handleSorting,
    limit,
    loadMore,
    isLoading,
    isFetching,
    isError,
    emptyData,
    error,
  };

  useEffect(() => {
    if (showDlcs) handleFilter(dlcFilter, "remove");
    else handleFilter(dlcFilter);
  }, [showDlcs]);

  useEffect(() => {
    if (data?.games?.length) setGames((prev) => [...prev, ...data.games]);
  }, [data, setGames]);

  return (
    <GamesContext.Provider value={contextValue}>
      {children}
    </GamesContext.Provider>
  );
};

export const useGamesContext = () => {
  const context = useContext(GamesContext);
  if (!context) {
    throw new Error("useTheme must be used within a GamesProvider");
  }
  return context;
};
