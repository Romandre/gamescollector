"use client";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";

// Hooks
import { useSorting } from "@/hooks";
import { useQuery } from "@tanstack/react-query";

// Types
import { Game, Filters, FilterInputs, FilterTypes } from "@/types";

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
  filters: Filters;
  handleFilter: (name: string, filter: string) => void;
  resetFilters: () => void;
  filterInputs: FilterInputs;
  setFilterInputs: Dispatch<SetStateAction<FilterInputs>>;
  sorting: number;
  handleSorting: (index: number) => void;
  limit: number;
  loadMore: () => void;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  isSortingLoading: boolean;
  emptyData: boolean;
  error: Error | null;
};

const GamesContext = createContext<GamesContextType | undefined>(undefined);

const fields =
  "fields *, genres.name, platforms.name, release_dates.*, cover.url;";
const sortingOptions = [
  "sort hypes desc;",
  "sort first_release_date asc;",
  "sort total_rating desc;",
  "sort name asc;",
];
const limit = 60;
const dlcFilter = "category != (1,2)";
const filtersInMenu = {
  year: "",
  genre: "",
  platform: "",
  company: "",
};

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
  const [filters, setFilters] = useState<Filters>({
    search: "",
    dlcs: "",
    ...filtersInMenu,
  });
  const [filterInputs, setFilterInputs] = useState<FilterInputs>({
    ...filtersInMenu,
  });
  const [sorting, setSorting] = useState(0);

  const activeFilters = Object.values(filters)
    .filter((filter) => filter !== "")
    .join(" & ");
  const filtersQuery = activeFilters ? `where ${activeFilters};` : "";
  const gamesQuery = `${fields} ${filtersQuery} ${sortingOptions[sorting]} limit ${limit}; offset ${offset};`;

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
  const isSortingLoading = hintsEnabled === undefined && !games?.length;

  const loadMore = () => {
    if (gamesCount > offset + limit) setOffset((prev) => prev + limit);
  };

  const toggleView = (view: View) => {
    setView(view);
  };

  const handleSearch = (value: string) => {
    const searchFilter = value ? `name ~ *"${value}"*` : "";
    handleFilter("search", searchFilter);
    setSearch(value);
  };

  const handleFilter = useCallback(
    (name: string, filter: string) => {
      if (filters[name as FilterTypes] !== filter) {
        setOffset(0);
        setGames([]);
        setFilters((prev) => ({ ...prev, [name]: filter }));
      }
    },
    [filters]
  );

  const resetFilters = () => {
    setOffset(0);
    setGames([]);
    setFilters((prev) => ({ ...prev, ...filtersInMenu }));
    setFilterInputs({ ...filtersInMenu });
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
    resetFilters,
    filterInputs,
    setFilterInputs,
    sorting,
    handleSorting,
    limit,
    loadMore,
    isLoading,
    isFetching,
    isError,
    isSortingLoading,
    emptyData,
    error,
  };

  useEffect(() => {
    if (showDlcs) handleFilter("dlcs", "");
    else handleFilter("dlcs", dlcFilter);
  }, [showDlcs, handleFilter]);

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
