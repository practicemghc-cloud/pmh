import { defineField, defineType } from "sanity";

/**
 * Reusable field building blocks.
 *
 * Every field carries a plain-English `title` and a `description` that says
 * where it shows up on the site — the Studio is used by people who have not
 * seen this codebase.
 */

export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Image",
  type: "image",
  options: {
    hotspot: true, // lets an editor choose what stays in frame when cropped
  },
  fields: [
    defineField({
      name: "alt",
      title: "Describe this image",
      type: "string",
      description:
        "A short sentence describing what's in the picture, for screen readers and search engines. Example: “A consultant reviewing notes with a patient”.",
      validation: (rule) => rule.required().warning("Please describe the image so it's accessible."),
    }),
  ],
});

export const statItem = defineType({
  name: "statItem",
  title: "Statistic",
  type: "object",
  fields: [
    defineField({
      name: "value",
      title: "Number",
      type: "number",
      description: "Just the number — it counts up as the visitor scrolls to it.",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "unit",
      title: "Suffix",
      type: "string",
      description: "What follows the number, e.g. “%”, “+” or “yrs”. Leave empty for none.",
    }),
    defineField({
      name: "label",
      title: "Caption",
      type: "string",
      description: "The line underneath, e.g. “Debt collection rate”.",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { value: "value", unit: "unit", label: "label" },
    prepare: ({ value, unit, label }) => ({
      title: `${value ?? "—"}${unit ?? ""}`,
      subtitle: label,
    }),
  },
});

export const richLink = defineType({
  name: "richLink",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Link text",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Goes to",
      type: "string",
      description:
        "A page on this site starts with “/” (e.g. /contact). Leave empty to show the text without making it a link.",
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
    prepare: ({ title, subtitle }) => ({
      title,
      subtitle: subtitle || "Not a link — shown as plain text",
    }),
  },
});

export const sectionIntro = defineType({
  name: "sectionIntro",
  title: "Section heading",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Small label above the heading",
      type: "string",
      description: "The little uppercase line, e.g. “OUR PURPOSE”. Optional.",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Supporting paragraph",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: { title: "heading", subtitle: "eyebrow" },
  },
});

export const labelledStep = defineType({
  name: "labelledStep",
  title: "Step",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Step title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Step description",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "body" },
  },
});

export const objects = [imageWithAlt, statItem, richLink, sectionIntro, labelledStep];
