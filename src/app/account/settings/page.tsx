import { supabaseClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

// Components
import { Header, Container, AccountLayout, AccountMenu } from "@/components";

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
