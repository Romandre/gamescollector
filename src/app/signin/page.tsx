import { Header, Container } from "@/components";
import { login, signup } from "./actions";
import { supabaseClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/layout/LoginForm";

export default async function Signin() {
  const supabase = await supabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect("/account");

  return (
    <>
      <Header />
      <Container>
        <LoginForm login={login} signup={signup} />
      </Container>
    </>
  );
}
