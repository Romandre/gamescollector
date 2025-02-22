import { Metadata } from "next";
import {
  Layout,
  TwoColumnsLayout,
  GameTrandsNavigation,
  ComingSoonPage,
} from "@/components";

export const metadata: Metadata = {
  title: "Upcoming releases",
};

export default function ComingSoonRoute() {
  return (
    <Layout>
      <TwoColumnsLayout breakpoint="md">
        <GameTrandsNavigation />
        <ComingSoonPage />
      </TwoColumnsLayout>
    </Layout>
  );
}
