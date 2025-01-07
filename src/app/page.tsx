import { Header, Container, HomePage } from "@/components";

export default function Home() {
  const randomImgNumber = Math.ceil(Math.random() * 7);

  return (
    <>
      <Header />
      <Container>
        <HomePage randomImgNumber={randomImgNumber} />
      </Container>
    </>
  );
}
