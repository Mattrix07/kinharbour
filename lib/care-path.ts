export type Urgency = "low" | "medium" | "high";
export type SupportLevel = "low" | "medium" | "high";

export type AssessmentAnswers = {
  relationship: string;
  location: string;
  urgency: Urgency;
  livingSituation: "alone" | "with_partner" | "with_family" | "hospital" | "other";
  mobility: SupportLevel;
  cognition: SupportLevel;
  medicalComplexity: SupportLevel;
  familyCapacity: SupportLevel;
  homeCarePreference: "home_first" | "residential_open" | "unsure";
  budgetSensitivity: SupportLevel;
};

export type CarePathResult = {
  pathway: string;
  summary: string;
  urgencyLabel: string;
  score: number;
  riskFlags: string[];
  nextSteps: string[];
  documents: string[];
  providerFilters: string[];
  conversationPrompts: string[];
};

const baseDocuments = [
  "Medicare card and concession cards",
  "Current medication list and GP contact details",
  "Power of attorney or enduring guardian documents if available",
  "Recent hospital discharge summary or specialist letters if relevant",
];

export function getCarePath(answers: AssessmentAnswers): CarePathResult {
  let score = 0;
  const riskFlags: string[] = [];

  if (answers.urgency === "high") {
    score += 4;
    riskFlags.push("High urgency or immediate support pressure");
  } else if (answers.urgency === "medium") {
    score += 2;
  }

  if (answers.livingSituation === "alone") {
    score += 2;
    riskFlags.push("Living alone may increase safety and monitoring risk");
  }

  if (answers.livingSituation === "hospital") {
    score += 4;
    riskFlags.push("Hospital discharge or transition planning may be time sensitive");
  }

  if (answers.mobility === "high") {
    score += 4;
    riskFlags.push("High mobility support needs");
  } else if (answers.mobility === "medium") {
    score += 2;
  }

  if (answers.cognition === "high") {
    score += 4;
    riskFlags.push("Significant memory, cognition or supervision concerns");
  } else if (answers.cognition === "medium") {
    score += 2;
  }

  if (answers.medicalComplexity === "high") {
    score += 3;
    riskFlags.push("Complex medical or nursing needs");
  } else if (answers.medicalComplexity === "medium") {
    score += 1;
  }

  if (answers.familyCapacity === "low") {
    score += 3;
    riskFlags.push("Limited family capacity to provide ongoing support");
  } else if (answers.familyCapacity === "medium") {
    score += 1;
  }

  if (answers.homeCarePreference === "home_first") {
    score -= 1;
  }

  if (score >= 13) {
    return {
      pathway: "Urgent residential care and transition support",
      summary:
        "The support profile suggests the family should urgently explore residential aged care or transition support while confirming clinical and financial details.",
      urgencyLabel: "High priority",
      score,
      riskFlags,
      nextSteps: [
        "Book or review a My Aged Care assessment as soon as possible",
        "Create a shortlist of residential aged care homes near the preferred location",
        "Confirm immediate safety arrangements for the next 72 hours",
        "Prepare medical, legal and financial documents for applications",
      ],
      documents: [...baseDocuments, "Hospital discharge plan", "Aged care assessment outcome if already completed"],
      providerFilters: ["24/7 nursing", "Dementia support", "Respite availability", "Hospital discharge experience"],
      conversationPrompts: [
        "What level of risk are we comfortable managing at home?",
        "Who can make urgent decisions if circumstances change?",
        "Would a short respite placement help us compare options safely?",
      ],
    };
  }

  if (score >= 8) {
    return {
      pathway: "Residential care exploration with home support bridge",
      summary:
        "The person may be able to remain at home temporarily, but the family should begin comparing residential care options and arranging additional support.",
      urgencyLabel: "Plan now",
      score,
      riskFlags,
      nextSteps: [
        "Compare residential aged care and respite options in the preferred area",
        "Map what support is needed each morning, afternoon and overnight",
        "Check whether current home support is enough for the next 30 days",
        "Start a family decision meeting using the prompts below",
      ],
      documents: baseDocuments,
      providerFilters: ["Respite", "High care", "Memory support", "Close to family", "Transparent fees"],
      conversationPrompts: [
        "What would need to be true for staying at home to remain safe?",
        "Which location matters most for family visits?",
        "Are we planning for today only, or the next 6 to 12 months?",
      ],
    };
  }

  if (score >= 4) {
    return {
      pathway: "Home care package planning and monitoring",
      summary:
        "The current profile points toward structured home support, monitoring and a plan for escalation if needs increase.",
      urgencyLabel: "Moderate priority",
      score,
      riskFlags,
      nextSteps: [
        "List the practical tasks that are becoming difficult at home",
        "Explore home care services, domestic support and personal care options",
        "Set a family review date in 4 to 6 weeks",
        "Document triggers that would cause the family to reconsider residential care",
      ],
      documents: baseDocuments,
      providerFilters: ["Home care coordination", "Personal care", "Transport", "Meal support", "Medication prompting"],
      conversationPrompts: [
        "Which tasks are creating the most stress?",
        "Who notices changes first?",
        "What signs would tell us home care is no longer enough?",
      ],
    };
  }

  return {
    pathway: "Stay at home with light support",
    summary:
      "The person may be able to stay at home with light supports, routine monitoring and clear family check-ins.",
    urgencyLabel: "Low priority",
    score,
    riskFlags: riskFlags.length ? riskFlags : ["No major risk flags from the current answers"],
    nextSteps: [
      "Set up a simple weekly check-in routine",
      "Review home safety, meals, transport and medication routines",
      "Keep key medical and legal documents in one shared place",
      "Reassess if mobility, memory or carer stress changes",
    ],
    documents: baseDocuments,
    providerFilters: ["Social support", "Domestic assistance", "Transport", "Meal services"],
    conversationPrompts: [
      "What help would make daily life easier without feeling intrusive?",
      "Who should be contacted if something changes?",
      "How often should the family review the situation?",
    ],
  };
}

export const demoAnswers: AssessmentAnswers = {
  relationship: "Parent",
  location: "Sydney NSW",
  urgency: "medium",
  livingSituation: "alone",
  mobility: "medium",
  cognition: "medium",
  medicalComplexity: "medium",
  familyCapacity: "medium",
  homeCarePreference: "unsure",
  budgetSensitivity: "medium",
};
