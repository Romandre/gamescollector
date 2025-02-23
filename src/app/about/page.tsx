import { Metadata } from "next";
import Link from "next/link";
import { Layout } from "@/components";
import { css } from "../../../styled-system/css";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutRoute() {
  return (
    <Layout>
      <div
        className={css({
          maxW: "750px",
          mx: "auto",
          mt: { base: 4, md: 8 },
          mb: 2,
          textAlign: "center",
          textWrap: "balance",
        })}
      >
        <h2
          className={css({
            position: "relative",
            display: "inline-block",
            mb: 2,
            fontSize: { base: 42, lg: 46, "2xl": 48 },
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: 1,
            textShadow: "4px 6px 4px rgba(0,0,0,0.3)",
          })}
        >
          Hi, welcome to GamesCollector!
        </h2>

        <p className={css({ my: 4 })}>
          GamesCollector is a project built with passion for gamers, by gamers!
          My goal is to create the independent hub for tracking game releases,
          creating own game collections, following updates and patches, rating
          and discussing gaming experience.
        </p>

        <p className={css({ my: 4 })}>
          This won&apos;t be one of those sites where trands and ratings are
          paid for. Only real and honest gamers feedback is appreciated here.
          This project built purely for fun, with no financial intentions behind
          it. As a huge fan of videogames, I want to create the most comfortable
          and cozy platform suitable for most gamer needs.
        </p>

        <p className={css({ my: 4 })}>
          As it&apos;s still in the early stages of development, there may be
          bugs and issues here and there. However, the project is activelly
          improving over the time and new features are added frequently. I have
          a lot of awesome ideas, the backlog is huge and the roadmap is even
          bigger. Soon there will be a possibility to share your feedback and
          report bugs and wishes.
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
    </Layout>
  );
}
