// OpenApiUtill.js
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "sk-proj-1aXEx816H7ZmZbZQv6PpT3BlbkFJDvOpDCe9zriyPOeTkkn6",
  dangerouslyAllowBrowser: true,
});

export const OpenAiUtill = {
  //>?
  async prompt(msg) {
    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: msg }],
        model: "gpt-3.5-turbo",
        // model:"gpt-4o",
      });

      console.log(completion.choices[0]);
      return completion.choices[0];
    } catch (error) {
      console.log("OpenAi API 실행중 오류 발생 : " + error);
      throw error;
    }
  },
};
