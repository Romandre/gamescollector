"use client";

import { SecondaryNavigation } from "./SecondaryNavigation";

const trendsMenuSections = [
  { id: 1, name: "Coming soon", link: "/browse/comingsoon" },
  { id: 2, name: "Most anticipated", link: "/browse/anticipated" },
  { id: 3, name: "Popular now", link: "/browse/popular" },
];

export function GameTrendsNavigation() {
  return <SecondaryNavigation navSections={trendsMenuSections} />;
}
