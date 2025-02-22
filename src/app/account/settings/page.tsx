import { Metadata } from "next";
import { redirect } from "next/navigation";

// Components
import { Layout, TwoColumnsLayout, AccountNavigation } from "@/components";

// HOC
import { withAuth, WithAuthProps } from "@/hoc/withAuth";

export const metadata: Metadata = {
  title: "Settings",
};

function Settings({ user }: WithAuthProps) {
  if (!user) redirect("/signin");

  return (
    <Layout>
      <TwoColumnsLayout breakpoint="md">
        <AccountNavigation />
        <div>Settings are not ready yet...</div>
      </TwoColumnsLayout>
    </Layout>
  );
}

export default withAuth(Settings);
