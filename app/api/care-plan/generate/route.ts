export const runtime = "nodejs";

type AssessmentPayload = {
  profile?: {
    careName?: string;
    assessorRole?: string;
    recipientAddress?: string;
    familyAddress?: string;
  };
  answers?: Record<string, unknown>;
};

type ProviderMatch = {
  id: number;
  name: string;
  location: string;
  rating: string;
  match: number;
  price: string;
  tags: string[];
  reason: string;
  scores: {
    proximity: number;
    care: number;
    reviews: number;
    budget: number;
  };
  weeklyEstimate: number;
};

const providerCatalogue: ProviderMatch[] = [
  {
    id: 1,
    name: "Eastern Suburbs HammondCare Home Care",
    location: "Bondi Junction, NSW",
    rating: "4.7 (89)",
    match: 91,
    price: "Package-funded / moderate out-of-pocket",
    tags: ["Home care", "Clinical support", "Dementia care"],
    reason: "Strong fit for home-based support, clinical oversight, and proximity to family.",
    scores: { proximity: 92, care: 96, reviews: 88, budget: 94 },
    weeklyEstimate: 860,
  },
  {
    id: 2,
    name: "Uniting Waverley Home Support",
    location: "Waverley, NSW",
    rating: "4.4 (74)",
    match: 84,
    price: "$260–$440/week",
    tags: ["Home care", "Transport", "Respite"],
    reason: "Good balance of home support, transport assistance, and likely cost fit.",
    scores: { proximity: 82, care: 91, reviews: 78, budget: 88 },
    weeklyEstimate: 720,
  },
  {
    id: 3,
    name: "BaptistCare At Home Eastern Sydney",
    location: "Randwick, NSW",
    rating: "4.6 (121)",
    match: 78,
    price: "$300–$520/week",
    tags: ["Nursing", "Meal support", "Personal care"],
    reason: "Strong clinical support, useful if nursing or personal care needs increase.",
    scores: { proximity: 68, care: 89, reviews: 90, budget: 76 },
    weeklyEstimate: 790,
  },
  {
    id: 4,
    name: "Transition Care Coordination Service",
    location: "Sydney Metro, NSW",
    rating: "4.3 (51)",
    match: 73,
    price: "Short-term / case-managed",
    tags: ["Urgent discharge", "Transition care", "Coordination"],
    reason: "Useful where hospital discharge or short-term stabilisation is the immediate priority.",
    scores: { proximity: 74, care: 86, reviews: 73, budget: 70 },
    weeklyEstimate: 940,
  },
];

const officialSources = [
  {
    title: "My Aged Care — Apply for an assessment",
    url: "https://www.myagedcare.gov.au/assessment/apply-online",
    relevance: "Assessment and My Aged Care registration pathway",
  },
  {
    title: "My Aged Care — Find a provider",
    url: "https://www.myagedcare.gov.au/find-a-provider",
    relevance: "Provider comparison and service search",
  },
  {
    title: "Department of Health and Aged Care — Support at Home",
    url: "https://www.health.gov.au/our-work/support-at-home",
    relevance: "Home care funding and reform context",
  },
];

function valueToText(value: unknown): string {
  if (Array.isArray(value)) return value.join(" ");
  if (value && typeof value === "object") return Object.values(value as Record<string, unknown>).map(valueToText).join(" ");
  return String(value ?? "");
}

function answerBlob(payload: AssessmentPayload) {
  return Object.values(payload.answers || {}).map(valueToText).join(" ").toLowerCase();
}

function intakeAgent(payload: AssessmentPayload) {
  const answers = payload.answers || {};
  const location = typeof answers[1] === "object" && answers[1] ? answers[1] as Record<string, string> : {};
  return {
    careName: payload.profile?.careName || valueToText(answers[0]) || "Margaret",
    assessorRole: payload.profile?.assessorRole || valueToText(answers[2]) || "Daughter",
    recipientAddress: payload.profile?.recipientAddress || location.recipient || "Bondi Junction, NSW",
    familyAddress: payload.profile?.familyAddress || location.family || "Sydney, NSW",
    signals: answerBlob(payload),
  };
}

function pathwayAgent(profile: ReturnType<typeof intakeAgent>) {
  const text = profile.signals;
  const urgent = /hospital|discharge|72 hours|this week|urgent|fall/.test(text);
  const residential = /residential|wheelchair|bed-bound|overnight|wandering|dementia|family can no longer manage|exhausted/.test(text);
  const respite = /respite|short-term/.test(text);
  const home = /home care|keep them at home|cleaning|meals|transport|medication|personal care/.test(text);

  if (urgent) {
    return {
      recommendedPathway: "Urgent discharge and transition care planning",
      pathwayType: "urgent_discharge",
      stage: "Hospital Discharge Planning",
      confidence: residential ? 82 : 78,
      recommendation: "Urgent interim support first, then a longer-term home care or residential decision.",
      watchArea: "Long-term care setting once the immediate discharge risk is managed",
    };
  }

  if (residential && !home) {
    return {
      recommendedPathway: "Residential aged care planning",
      pathwayType: "residential_care",
      stage: "Residential Placement Planning",
      confidence: 84,
      recommendation: "Residential aged care planning, with respite or home support as an interim bridge.",
      watchArea: "Accommodation costs, availability, and family agreement",
    };
  }

  if (respite) {
    return {
      recommendedPathway: "Short-term respite with home care planning",
      pathwayType: "respite_bridge",
      stage: "Respite and Home Support Planning",
      confidence: 81,
      recommendation: "Short-term respite can provide immediate relief while the family confirms the longer-term home care pathway.",
      watchArea: "Whether care needs reduce or increase after respite",
    };
  }

  return {
    recommendedPathway: "Home care services",
    pathwayType: "home_support",
    stage: "Home Care Assessment",
    confidence: 87,
    recommendation: "Home care services now, with residential planning on watch.",
    watchArea: "Future residential need if mobility, cognition, or family capacity changes",
  };
}

function actionAgent(pathway: ReturnType<typeof pathwayAgent>, profile: ReturnType<typeof intakeAgent>) {
  if (pathway.pathwayType === "urgent_discharge") {
    return [
      "Speak to the hospital discharge planner today",
      "Request or confirm urgent ACAT assessment status",
      "Arrange short-term transition or respite support",
      "Share the discharge plan with family members",
      "Compare home support and residential options once stable",
      "Confirm medication, mobility, and transport needs",
      "Book first provider call or tour",
    ];
  }

  if (pathway.pathwayType === "residential_care") {
    return [
      "Confirm My Aged Care and ACAT residential approval status",
      "Prepare financial and accommodation cost questions",
      "Shortlist 3–5 residential aged care homes near family",
      "Book tours with preferred homes",
      "Share comparison notes with family members",
      "Confirm respite bridge options if timing is urgent",
      "Choose preferred provider and next admission steps",
    ];
  }

  return [
    "Register or confirm status with My Aged Care",
    "Book or review ACAT assessment",
    "Compare recommended home care providers near " + profile.recipientAddress,
    "Share plan with family members",
    "Shortlist 2–3 preferred services",
    "Book first provider call or care consultation",
    "Upload medical and medication summary",
  ];
}

function providerAgent(pathway: ReturnType<typeof pathwayAgent>, profile: ReturnType<typeof intakeAgent>) {
  const text = profile.signals;
  return providerCatalogue
    .map((provider) => {
      let score = provider.match;
      if (pathway.pathwayType === "urgent_discharge" && provider.tags.some((tag) => /urgent|transition/i.test(tag))) score += 16;
      if (pathway.pathwayType === "home_support" && provider.tags.some((tag) => /home care/i.test(tag))) score += 6;
      if (/dementia|memory|confusion/.test(text) && provider.tags.some((tag) => /dementia|clinical/i.test(tag))) score += 7;
      if (/transport/.test(text) && provider.tags.some((tag) => /transport/i.test(tag))) score += 5;
      if (/nursing|wound|medication/.test(text) && provider.tags.some((tag) => /clinical|nursing/i.test(tag))) score += 5;
      if (/budget|cost|manageable/.test(text)) score += Math.round(provider.scores.budget / 20);

      return {
        ...provider,
        match: Math.min(97, score),
        reason: `${provider.reason} Matched against ${pathway.recommendedPathway.toLowerCase()} and ${profile.careName}'s assessment answers.`,
      };
    })
    .sort((a, b) => b.match - a.match)
    .slice(0, 3);
}

function costAgent(pathway: ReturnType<typeof pathwayAgent>, matches: ProviderMatch[]) {
  const weeklyBase = Math.round(matches.reduce((sum, provider) => sum + provider.weeklyEstimate, 0) / Math.max(matches.length, 1));
  const multiplier = pathway.pathwayType === "urgent_discharge" ? 1.25 : pathway.pathwayType === "residential_care" ? 1.9 : 1;
  const weeklyEstimate = Math.round(weeklyBase * multiplier);
  const governmentWeekly = Math.round(weeklyEstimate * (pathway.pathwayType === "residential_care" ? 0.52 : 0.72));
  const outOfPocketWeekly = weeklyEstimate - governmentWeekly;

  return {
    fundingMode: pathway.pathwayType === "residential_care" ? "mixed residential funding" : "public/package-funded with possible co-contribution",
    weeklyEstimate,
    annualEstimate: weeklyEstimate * 52,
    governmentWeekly,
    outOfPocketWeekly,
    assumptions: [
      "Indicative planning estimate only",
      "Final costs depend on assessment outcome, provider fees, support hours, and supplements",
      "Public funding eligibility should be confirmed through My Aged Care and the provider",
    ],
  };
}

function buildLocalPlan(payload: AssessmentPayload) {
  const profile = intakeAgent(payload);
  const pathway = pathwayAgent(profile);
  const actionItems = actionAgent(pathway, profile);
  const matchedProviders = providerAgent(pathway, profile);
  const costEstimate = costAgent(pathway, matchedProviders);

  return {
    id: `care-plan-${Date.now()}`,
    generatedBy: "local-multi-agent-workflow",
    profile,
    ...pathway,
    currentStage: pathway.stage,
    actionItems,
    matchedProviders,
    costEstimate,
    summary: `${profile.careName} is currently best aligned to ${pathway.recommendedPathway.toLowerCase()}. ${pathway.recommendation}`,
    sources: officialSources,
  };
}

async function aiReviewAgent(plan: ReturnType<typeof buildLocalPlan>, payload: AssessmentPayload) {
  if (!process.env.OPENAI_API_KEY) return plan;

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
        input: [
          {
            role: "system",
            content: "You are reviewing an Australian aged-care guidance care plan. Return only valid JSON. Do not invent provider facts. Keep sources intact. Improve wording and add caveats, but preserve the same schema and all numeric fields unless there is a clear inconsistency.",
          },
          {
            role: "user",
            content: JSON.stringify({ draftPlan: plan, assessmentPayload: payload }),
          },
        ],
      }),
    });

    if (!response.ok) return plan;
    const data = await response.json();
    const text = data.output_text || data.output?.flatMap((item: any) => item.content || []).map((content: any) => content.text || "").join("\n");
    if (!text) return plan;
    const parsed = JSON.parse(text);
    return { ...plan, ...parsed, generatedBy: "openai-reviewed-multi-agent-workflow" };
  } catch {
    return plan;
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as AssessmentPayload;
    const localPlan = buildLocalPlan(payload);
    const plan = await aiReviewAgent(localPlan, payload);
    return Response.json({ carePlan: plan });
  } catch (error) {
    return Response.json(
      { error: "Unable to generate care plan", detail: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
