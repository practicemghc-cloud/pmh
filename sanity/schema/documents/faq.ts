import { defineField, defineType } from "sanity";
import { HelpCircleIcon } from "@sanity/icons/HelpCircle";

/**
 * A question and answer.
 *
 * `placement` decides where it appears: the short set on the Home and About
 * pages, or the searchable set on Contact (which also uses `topic`).
 */
export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: "order",
      title: "Position",
      type: "number",
      validation: (rule) => rule.required().min(1).integer(),
    }),
    defineField({
      name: "placement",
      title: "Where does this appear?",
      type: "string",
      options: {
        list: [
          { title: "Home & About pages", value: "general" },
          { title: "Contact page (the longer list)", value: "contact" },
        ],
        layout: "radio",
      },
      initialValue: "general",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "topic",
      title: "Topic",
      type: "string",
      description: "Groups this question in the Contact page's “Browse by topic” list.",
      options: {
        list: [
          "Fees & payment",
          "Getting started",
          "How we work",
          "Your data",
          "Leaving PMG",
        ],
      },
      hidden: ({ document }) => document?.placement !== "contact",
    }),
    defineField({
      name: "question",
      title: "Question",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 5,
      description: "Leave empty and the row still appears, showing a “to be supplied” note.",
    }),
    defineField({
      name: "openByDefault",
      title: "Start expanded",
      type: "boolean",
      description: "The design shows the first two questions already open.",
      initialValue: false,
    }),
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "question", placement: "placement", topic: "topic", order: "order" },
    prepare: ({ title, placement, topic, order }) => ({
      title: `${order ?? "?"}. ${title}`,
      subtitle: placement === "contact" ? `Contact page · ${topic ?? "no topic"}` : "Home & About",
    }),
  },
});
