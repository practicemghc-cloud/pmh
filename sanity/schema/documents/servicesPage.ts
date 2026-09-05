import { defineField, defineType } from "sanity";
import { ThListIcon } from "@sanity/icons/ThList";

/**
 * The Services page top section. The five panels below it come from the
 * Service documents, so they're edited once and reused across the site.
 */
export const servicesPage = defineType({
  name: "servicesPage",
  title: "Services page",
  type: "document",
  icon: ThListIcon,
  fields: [
    defineField({ name: "eyebrow", title: "Small label", type: "string" }),
    defineField({
      name: "heading",
      title: "Headline",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "body", title: "Paragraph", type: "text", rows: 4 }),
    defineField({ name: "cta", title: "Green button", type: "richLink" }),
  ],
  preview: {
    prepare: () => ({
      title: "Services page",
      subtitle: "The five service panels are edited under Services",
    }),
  },
});
