import { Header, Container, GamePage } from "@/components";

export default async function GameRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <Header />
      <Container>
        <GamePage id={id} />
      </Container>
    </>
  );
}
