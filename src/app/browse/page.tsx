import { Metadata } from "next";
import { Layout, BrowsePage } from "@/components";

export const metadata: Metadata = {
  title: "Browse games",
};

export default function BrowseRoute() {
  return (
    <Layout>
      <BrowsePage />
    </Layout>
  );
}
