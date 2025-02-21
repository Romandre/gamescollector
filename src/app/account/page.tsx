import { Metadata } from "next";
import { redirect } from "next/navigation";
import { supabaseClient } from "@/utils/supabase/server";

// Components
import {
  Layout,
  TwoColumnsLayout,
  AccountNavigation,
  AccountForm,
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
    <Layout>
      <TwoColumnsLayout breakpoint="md">
        <AccountNavigation />
        <AccountForm user={user} />
      </TwoColumnsLayout>
    </Layout>
  );
}
