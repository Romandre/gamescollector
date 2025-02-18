import { supabaseClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

// Components
import {
  Header,
  Container,
  AccountLayout,
  AccountForm,
  AccountMenu,
} from "@/components";

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
