import { Metadata } from "next";
import { Layout, HomePage } from "@/components";
import { withAuth, WithAuthProps } from "@/hoc/withAuth";

export const metadata: Metadata = {
  title: "Welcome to GamesCollector",
  description: "Build your ultimate games collection.",
};

async function HomeRoute({ user }: WithAuthProps) {
  const randomImgNumber = Math.ceil(Math.random() * 4);

  return (
    <Layout>
      <HomePage user={user} randomImgNumber={randomImgNumber} />
    </Layout>
  );
}

export default withAuth(HomeRoute);
