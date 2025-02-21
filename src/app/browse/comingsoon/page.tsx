import { Metadata } from "next";
import {
  Layout,
  TwoColumnsLayout,
  GameTrandsNavigation,
  ComingSoonPage,
} from "@/components";

export const metadata: Metadata = {
  title: "Coming soon",
};

export default function BrowseRoute() {
  return (
    <Layout>
      <TwoColumnsLayout breakpoint="md">
        <GameTrandsNavigation />
        <ComingSoonPage />
      </TwoColumnsLayout>
    </Layout>
  );
}
