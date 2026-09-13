import { defineQuery } from "next-sanity";

/**
 * GROQ queries, one per page plus the shared pieces.
 *
 * Each projects exactly the fields the components render — no `...` spreads —
 * so a schema change that breaks a component shows up here rather than as an
 * undefined at runtime. Images resolve to a URL and alt text so callers never
 * need the image builder.
 */

const IMAGE = `{ "url": asset->url, alt }`;
const LINK = `{ label, href }`;

export const siteSettingsQuery = defineQuery(`
  *[_type == "siteSettings"][0]{
    description, email, phone, officeHours, copyright,
    metaTitle, metaDescription, keywords,
    shareImage{ "url": asset->url, alt },
    socialLinks[]{ platform, url },
    navLinks[]${LINK},
    navPrimaryCta${LINK},
    footerCompanyLinks[]${LINK},
    footerLegalLinks[]${LINK}
  }
`);

export const servicesQuery = defineQuery(`
  *[_type == "service"] | order(order asc){
    "slug": slug.current,
    name, tabLabel, footerLabel, blurb, icon,
    panelTitle, panelIntro, included,
    steps[]{ title, body }
  }
`);

export const closingCtaQuery = defineQuery(`
  *[_type == "closingCta"][0]{
    headline, headlineAccent, body,
    reassurance[]{ icon, label }
  }
`);

export const generalFaqsQuery = defineQuery(`
  *[_type == "faq" && placement == "general"] | order(order asc){
    question, answer, openByDefault
  }
`);

export const contactFaqsQuery = defineQuery(`
  *[_type == "faq" && placement == "contact"] | order(order asc){
    question, answer, topic, openByDefault
  }
`);

export const clientStoriesQuery = defineQuery(`
  *[_type == "clientStory"] | order(order asc){
    initials, name, meta, rating, quote, chips
  }
`);

export const homePageQuery = defineQuery(`
  *[_type == "homePage"][0]{
    heroHeading, heroHeadingAccent, heroLead, heroBody,
    heroPrimaryCta${LINK}, heroSecondaryCta${LINK},
    heroStats[]{ value, unit, label },
    heroPhotoMain${IMAGE}, heroPhotoTall${IMAGE}, heroPhotoWide${IMAGE},
    heroPhotoCaption, heroPhotoCaptionAccent, heroFeatureCard,

    handleIntro{ eyebrow, heading, body }, handleIntroBold,
    handleFeatureChips, handleFeatureStat,
    handlePhotoOperations${IMAGE}, handlePhotoInternational${IMAGE},

    trustIntro{ eyebrow, heading, body }, trustIntroBold,
    trustFeature{ title, body, footnote },
    trustCards[]{ title, body },

    storiesIntro{ eyebrow, heading, body }, storiesFootnote,

    stepsIntro{ eyebrow, heading, body },
    steps[]{ tab, timing, title, body, you, pmg },

    faqIntro{ eyebrow, heading, body },
    faqCard{ title, body, cta${LINK}, hours }
  }
`);

export const aboutPageQuery = defineQuery(`
  *[_type == "aboutPage"][0]{
    heroEyebrow, heroHeading, heroLead, heroBody, heroPhoto${IMAGE},
    heroStats[]{ value, unit, label },

    cascadeEyebrow, cascadeHeading, cascadeWords, cascadePayoff,

    statementEyebrow, statementHeading, statementBody,
    statementLink${LINK}, statementPhoto${IMAGE},
    mission{ eyebrow, body },

    purposeEyebrow, purposeHeading, purposeBody, purposeCta${LINK},
    purposePhoto${IMAGE}, qualitiesEyebrow, qualities,
    vision{ eyebrow, body }
  }
`);

export const servicesPageQuery = defineQuery(`
  *[_type == "servicesPage"][0]{
    eyebrow, heading, body, cta${LINK}
  }
`);

export const contactPageQuery = defineQuery(`
  *[_type == "contactPage"][0]{
    eyebrow, heading, body, reassurance,
    formTitle, formConsent, formButton, specialities,
    callEyebrow, callHeading,
    callSteps[]{ title, body },
    faqEyebrow, faqHeading,
    faqAskCard{ title, body, cta${LINK} }
  }
`);
