import { Metadata } from "next";
import { redirect } from "next/navigation";
import { supabaseClient } from "@/utils/supabase/server";

// Components
import {
  Layout,
  TwoColumnsLayout,
  AccountNavigation,
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
    <Layout>
      <TwoColumnsLayout breakpoint="md">
        <AccountNavigation />
        <Collection user={user} />
      </TwoColumnsLayout>
    </Layout>
  );
}
