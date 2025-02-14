import { supabaseClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

// Components
import { Header, Container, AccountForm } from "@/components";

// Styles
import { css } from "../../../styled-system/css";

const accountMenuWidth = 270;

export default async function Account() {
  const supabase = await supabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/signin");

  return (
    <>
      <Header />
      <Container>
        <div
          className={css({
            display: "grid",
            gridTemplateColumns: {
              lg: `${accountMenuWidth}px 1fr`,
            },
          })}
        >
          {/* <AccountMenu /> */}
          <AccountForm user={user} />
        </div>
      </Container>
    </>
  );
}
