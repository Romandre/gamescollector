import { Metadata } from "next";
import { redirect } from "next/navigation";
import { login, signup } from "./actions";

// Components
import { Layout, LoginForm } from "@/components";

// HOC
import { withAuth, WithAuthProps } from "@/hoc/withAuth";

export const metadata: Metadata = {
  title: "Sign-in",
};

async function SigninRoute({ user }: WithAuthProps) {
  if (user) redirect("/account");

  return (
    <Layout>
      <LoginForm login={login} signup={signup} />
    </Layout>
  );
}

export default withAuth(SigninRoute);
