import { ReactNode } from "react";
import { Header, Container } from "./";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  );
}
