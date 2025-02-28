"use client";

import { SecondaryNavigation } from "./SecondaryNavigation";

const accountMenuSections = [
  { id: 1, name: "Account Info", link: "/account" },
  { id: 2, name: "Game Collection", link: "/collection" },
  { id: 3, name: "My Reviews", link: "/account/reviews" },
];

export function AccountNavigation() {
  return <SecondaryNavigation navSections={accountMenuSections} />;
}
