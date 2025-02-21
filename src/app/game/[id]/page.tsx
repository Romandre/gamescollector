import type { Metadata } from "next";
import { supabaseClient } from "@/utils/supabase/server";
import { GamePage, Layout } from "@/components";
import axios from "axios";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const game = await axios.get(`${process.env.BASE_URL}/api/games`, {
    params: { query: `fields name; where id = ${id};` },
  });

  const pageTitle = game.data.games?.[0]?.name || "Game page";

  return {
    title: pageTitle,
  };
}

export default async function GameRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await supabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <Layout>
      <GamePage id={id} user={user} />
    </Layout>
  );
}
