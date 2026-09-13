export type ClientStory = {
  initials: string;
  name: string;
  meta: string;
  rating: string;
  quote: string;
  /** "Practice type" chips shown on the story's left rail. */
  chips: string[];
};

/**
 * Figma: "HF · 04 Home — Client stories" (88:2085).
 *
 * Every field is placeholder copy in the design — the frame carries the note
 * "Placeholder content — names, roles, ratings and quotes all await approved
 * client stories."
 *
 * The frame drew nine avatars; the carousel runs four. The three the design
 * gave practice-type chips to (SC, JM, TN) are kept, plus one still pending.
 * Change the count here and the avatar rail, the peeking neighbours and the
 * seed script all follow — nothing else hard-codes the length.
 */
const PLACEHOLDER_QUOTE =
  "“Approved client testimonial copy will appear here. This section will highlight the client’s experience of working with PMG and the difference our support has made to their practice.”";

const base = {
  name: "[ Client name ]",
  meta: "[ Speciality ] · [ Practice name ]",
  rating: "[ 5.0 ]",
  quote: PLACEHOLDER_QUOTE,
};

const PENDING_CHIPS = ["[ To be supplied ]"];

export const clientStories: ClientStory[] = [
  { ...base, initials: "SC", chips: ["Private practice", "Billing"] },
  {
    ...base,
    initials: "JM",
    chips: ["Private practice", "Billing & Collection", "Debt recovery"],
  },
  { ...base, initials: "TN", chips: ["Clinic group", "Coding"] },
  { ...base, initials: "HB", chips: PENDING_CHIPS },
];

/** The frame opens on JM, which is index 1 in the four-story list. */
export const defaultStoryIndex = 1;
