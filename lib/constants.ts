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
    paymentLink: "https://buy.stripe.com/test_3cs8AbeUzgXW2Zy5kq",
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1R2vIxSGsETocz7Jw81CGRik"
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
    paymentLink: "https://buy.stripe.com/test_4gwdUv13J37657G6ov",
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1R2vLYSGsETocz7J3irTa9FF"
        : "",
  },
];

export const ORIGIN_URL =
  process.env.NODE_ENV === "development"
    ? "https://motiontext.vercel.app"
    : "https://motiontext.vercel.app";
