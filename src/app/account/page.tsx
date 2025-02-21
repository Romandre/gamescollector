import { Metadata } from "next";
import { redirect } from "next/navigation";
import { supabaseClient } from "@/utils/supabase/server";

// Components
import {
  Header,
  Container,
  AccountLayout,
  AccountForm,
  AccountMenu,
} from "@/components";

export const metadata: Metadata = {
  title: "Account",
};

export default async function Account() {
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
          <AccountForm user={user} />
        </AccountLayout>
      </Container>
    </>
  );
}
