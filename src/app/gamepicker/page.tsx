import { Metadata } from "next";
import { Layout, GamePickerPage } from "@/components";

export const metadata: Metadata = {
  title: "Game picker AI (beta)",
};

export default function PopularRoute() {
  return (
    <Layout>
      <GamePickerPage />
    </Layout>
  );
}
