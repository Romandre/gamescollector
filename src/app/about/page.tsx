import { Metadata } from "next";
import Link from "next/link";
import { Container, Header } from "@/components";
import { css } from "../../../styled-system/css";

export const metadata: Metadata = {
  title: "About",
};

export default function About() {
  return (
    <>
      <Header />
      <Container>
        <div
          className={css({ maxW: "750px", mx: "auto", textAlign: "center" })}
        >
          <h2
            className={css({
              position: "relative",
              display: "inline-block",
              mt: 8,
              mb: 2,
              fontSize: { base: 42, lg: 46, "2xl": 48 },
              fontWeight: 700,
              textWrap: "balance",
              lineHeight: 1.2,
              letterSpacing: 1,
              textShadow: "4px 6px 4px rgba(0,0,0,0.3)",
            })}
          >
            Hi, welcome to GamesCollector site!
          </h2>
          <p className={css({ my: 4 })}>
            GamesCollector is a project built with passion for gamers, by
            gamers! My goal is to create the ultimate hub for everything related
            to video games. Whether you&apos;re searching for your next favorite
            game, tracking upcoming releases, or curating your own game
            collections, GamesCollector is here to enhance your gaming
            experience.
          </p>

          <p className={css({ my: 4 })}>
            This project built purely for fun, with no financial intentions
            behind it. As a huge videogames fun, I believe in fostering a space
            where gamers can connect, share their experiences, and celebrate
            their love for gaming together.
          </p>

          <p className={css({ my: 4 })}>
            As it is still in the early stages of development, there may be bugs
            and issues here and there. However, the project is activelly
            improving over the time and new features are frequently released. I
            have a lot of awesome ideas, the backlog is quite big and the
            roadmap is even bigger. Soon there will be a possibility to share
            your feedback and report bugs and wishes.
          </p>

          <p className={css({ my: 6 })}>
            <strong>
              Thank you for reading this! Stay tuned for cool stuff!
            </strong>
          </p>

          <p
            className={css({
              mt: 12,
              color: "{colors.primary}",
              textAlign: "right",
            })}
          >
            Created by{" "}
            <Link
              href={"https://github.com/Romandre"}
              target="_blank"
              className={css({
                fontWeight: 700,
                textDecoration: "underline",
              })}
            >
              Romandre
            </Link>
          </p>
        </div>
      </Container>
    </>
  );
}
