import type { StructureResolver } from "sanity/structure";
import { CogIcon } from "@sanity/icons/Cog";
import { HomeIcon } from "@sanity/icons/Home";
import { UsersIcon } from "@sanity/icons/Users";
import { ThListIcon } from "@sanity/icons/ThList";
import { EnvelopeIcon } from "@sanity/icons/Envelope";
import { CaseIcon } from "@sanity/icons/Case";
import { CommentIcon } from "@sanity/icons/Comment";
import { HelpCircleIcon } from "@sanity/icons/HelpCircle";
import { StarIcon } from "@sanity/icons/Star";

/**
 * The Studio's left-hand menu.
 *
 * Built by hand rather than using the default document-type list, so an editor
 * sees "Home page", "About page", … in the order the site is organised —
 * instead of a flat list of schema names. Pages are singletons opened straight
 * into their editor, with no "create new" or "delete" to get lost in.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("PMG website")
    .items([
      S.listItem()
        .title("Home page")
        .icon(HomeIcon)
        .child(S.document().schemaType("homePage").documentId("homePage").title("Home page")),

      S.listItem()
        .title("About page")
        .icon(UsersIcon)
        .child(S.document().schemaType("aboutPage").documentId("aboutPage").title("About page")),

      S.listItem()
        .title("Services page")
        .icon(ThListIcon)
        .child(
          S.document().schemaType("servicesPage").documentId("servicesPage").title("Services page"),
        ),

      S.listItem()
        .title("Contact page")
        .icon(EnvelopeIcon)
        .child(S.document().schemaType("contactPage").documentId("contactPage").title("Contact page")),

      S.divider(),

      // Reused across several pages — edited once, updates everywhere.
      S.listItem()
        .title("Services")
        .icon(CaseIcon)
        .child(
          S.documentTypeList("service")
            .title("Services")
            .defaultOrdering([{ field: "order", direction: "asc" }]),
        ),

      S.listItem()
        .title("Client stories")
        .icon(CommentIcon)
        .child(
          S.documentTypeList("clientStory")
            .title("Client stories")
            .defaultOrdering([{ field: "order", direction: "asc" }]),
        ),

      S.listItem()
        .title("FAQs")
        .icon(HelpCircleIcon)
        .child(
          S.list()
            .title("FAQs")
            .items([
              S.listItem()
                .title("Home & About")
                .child(
                  S.documentList()
                    .title("Home & About FAQs")
                    .filter('_type == "faq" && placement == "general"')
                    .defaultOrdering([{ field: "order", direction: "asc" }])
                    .initialValueTemplates([]),
                ),
              S.listItem()
                .title("Contact page")
                .child(
                  S.documentList()
                    .title("Contact page FAQs")
                    .filter('_type == "faq" && placement == "contact"')
                    .defaultOrdering([{ field: "order", direction: "asc" }]),
                ),
            ]),
        ),

      S.listItem()
        .title("Closing call-to-action")
        .icon(StarIcon)
        .child(
          S.document()
            .schemaType("closingCta")
            .documentId("closingCta")
            .title("Closing call-to-action"),
        ),

      S.divider(),

      S.listItem()
        .title("Site settings")
        .icon(CogIcon)
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings").title("Site settings"),
        ),
    ]);
