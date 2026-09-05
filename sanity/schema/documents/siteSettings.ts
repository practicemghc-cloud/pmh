import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons/Cog";

/** Everything that appears on every page: nav, footer, contact details. */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "brand", title: "Brand & contact", default: true },
    { name: "seo", title: "SEO & sharing" },
    { name: "social", title: "Social media" },
    { name: "nav", title: "Navigation" },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    defineField({
      name: "description",
      title: "Company description",
      type: "text",
      rows: 3,
      group: "brand",
      description: "The paragraph under the logo in the footer. Also used as the site's search description.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email address",
      type: "string",
      group: "brand",
      description: "Shown in the footer and on the Contact page, and turned into a mailto: link.",
    }),
    defineField({
      name: "phone",
      title: "Phone number",
      type: "string",
      group: "brand",
      description:
        "Shown in the footer and on the Contact page. Write it how it should read, e.g. “+44 (0)20 7123 4567” — the dialling link is worked out for you.",
    }),
    defineField({
      name: "officeHours",
      title: "Office hours",
      type: "string",
      group: "brand",
      description: "Shown on the Contact page, e.g. “Mon–Fri, 9:00–17:30”.",
    }),
    defineField({
      name: "copyright",
      title: "Copyright line",
      type: "string",
      group: "footer",
      description: "The small print at the very bottom of every page.",
    }),

    /* -- SEO & sharing ------------------------------------------------- */
    defineField({
      name: "metaTitle",
      title: "Browser tab title",
      type: "string",
      group: "seo",
      description:
        "Shown in the browser tab and as the blue headline in Google results. Around 60 characters — longer gets cut off.",
      validation: (rule) =>
        rule.max(70).warning("Over about 60 characters Google usually truncates this."),
    }),
    defineField({
      name: "metaDescription",
      title: "Search result description",
      type: "text",
      rows: 3,
      group: "seo",
      description:
        "The grey summary under the title in Google. Aim for 150–160 characters. If you leave this empty the company description is used.",
      validation: (rule) =>
        rule.max(200).warning("Over about 160 characters this gets truncated in search results."),
    }),
    defineField({
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [{ type: "string" }],
      group: "seo",
      options: { layout: "tags" },
      description:
        "Type a phrase and press Enter. Modern search engines largely ignore these, so treat them as a nice-to-have rather than something to spend time on.",
    }),
    defineField({
      name: "shareImage",
      title: "Social sharing image",
      type: "imageWithAlt",
      group: "seo",
      description:
        "The picture that appears when someone pastes a link to this site into WhatsApp, LinkedIn, Slack or X. Landscape, ideally 1200 × 630 pixels.",
    }),

    /* -- Social media -------------------------------------------------- */
    defineField({
      name: "socialLinks",
      title: "Social media profiles",
      type: "array",
      group: "social",
      description:
        "These appear as icons in the footer, in this order. Drag to reorder, or delete one to hide it.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "Facebook", value: "facebook" },
                  { title: "Instagram", value: "instagram" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "X (Twitter)", value: "x" },
                  { title: "YouTube", value: "youtube" },
                ],
                layout: "dropdown",
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "Profile address",
              type: "url",
              description: "The full address, e.g. https://www.linkedin.com/company/pmg-healthcare",
              validation: (rule) =>
                rule.required().uri({ scheme: ["http", "https"] }).error("Please paste a full web address starting with https://"),
            }),
          ],
          preview: {
            select: { title: "platform", subtitle: "url" },
            prepare: ({ title, subtitle }: { title?: string; subtitle?: string }) => ({
              title: title ? title.charAt(0).toUpperCase() + title.slice(1) : "Choose a platform",
              subtitle,
            }),
          },
        },
      ],
    }),

    defineField({
      name: "navLinks",
      title: "Menu links",
      type: "array",
      group: "nav",
      of: [{ type: "richLink" }],
      description:
        "The links in the floating menu, in order. The Services link automatically gets the drop-down menu.",
    }),
    defineField({
      name: "navPrimaryCta",
      title: "Green button",
      type: "richLink",
      group: "nav",
      description: "The mint button on the right of the menu.",
    }),
    defineField({
      name: "navSecondaryCta",
      title: "Grey button",
      type: "richLink",
      group: "nav",
    }),

    defineField({
      name: "footerCompanyLinks",
      title: "Footer — COMPANY column",
      type: "array",
      group: "footer",
      of: [{ type: "richLink" }],
    }),
    defineField({
      name: "footerLegalLinks",
      title: "Footer — LEGAL column",
      type: "array",
      group: "footer",
      of: [{ type: "richLink" }],
      description:
        "Leave a link's “Goes to” empty and it shows as plain text — useful until the page exists.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site settings" }),
  },
});
