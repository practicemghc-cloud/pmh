/**
 * About — PMG's UK Medical Adviser. The built-in copy, used until the About
 * page's "UK Medical Adviser" tab is filled in, and the seed for that tab.
 */
export const adviser = {
  eyebrow: "UK Medical Adviser",
  name: "Professor Erlick Pereira",
  role: "Consultant Neurosurgeon & Professor of Neurosurgery",
  body:
    "Professor Pereira is Consultant Neurosurgeon at St George’s University Hospitals NHS " +
    "Foundation Trust and Professor of Neurosurgery at City St George’s, University of London. " +
    "He acts as PMG’s UK Medical Adviser and representative, bringing clinical rigour and " +
    "independent oversight to how we support consultants and practices across the country.",
  credentials: [
    "Consultant Neurosurgeon, St George’s University Hospitals NHS Foundation Trust",
    "Professor of Neurosurgery, City St George’s, University of London",
    "Independent clinical oversight of how PMG supports practices",
  ],
  photo: "/images/erlick-pereira.webp",
  photoAlt: "Professor Erlick Pereira",
};

export type Adviser = {
  eyebrow: string;
  name: string;
  role: string;
  body: string;
  credentials: readonly string[];
  /** A local `/images/…` path or a Sanity CDN URL; `null` shows the monogram. */
  photo: string | null;
  photoAlt: string;
};
