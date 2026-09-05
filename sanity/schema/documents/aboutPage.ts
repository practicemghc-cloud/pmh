import { defineField, defineType } from "sanity";
import { UsersIcon } from "@sanity/icons/Users";

/** The About page, one tab per section in scroll order. */
export const aboutPage = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  icon: UsersIcon,
  groups: [
    { name: "hero", title: "1. Hero", default: true },
    { name: "cascade", title: "2. Behind the scenes" },
    { name: "statement", title: "3. That's where PMG comes in" },
    { name: "purpose", title: "4. Purpose & vision" },
  ],
  fields: [
    /* -- 1. Hero ------------------------------------------------------ */
    defineField({ name: "heroEyebrow", title: "Small label", type: "string", group: "hero" }),
    defineField({
      name: "heroHeading",
      title: "Headline",
      type: "text",
      rows: 3,
      group: "hero",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "heroLead", title: "Green bold line", type: "text", rows: 2, group: "hero" }),
    defineField({ name: "heroBody", title: "Paragraph", type: "text", rows: 3, group: "hero" }),
    defineField({
      name: "heroPhoto",
      title: "Photo",
      type: "imageWithAlt",
      group: "hero",
      description: "Runs off the left edge of the page.",
    }),
    defineField({
      name: "heroStats",
      title: "Credentials",
      type: "array",
      of: [{ type: "statItem" }],
      group: "hero",
      validation: (rule) => rule.max(3).warning("Designed for three."),
    }),

    /* -- 2. Behind the scenes ----------------------------------------- */
    defineField({ name: "cascadeEyebrow", title: "Small label", type: "string", group: "cascade" }),
    defineField({ name: "cascadeHeading", title: "Heading", type: "text", rows: 2, group: "cascade" }),
    defineField({
      name: "cascadeWords",
      title: "The big words",
      type: "array",
      of: [{ type: "string" }],
      group: "cascade",
      description:
        "Five words that fly in from alternating sides, e.g. Billing, Administration, Operations… Order matters.",
      validation: (rule) => rule.max(6).warning("Five works best — more will crowd the section."),
    }),
    defineField({
      name: "cascadePayoff",
      title: "Green pill at the bottom",
      type: "text",
      rows: 2,
      group: "cascade",
    }),

    /* -- 3. Statement -------------------------------------------------- */
    defineField({ name: "statementEyebrow", title: "Small label", type: "string", group: "statement" }),
    defineField({ name: "statementHeading", title: "Heading", type: "text", rows: 2, group: "statement" }),
    defineField({ name: "statementBody", title: "Paragraph", type: "text", rows: 5, group: "statement" }),
    defineField({ name: "statementLink", title: "Link", type: "richLink", group: "statement" }),
    defineField({ name: "statementPhoto", title: "Photo", type: "imageWithAlt", group: "statement" }),
    defineField({
      name: "mission",
      title: "Mission card",
      type: "object",
      group: "statement",
      options: { collapsible: true },
      description: "The white card overlapping the photo.",
      fields: [
        defineField({ name: "eyebrow", title: "Small label", type: "string" }),
        defineField({ name: "body", title: "Statement", type: "text", rows: 3 }),
      ],
    }),

    /* -- 4. Purpose ---------------------------------------------------- */
    defineField({ name: "purposeEyebrow", title: "Small label", type: "string", group: "purpose" }),
    defineField({ name: "purposeHeading", title: "Heading", type: "text", rows: 2, group: "purpose" }),
    defineField({ name: "purposeBody", title: "Paragraph on the right", type: "text", rows: 3, group: "purpose" }),
    defineField({ name: "purposeCta", title: "Green button", type: "richLink", group: "purpose" }),
    defineField({ name: "purposePhoto", title: "Photo", type: "imageWithAlt", group: "purpose" }),
    defineField({
      name: "qualitiesEyebrow",
      title: "Pale card — small label",
      type: "string",
      group: "purpose",
    }),
    defineField({
      name: "qualities",
      title: "Pale card — ticked list",
      type: "array",
      of: [{ type: "string" }],
      group: "purpose",
    }),
    defineField({
      name: "vision",
      title: "Green card",
      type: "object",
      group: "purpose",
      options: { collapsible: true },
      fields: [
        defineField({ name: "eyebrow", title: "Small label", type: "string" }),
        defineField({ name: "body", title: "Statement", type: "text", rows: 3 }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "About page" }) },
});
