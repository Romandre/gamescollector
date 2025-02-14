import { GamesGrid, GameFilters, Layout } from "@/components";
import { css } from "../../../styled-system/css";

const filtersMenuWidth = 270;

export default function BrowseRoute() {
  return (
    <Layout>
      <div
        className={css({
          display: "grid",
          gridTemplateColumns: {
            lg: `${filtersMenuWidth}px 1fr`,
          },
        })}
      >
        <GameFilters />
        <GamesGrid />
      </div>
    </Layout>
  );
}
