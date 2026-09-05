import type { SchemaTypeDefinition } from "sanity";

import { objects } from "./objects";
import { siteSettings } from "./documents/siteSettings";
import { closingCta } from "./documents/closingCta";
import { homePage } from "./documents/homePage";
import { aboutPage } from "./documents/aboutPage";
import { servicesPage } from "./documents/servicesPage";
import { contactPage } from "./documents/contactPage";
import { service } from "./documents/service";
import { clientStory } from "./documents/clientStory";
import { faq } from "./documents/faq";

/** Documents that exist exactly once. The Studio hides "create" for these. */
export const singletonTypes = [
  "siteSettings",
  "closingCta",
  "homePage",
  "aboutPage",
  "servicesPage",
  "contactPage",
] as const;

export const schemaTypes: SchemaTypeDefinition[] = [
  ...objects,
  siteSettings,
  closingCta,
  homePage,
  aboutPage,
  servicesPage,
  contactPage,
  service,
  clientStory,
  faq,
];
