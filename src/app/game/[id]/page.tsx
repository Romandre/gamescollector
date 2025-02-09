import { supabaseClient } from "@/utils/supabase/server";
import { Header, Container, GamePage } from "@/components";

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
    <>
      <Header />
      <Container>
        <GamePage id={id} user={user} />
      </Container>
    </>
  );
}
