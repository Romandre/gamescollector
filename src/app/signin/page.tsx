import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Layout, LoginForm } from "@/components";
import { login, signup } from "./actions";
import { supabaseClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: "Sign-in",
};

export default async function Signin() {
  const supabase = await supabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect("/account");

  return (
    <Layout>
      <LoginForm login={login} signup={signup} />
    </Layout>
  );
}
