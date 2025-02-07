import { supabaseClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import { Header, Container, AccountForm } from "@/components";

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
        <AccountForm user={user} />
      </Container>
    </>
  );
}
