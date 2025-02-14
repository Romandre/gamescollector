import { Layout, HomePage } from "@/components";

export default function Home() {
  const randomImgNumber = Math.ceil(Math.random() * 3);

  return (
    <Layout>
      <HomePage randomImgNumber={randomImgNumber} />
    </Layout>
  );
}
