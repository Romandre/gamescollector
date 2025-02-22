import { Metadata } from "next";
import {
  Layout,
  TwoColumnsLayout,
  GameTrandsNavigation,
  AnticipatedPage,
} from "@/components";

export const metadata: Metadata = {
  title: "Most anticipated games",
};

export default function AnticipatedRoute() {
  return (
    <Layout>
      <TwoColumnsLayout breakpoint="md">
        <GameTrandsNavigation />
        <AnticipatedPage />
      </TwoColumnsLayout>
    </Layout>
  );
}
