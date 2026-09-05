import { defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons/Home";

/**
 * The home page. One tab per section, in the order they appear as you scroll,
 * so the Studio reads like the page itself.
 */
export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "hero", title: "1. Hero", default: true },
    { name: "handle", title: "2. What we handle" },
    { name: "trust", title: "3. Why choose PMG" },
    { name: "stories", title: "4. Client stories" },
    { name: "steps", title: "5. Getting started" },
    { name: "faqs", title: "6. FAQs" },
  ],
  fields: [
    /* -- 1. Hero ------------------------------------------------------ */
    defineField({
      name: "heroHeading",
      title: "Headline",
      type: "string",
      group: "hero",
      description: "The large heading. The part you put in “Green part of headline” is coloured.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroHeadingAccent",
      title: "Green part of headline",
      type: "string",
      group: "hero",
      description: "Appears after the headline in the deep green, e.g. “Built Around You.”",
    }),
    defineField({
      name: "heroLead",
      title: "Bold line",
      type: "text",
      rows: 2,
      group: "hero",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroBody",
      title: "Paragraph",
      type: "text",
      rows: 3,
      group: "hero",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "heroPrimaryCta", title: "Green button", type: "richLink", group: "hero" }),
    defineField({ name: "heroSecondaryCta", title: "Underlined link", type: "richLink", group: "hero" }),
    defineField({
      name: "heroStats",
      title: "Statistics",
      type: "array",
      of: [{ type: "statItem" }],
      group: "hero",
      description: "The three figures under the buttons. They count up as the visitor arrives.",
      validation: (rule) => rule.max(3).warning("The hero is designed for three."),
    }),
    defineField({
      name: "heroPhotoMain",
      title: "Photo — left",
      type: "imageWithAlt",
      group: "hero",
      description: "The tall photo that overlaps the dark panel.",
    }),
    defineField({ name: "heroPhotoTall", title: "Photo — top right", type: "imageWithAlt", group: "hero" }),
    defineField({
      name: "heroPhotoWide",
      title: "Photo — bottom right",
      type: "imageWithAlt",
      group: "hero",
      description: "The one with the “Nothing hidden” caption over it.",
    }),
    defineField({
      name: "heroPhotoCaption",
      title: "Caption over the bottom photo",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroPhotoCaptionAccent",
      title: "Caption — green second line",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroFeatureCard",
      title: "Green card",
      type: "text",
      rows: 2,
      group: "hero",
      description: "The mint card in the collage, e.g. “Every payment goes straight to you”.",
    }),

    /* -- 2. What we handle -------------------------------------------- */
    defineField({ name: "handleIntro", title: "Section heading", type: "sectionIntro", group: "handle" }),
    defineField({
      name: "handleIntroBold",
      title: "Bold closing line",
      type: "string",
      group: "handle",
      description: "The emphasised sentence beside the heading, e.g. “Let us take care of…”.",
    }),
    defineField({
      name: "handleFeatureChips",
      title: "Feature card tags",
      type: "array",
      of: [{ type: "string" }],
      group: "handle",
      description: "Small pills on the dark Billing & Collection card.",
    }),
    defineField({
      name: "handleFeatureStat",
      title: "Feature card badge",
      type: "string",
      group: "handle",
      description: "The mint pill, e.g. “98% collected”.",
    }),
    defineField({
      name: "handlePhotoOperations",
      title: "Photo — Practice Operations card",
      type: "imageWithAlt",
      group: "handle",
    }),
    defineField({
      name: "handlePhotoInternational",
      title: "Photo — International Patients card",
      type: "imageWithAlt",
      group: "handle",
    }),

    /* -- 3. Why choose PMG -------------------------------------------- */
    defineField({ name: "trustIntro", title: "Section heading", type: "sectionIntro", group: "trust" }),
    defineField({
      name: "trustIntroBold",
      title: "Bold closing line",
      type: "string",
      group: "trust",
      description: "e.g. “Not promises. Mechanics.”",
    }),
    defineField({
      name: "trustFeature",
      title: "Dark card (01)",
      type: "object",
      group: "trust",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: "title", title: "Heading", type: "string" }),
        defineField({ name: "body", title: "Paragraph", type: "text", rows: 3 }),
        defineField({ name: "footnote", title: "Mint line underneath", type: "text", rows: 2 }),
      ],
    }),
    defineField({
      name: "trustCards",
      title: "White cards (02–04)",
      type: "array",
      group: "trust",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Heading", type: "string", validation: (r) => r.required() }),
            defineField({ name: "body", title: "Paragraph", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "title", subtitle: "body" } },
        },
      ],
      description:
        "The illustrations inside these cards (the balance panel, the bar chart) are built into the design and aren't editable.",
      validation: (rule) => rule.max(3).warning("The row is designed for three cards."),
    }),

    /* -- 4. Client stories -------------------------------------------- */
    defineField({ name: "storiesIntro", title: "Section heading", type: "sectionIntro", group: "stories" }),
    defineField({
      name: "storiesFootnote",
      title: "Note under the carousel",
      type: "text",
      rows: 2,
      group: "stories",
      description: "Remove this once real client stories are approved.",
    }),

    /* -- 5. Getting started ------------------------------------------- */
    defineField({ name: "stepsIntro", title: "Section heading", type: "sectionIntro", group: "steps" }),
    defineField({
      name: "steps",
      title: "The four steps",
      type: "array",
      group: "steps",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "tab", title: "Tab label", type: "string", validation: (r) => r.required() }),
            defineField({
              name: "timing",
              title: "Timing pill",
              type: "string",
              description: "The mint pill, e.g. “Day 1” or “Ongoing”.",
            }),
            defineField({ name: "title", title: "Heading", type: "string", validation: (r) => r.required() }),
            defineField({ name: "body", title: "Paragraph", type: "text", rows: 3 }),
            defineField({ name: "you", title: "“You” — what the client does", type: "string" }),
            defineField({ name: "pmg", title: "“PMG” — what we do", type: "string" }),
          ],
          preview: { select: { title: "title", subtitle: "timing" } },
        },
      ],
      description:
        "The illustration beside each step (the booking calendar, the scope table) is built into the design.",
      validation: (rule) => rule.max(4).warning("The stepper is designed for four steps."),
    }),

    /* -- 6. FAQs ------------------------------------------------------ */
    defineField({ name: "faqIntro", title: "Section heading", type: "sectionIntro", group: "faqs" }),
    defineField({
      name: "faqCard",
      title: "“Still have a question?” card",
      type: "object",
      group: "faqs",
      options: { collapsible: true },
      fields: [
        defineField({ name: "title", title: "Heading", type: "string" }),
        defineField({ name: "body", title: "Paragraph", type: "text", rows: 2 }),
        defineField({ name: "cta", title: "Button", type: "richLink" }),
        defineField({ name: "hours", title: "Hours line", type: "string" }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Home page" }) },
});
