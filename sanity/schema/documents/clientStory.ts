import { defineField, defineType } from "sanity";
import { CommentIcon } from "@sanity/icons/Comment";

/** A testimonial in the "What consultants say" carousel on the home page. */
export const clientStory = defineType({
  name: "clientStory",
  title: "Client story",
  type: "document",
  icon: CommentIcon,
  fields: [
    defineField({
      name: "order",
      title: "Position",
      type: "number",
      description: "1 shows first. The carousel highlights the middle one on load.",
      validation: (rule) => rule.required().min(1).integer(),
    }),
    defineField({
      name: "initials",
      title: "Initials",
      type: "string",
      description: "Two letters for the round avatar, e.g. “JM”.",
      validation: (rule) => rule.required().max(3),
    }),
    defineField({
      name: "name",
      title: "Client name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "meta",
      title: "Speciality and practice",
      type: "string",
      description: "The line under the name, e.g. “Orthopaedics · Harley Street Clinic”.",
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "string",
      description: "Shown beside the stars, e.g. “5.0”.",
    }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "chips",
      title: "Practice type tags",
      type: "array",
      of: [{ type: "string" }],
      description: "Small tags on the left of the card, e.g. “Private practice”, “Billing”.",
    }),
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", initials: "initials", order: "order", subtitle: "meta" },
    prepare: ({ title, initials, order, subtitle }) => ({
      title: `${order ?? "?"}. ${initials} — ${title}`,
      subtitle,
    }),
  },
});
