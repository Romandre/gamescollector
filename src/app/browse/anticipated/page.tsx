import { Metadata } from "next";
import {
  Layout,
  TwoColumnsLayout,
  GameTrendsNavigation,
  GameTrendsPage,
} from "@/components";

export const metadata: Metadata = {
  title: "Most anticipated games",
};

const timeNow = Math.floor(Date.now() / 1000);

export default function AnticipatedRoute() {
  const mostAnticipatedQuery = `fields name, first_release_date, cover.*, platforms.*; where first_release_date > ${timeNow} & hypes > 5; sort hypes desc; limit 500;`;

  return (
    <Layout>
      <TwoColumnsLayout breakpoint="md">
        <GameTrendsNavigation />
        <GameTrendsPage query={mostAnticipatedQuery} />
      </TwoColumnsLayout>
    </Layout>
  );
}
