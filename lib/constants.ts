export const plansMap = [
  {
    id: "basic",
    name: "Creators",
    description: "Get started with Motion Text Creators!",
    price: "9",
    items: [
      "5 Blog Posts",
      "5 Transcription",
      "Advanced Blog Content",
      "Basic Support",
    ],
    paymentLink: "https://buy.stripe.com/test_3cs7w74fVePO1Vu5kp",
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1R1rZYSGsETocz7J4Px2oJBn"
        : "",
  },
  {
    id: "pro",
    name: "Premium",
    description: "Motion Text Premium - Truly Unlimited!",
    price: "39",
    items: [
      "Unlimited Blog Posts",
      "Unlimited Transcriptions",
      "Premium Blog Content",
      "Dedicated Support",
    ],
    paymentLink: "https://buy.stripe.com/test_dR617JbIncHG0Rq3cg",
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1R1ra1SGsETocz7JW40BLuht"
        : "",
  },
];

export const ORIGIN_URL =
  process.env.NODE_ENV === "development"
    ? "https://motiontext.vercel.app"
    : "https://motiontext.vercel.app";
