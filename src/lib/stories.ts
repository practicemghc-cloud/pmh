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
 * client stories." Only three of the nine avatars have practice-type chips
 * specified (SC, JM, TN); the rest are marked as pending rather than invented.
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
  { ...base, initials: "RP", chips: PENDING_CHIPS },
  { ...base, initials: "AK", chips: PENDING_CHIPS },
  { ...base, initials: "DL", chips: PENDING_CHIPS },
  { ...base, initials: "SC", chips: ["Private practice", "Billing"] },
  {
    ...base,
    initials: "JM",
    chips: ["Private practice", "Billing & Collection", "Debt recovery"],
  },
  { ...base, initials: "TN", chips: ["Clinic group", "Coding"] },
  { ...base, initials: "HB", chips: PENDING_CHIPS },
  { ...base, initials: "MO", chips: PENDING_CHIPS },
  { ...base, initials: "EW", chips: PENDING_CHIPS },
];

/** The frame shows JM (index 4) selected. */
export const defaultStoryIndex = 4;
