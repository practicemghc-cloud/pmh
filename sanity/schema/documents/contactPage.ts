import { defineField, defineType } from "sanity";
import { EnvelopeIcon } from "@sanity/icons/Envelope";

/** The Contact page. */
export const contactPage = defineType({
  name: "contactPage",
  title: "Contact page",
  type: "document",
  icon: EnvelopeIcon,
  groups: [
    { name: "hero", title: "1. Intro & form", default: true },
    { name: "call", title: "2. What happens on the call" },
    { name: "faqs", title: "3. Extended FAQs" },
  ],
  fields: [
    defineField({ name: "eyebrow", title: "Small label", type: "string", group: "hero" }),
    defineField({
      name: "heading",
      title: "Headline",
      type: "text",
      rows: 2,
      group: "hero",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "body", title: "Paragraph", type: "text", rows: 3, group: "hero" }),
    defineField({
      name: "reassurance",
      title: "Reassurance points",
      type: "array",
      of: [{ type: "string" }],
      group: "hero",
      description: "The shield-icon points under the contact details.",
    }),
    defineField({
      name: "formTitle",
      title: "Form heading",
      type: "string",
      group: "hero",
      description: "The heading on the white enquiry card, e.g. “Send an enquiry”.",
    }),
    defineField({
      name: "formConsent",
      title: "Consent wording",
      type: "text",
      rows: 2,
      group: "hero",
      description: "The sentence beside the tickbox.",
    }),
    defineField({
      name: "formButton",
      title: "Submit button text",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "specialities",
      title: "Speciality options",
      type: "array",
      of: [{ type: "string" }],
      group: "hero",
      description: "Choices in the “Speciality” dropdown on the form.",
    }),

    defineField({ name: "callEyebrow", title: "Small label", type: "string", group: "call" }),
    defineField({ name: "callHeading", title: "Heading", type: "text", rows: 2, group: "call" }),
    defineField({
      name: "callSteps",
      title: "The three steps",
      type: "array",
      of: [{ type: "labelledStep" }],
      group: "call",
      validation: (rule) => rule.max(3).warning("Designed for three."),
    }),

    defineField({ name: "faqEyebrow", title: "Small label", type: "string", group: "faqs" }),
    defineField({ name: "faqHeading", title: "Heading", type: "text", rows: 2, group: "faqs" }),
    defineField({
      name: "faqAskCard",
      title: "“Not answered here?” card",
      type: "object",
      group: "faqs",
      options: { collapsible: true },
      fields: [
        defineField({ name: "title", title: "Heading", type: "string" }),
        defineField({ name: "body", title: "Paragraph", type: "text", rows: 2 }),
        defineField({ name: "cta", title: "Button", type: "richLink" }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Contact page" }) },
});
