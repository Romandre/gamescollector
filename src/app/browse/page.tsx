import { Metadata } from "next";
import { Layout, TwoColumnsLayout, BrowsePage } from "@/components";

export const metadata: Metadata = {
  title: "Browse games",
};

export default function BrowseRoute() {
  return (
    <Layout>
      <TwoColumnsLayout breakpoint="lg">
        <BrowsePage />
      </TwoColumnsLayout>
    </Layout>
  );
}
