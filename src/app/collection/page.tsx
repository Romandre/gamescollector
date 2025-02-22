import { Metadata } from "next";
import { redirect } from "next/navigation";

// Components
import {
  Layout,
  TwoColumnsLayout,
  AccountNavigation,
  Collection,
} from "@/components";

// HOC
import { withAuth, WithAuthProps } from "@/hoc/withAuth";

export const metadata: Metadata = {
  title: "Your games collection",
};

function CollectionRoute({ user }: WithAuthProps) {
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

export default withAuth(CollectionRoute);
