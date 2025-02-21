import { Metadata } from "next";
import { supabaseClient } from "@/utils/supabase/server";
import { Layout, HomePage } from "@/components";

export const metadata: Metadata = {
  title: "Home | GamesCollector",
  description: "Build your ultimate games collection.",
};

export default async function Home() {
  const randomImgNumber = Math.ceil(Math.random() * 3);
  const supabase = await supabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <Layout>
      <HomePage user={user} randomImgNumber={randomImgNumber} />
    </Layout>
  );
}
