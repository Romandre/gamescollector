import { Metadata } from "next";
import {
  Layout,
  TwoColumnsLayout,
  GameTrandsNavigation,
  PopularPage,
} from "@/components";

export const metadata: Metadata = {
  title: "Now popular games",
};

export default function PopularRoute() {
  return (
    <Layout>
      <TwoColumnsLayout breakpoint="md">
        <GameTrandsNavigation />
        <PopularPage />
      </TwoColumnsLayout>
    </Layout>
  );
}
