import { Metadata } from "next";
import { redirect } from "next/navigation";

// Components
import { Layout, TwoColumnsLayout, AccountNavigation } from "@/components";

// HOC
import { withAuth, WithAuthProps } from "@/hoc/withAuth";
import { RatingsProvider } from "@/context";
import { ReviewsList } from "@/components/blocks/ReviewsList";

// Styles
import { css } from "../../../../styled-system/css";

export const metadata: Metadata = {
  title: "My reviews",
};

function ReviewsRoute({ user }: WithAuthProps) {
  if (!user) redirect("/signin");

  return (
    <Layout>
      <TwoColumnsLayout breakpoint="md">
        <AccountNavigation />
        <RatingsProvider userId={user?.id}>
          <div
            className={css({
              display: "grid",
              my: { base: 1, md: 4 },
              gridTemplateColumns: {
                base: "1fr",
                md: "1fr 1fr",
                xl: "1fr 1fr 1fr",
              },
              justifyContent: "center",
              gap: { base: 3, xl: 4 },
            })}
          >
            <ReviewsList forWho="user" />
          </div>
        </RatingsProvider>
      </TwoColumnsLayout>
    </Layout>
  );
}

export default withAuth(ReviewsRoute);
