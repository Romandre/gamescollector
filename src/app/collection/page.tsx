import { supabaseClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

// Components
import {
  Header,
  Container,
  AccountLayout,
  AccountMenu,
  Collection,
} from "@/components";

export default async function CollectionRoute() {
  const supabase = await supabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/signin");

  return (
    <>
      <Header />
      <Container>
        <AccountLayout>
          <AccountMenu />
          <Collection user={user} />
        </AccountLayout>
      </Container>
    </>
  );
}
