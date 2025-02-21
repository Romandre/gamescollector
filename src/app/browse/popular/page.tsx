import { Metadata } from "next";
import {
  Layout,
  TwoColumnsLayout,
  GameTrandsNavigation,
  PopularPage,
} from "@/components";

export const metadata: Metadata = {
  title: "Coming soon",
};

export default function BrowseRoute() {
  return (
    <Layout>
      <TwoColumnsLayout breakpoint="md">
        <GameTrandsNavigation />
        <PopularPage />
      </TwoColumnsLayout>
    </Layout>
  );
}
