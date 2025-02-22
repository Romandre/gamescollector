import { Metadata } from "next";
import {
  Layout,
  TwoColumnsLayout,
  GameTrendsNavigation,
  GameTrendsPage,
} from "@/components";
import { getTimestampTwoMonthsAgo } from "@/utils/yearsArray";

export const metadata: Metadata = {
  title: "Now popular games",
};

const timeNow = Math.floor(Date.now() / 1000);
const twoMonthsAgo = getTimestampTwoMonthsAgo();

export default function PopularRoute() {
  const popularNowQuery = `fields name, first_release_date, cover.*, platforms.*; where first_release_date > ${twoMonthsAgo} & first_release_date < ${timeNow} & hypes > 1; sort hypes desc; limit 500;`;

  return (
    <Layout>
      <TwoColumnsLayout breakpoint="md">
        <GameTrendsNavigation />
        <GameTrendsPage query={popularNowQuery} />
      </TwoColumnsLayout>
    </Layout>
  );
}
