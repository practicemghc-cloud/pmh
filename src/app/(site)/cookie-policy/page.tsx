import type { Metadata } from "next";
import { LegalDocument, type LegalSection } from "@/components/sections/LegalDocument";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How PMG Healthcare uses cookies and similar technologies on this website, and how to control them.",
};

/**
 * Standard cookie notice, written to match what the site actually does today:
 * essential cookies only, with analytics gated behind the consent prompt (see
 * `CookieBanner`). If a third-party script is ever added, list it in the
 * categories below — a policy that describes cookies the site does not set is
 * as wrong as one that misses cookies it does.
 *
 * General information, not legal advice; have it reviewed before launch.
 */
const SECTIONS: LegalSection[] = [
  {
    heading: "What cookies are",
    body: [
      "Cookies are small text files that a website asks your browser to store on your device. They are widely used to make websites work, to remember your preferences between visits, and to give site owners information about how their pages are used.",
      "Similar technologies — local storage, session storage and pixels — do comparable jobs. Where this policy says “cookies”, it covers those too.",
    ],
  },
  {
    heading: "How we use them",
    body: [
      "We keep our use of cookies to a minimum. Essential cookies and local storage keep the site working and remember the choice you make in our cookie prompt. Anything beyond that is only set if you accept it.",
    ],
    rows: [
      {
        term: "Strictly necessary",
        detail:
          "Needed for the site to function — page delivery, security, and remembering your cookie choice so we stop asking. These cannot be switched off.",
      },
      {
        term: "Preferences",
        detail:
          "Remember choices you make, so the site behaves the way you left it. Set only where you have used a feature that needs them.",
      },
      {
        term: "Analytics",
        detail:
          "Tell us which pages are visited and how people move through the site, so we can improve it. Set only if you select “Accept all”.",
      },
      {
        term: "Marketing",
        detail:
          "Used to measure and target advertising. We do not currently use marketing cookies on this site.",
      },
    ],
  },
  {
    heading: "Your choice",
    body: [
      "When you first visit, we ask whether you are happy for us to use non-essential cookies. You can choose “Accept all” or “Essential only”, and the site records that choice so it does not ask again on the same browser.",
      "To change your mind, clear this site’s data in your browser settings. The prompt will appear again on your next visit and you can answer differently.",
    ],
  },
  {
    heading: "Third-party cookies",
    body: [
      "Some pages may include content served by other organisations — for example an embedded map or video, or a link that opens a messaging app. Those providers may set their own cookies, which are governed by their policies rather than this one.",
      "We do not control third-party cookies and we do not use them to build a profile of you.",
    ],
  },
  {
    heading: "Managing cookies in your browser",
    body: [
      "Every major browser lets you see the cookies a site has set, delete them, and block them in future. The settings are usually under Privacy, Security or Site settings.",
      "Blocking all cookies will stop parts of most websites from working properly, including sign-in and form submission. Blocking only third-party cookies is usually safe.",
    ],
    list: [
      "Chrome — Settings → Privacy and security → Third-party cookies",
      "Safari — Settings → Privacy → Manage Website Data",
      "Firefox — Settings → Privacy & Security → Cookies and Site Data",
      "Edge — Settings → Cookies and site permissions",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "We update this policy when the cookies we use change, and the date at the top always reflects the current version. Where a change materially affects how we use your data, we will ask for your consent again.",
    ],
  },
  {
    heading: "Contact us",
    body: ["If you have a question about how we use cookies, email us and we will answer it."],
    email: site.email,
  },
];

export default function CookiePolicyPage() {
  return (
    <LegalDocument
      eyebrow="Legal"
      title="Cookie Policy"
      intro="This policy explains what cookies are, which ones this website uses, and how you can control them."
      updated="13 September 2026"
      sections={SECTIONS}
    />
  );
}
