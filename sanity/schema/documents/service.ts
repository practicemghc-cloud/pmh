import { defineField, defineType } from "sanity";
import { CaseIcon } from "@sanity/icons/Case";

/**
 * A service. Edited once, used in four places: the nav mega menu, the footer's
 * SERVICES column, the Services page tab strip and panel, and the enquiry
 * form's "What can we help with?" chips.
 */
export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  icon: CaseIcon,
  groups: [
    { name: "basics", title: "Names & order", default: true },
    { name: "panel", title: "Services page" },
    { name: "included", title: "What's included" },
    { name: "how", title: "How we work" },
  ],
  fields: [
    defineField({
      name: "order",
      title: "Position",
      type: "number",
      group: "basics",
      description: "1 shows first. Controls the order everywhere this service appears.",
      validation: (rule) => rule.required().min(1).integer(),
    }),
    defineField({
      name: "name",
      title: "Full name",
      type: "string",
      group: "basics",
      description: "Used in the nav menu and the list on the Services page. e.g. “Billing & collection”.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tabLabel",
      title: "Short name",
      type: "string",
      group: "basics",
      description: "The tab button on the Services page — keep it short so the tabs fit.",
      validation: (rule) => rule.required().max(28),
    }),
    defineField({
      name: "footerLabel",
      title: "Footer name",
      type: "string",
      group: "basics",
      description: "How it reads in the footer's SERVICES column.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Web address",
      type: "slug",
      group: "basics",
      options: { source: "tabLabel", maxLength: 60 },
      description:
        "Used for the link, e.g. /services#billing-collection. Click Generate. Changing this breaks existing links.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      group: "basics",
      description: "The small icon shown beside this service in the nav menu.",
      options: {
        list: [
          { title: "Calendar with tick", value: "calendar-check" },
          { title: "Receipt with tick", value: "receipt-check" },
          { title: "Document with tick", value: "file-check" },
          { title: "Globe", value: "globe" },
          { title: "Upward trend", value: "trend-up" },
        ],
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "blurb",
      title: "One-line summary",
      type: "text",
      rows: 2,
      group: "basics",
      description: "Shown under the name in the nav menu.",
      validation: (rule) => rule.required().max(160),
    }),

    defineField({
      name: "panelTitle",
      title: "Panel headline",
      type: "string",
      group: "panel",
      description: "The big heading on the Services page, e.g. “Your money stays yours.”",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "panelIntro",
      title: "Panel introduction",
      type: "text",
      rows: 3,
      group: "panel",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "included",
      title: "What's included",
      type: "array",
      of: [{ type: "string" }],
      group: "included",
      description: "The ticked list on the left of the panel. Six items fits the design best.",
      validation: (rule) => rule.min(1),
    }),

    defineField({
      name: "steps",
      title: "How we work",
      type: "array",
      of: [{ type: "labelledStep" }],
      group: "how",
      description: "The three numbered steps at the bottom of the panel.",
      validation: (rule) => rule.max(3).warning("The design is built for three steps."),
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", order: "order", subtitle: "blurb" },
    prepare: ({ title, order, subtitle }) => ({
      title: `${order ?? "?"}. ${title}`,
      subtitle,
    }),
  },
});
