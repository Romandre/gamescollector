import { Metadata } from "next";
import { redirect } from "next/navigation";
import { supabaseClient } from "@/utils/supabase/server";

// Components
import { Header, Container, AccountLayout, AccountMenu } from "@/components";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function Settings() {
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
          <div>Settings are not ready yet...</div>
        </AccountLayout>
      </Container>
    </>
  );
}
