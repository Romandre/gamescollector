import { Metadata } from "next";
import {
  Layout,
  TwoColumnsLayout,
  GameTrendsNavigation,
  GameTrendsPage,
} from "@/components";

export const metadata: Metadata = {
  title: "Upcoming releases",
};

const timeNow = Math.floor(Date.now() / 1000);

export default function ComingSoonRoute() {
  const comingSoonQuery = `fields name, first_release_date, cover.*, platforms.*; where first_release_date > ${timeNow} & hypes > 5; sort first_release_date asc; limit 500;`;

  return (
    <Layout>
      <TwoColumnsLayout breakpoint="md">
        <GameTrendsNavigation />
        <GameTrendsPage query={comingSoonQuery} />
      </TwoColumnsLayout>
    </Layout>
  );
}
