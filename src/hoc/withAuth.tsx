import { User } from "@supabase/supabase-js";
import { supabaseClient } from "@/utils/supabase/server";

export interface WithAuthProps {
  user: User;
}

export function withAuth<P extends WithAuthProps>(
  WrappedComponent: React.ComponentType<P>
) {
  return async function AuthenticatedComponent(
    props: Omit<P, keyof WithAuthProps>
  ) {
    const supabase = await supabaseClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    return <WrappedComponent {...(props as P)} user={user} />;
  };
}
