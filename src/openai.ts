import OpenAI from "openai";
const openai = new OpenAI({
  organization: "org-IDKiO11NYOtAcqBtTisZV2Kc",
  apiKey: process.env.OPENAI_API_KEY,
});

export default openai;
