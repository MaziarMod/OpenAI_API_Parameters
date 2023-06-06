import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

(async () => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: 'Tell me a story',
    max_tokens: 200,
    temperature: 2,
  });

  const completion_text = completion.data.choices[0].text;
  console.log(completion_text);
})();
