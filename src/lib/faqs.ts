export type Faq = {
  question: string;
  /**
   * `null` where the Figma frame shows the row collapsed with no answer
   * authored yet — copy still to be supplied.
   */
  answer: string | null;
};

/** Figma: "HF · 06 Home — FAQs" (88:2209), also used on About (120:180). */
export const homeFaqs: Faq[] = [
  {
    question: "How much does your service cost?",
    answer:
      "Our fees are fair and transparent, tailored to the services you need and the volume of your practice. Schedule a no-obligation call with us to discuss your requirements and receive a clear, detailed quotation.",
  },
  {
    question: "What happens during the no-obligation call?",
    answer:
      "We will take the time to understand your practice, the support you need and your priorities. We will then explain the most suitable services, answer your questions and provide clear information about the next steps and fees. There is no obligation to proceed.",
  },
  { question: "Do I have to change the software I already use?", answer: null },
  { question: "When do I get paid?", answer: null },
  {
    question: "[ Contract terms, notice period and data handling — to be supplied ]",
    answer: null,
  },
];

export type FaqCategory = {
  name: string;
  /**
   * The question count shown on the rail in Figma (146:891). The design only
   * authors the "Fees & payment" questions, so the other categories carry the
   * planned count with no copy yet.
   */
  plannedCount: number;
  questions: Faq[];
};

/** Figma: "HF · C03 Contact — Extended FAQs" (146:880). */
export const contactFaqCategories: FaqCategory[] = [
  {
    name: "Fees & payment",
    plannedCount: 3,
    questions: [
      {
        question: "How are your fees calculated?",
        answer:
          "[ Answer to be supplied by PMG — the fee basis, what it is calculated on, and when it is charged. ]",
      },
      { question: "Is there a minimum term or notice period?", answer: null },
      { question: "Who do my patients and insurers actually pay?", answer: null },
    ],
  },
  { name: "Getting started", plannedCount: 3, questions: [] },
  { name: "How we work", plannedCount: 3, questions: [] },
  { name: "Your data", plannedCount: 3, questions: [] },
  { name: "Leaving PMG", plannedCount: 2, questions: [] },
];
