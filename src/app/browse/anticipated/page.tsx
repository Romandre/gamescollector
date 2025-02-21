import { Metadata } from "next";
import {
  Layout,
  TwoColumnsLayout,
  GameTrandsNavigation,
  AnticipatedPage,
} from "@/components";

export const metadata: Metadata = {
  title: "Coming soon",
};

export default function BrowseRoute() {
  return (
    <Layout>
      <TwoColumnsLayout breakpoint="md">
        <GameTrandsNavigation />
        <AnticipatedPage />
      </TwoColumnsLayout>
    </Layout>
  );
}
