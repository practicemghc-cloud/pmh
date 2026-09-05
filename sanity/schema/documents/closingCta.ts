import { defineField, defineType } from "sanity";

/**
 * The dark "Focus on your patients" panel. Shared by Home, About and Services,
 * so it lives in one place rather than being repeated per page.
 */
export const closingCta = defineType({
  name: "closingCta",
  title: "Closing call-to-action",
  type: "document",
  fields: [
    defineField({
      name: "headline",
      title: "First line",
      type: "string",
      description: "Shown in white, e.g. “Focus on your patients.”",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "headlineAccent",
      title: "Second line",
      type: "string",
      description: "Shown in mint green underneath, e.g. “We'll handle the rest.”",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Paragraph",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "reassurance",
      title: "Reassurance points",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: {
                list: [
                  { title: "Clock", value: "clock" },
                  { title: "Tick in a circle", value: "check-circle" },
                  { title: "Shield with tick", value: "shield-tick" },
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({ name: "label", title: "Text", type: "string", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "label", subtitle: "icon" } },
        },
      ],
      description: "The three short points along the bottom.",
    }),
  ],
  preview: { prepare: () => ({ title: "Closing call-to-action" }) },
});
