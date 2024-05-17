import OpenAI from "openai";



export const apiCall = async function (prompt) {
  const openai = new OpenAI(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY);
  try {
    const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: prompt,
          },
        ],
        model: "gpt-3.5-turbo",
      });
    
      console.log(completion.choices[0]);
    const responseText = completion.choices[0].message.content;
    return responseText ? responseText.text() : "there was an error";
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return "there was an error";
  }
}


