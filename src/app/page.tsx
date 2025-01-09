import { Header, Container, HomePage } from "@/components";

export default function Home() {
  const randomImgNumber = Math.ceil(Math.random() * 3);

  return (
    <>
      <Header />
      <Container>
        <HomePage randomImgNumber={randomImgNumber} />
      </Container>
    </>
  );
}
