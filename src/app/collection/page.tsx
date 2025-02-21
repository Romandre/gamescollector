import { Metadata } from "next";
import { redirect } from "next/navigation";
import { supabaseClient } from "@/utils/supabase/server";

// Components
import {
  Header,
  Container,
  AccountLayout,
  AccountMenu,
  Collection,
} from "@/components";

export const metadata: Metadata = {
  title: "Your games collection",
};

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
