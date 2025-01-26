import { Header, Container, GamesGrid, GameFilters } from "@/components";
import { css } from "../../../styled-system/css";

const filtersMenuWidth = 270;

export default function BrowseRoute() {
  return (
    <>
      <Header />
      <Container>
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
      </Container>
    </>
  );
}
