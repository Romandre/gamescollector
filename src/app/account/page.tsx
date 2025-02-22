import { Metadata } from "next";
import { redirect } from "next/navigation";

// Components
import {
  Layout,
  TwoColumnsLayout,
  AccountNavigation,
  AccountForm,
} from "@/components";

// HOC
import { withAuth, WithAuthProps } from "@/hoc/withAuth";

export const metadata: Metadata = {
  title: "Account",
};

function AccountRoute({ user }: WithAuthProps) {
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

export default withAuth(AccountRoute);
