import axios from "axios";
import type { Metadata } from "next";

// Components
import { GamePage, Layout } from "@/components";

// Context
import { RatingsProvider } from "@/context";

// HOC
import { withAuth } from "@/hoc/withAuth";

// Types
import { User } from "@supabase/supabase-js";

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

async function GameRoute({
  params,
  user,
}: {
  params: Promise<{ id: string }>;
  user: User;
}) {
  const { id } = await params;

  return (
    <Layout>
      <RatingsProvider userId={user?.id} gameId={id}>
        <GamePage id={id} user={user} />
      </RatingsProvider>
    </Layout>
  );
}

export default withAuth(GameRoute);
