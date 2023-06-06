import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

(async () => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  let completion;
  const completion_obj = {};

  for (let temperature of [0, 0.5, 1, 1.5, 2]) {
    completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: 'Tell me a story',
      max_tokens: 75,
      temperature: temperature,
    });

    completion_obj[`temperature ${temperature}`] =
      completion.data.choices[0].text;
  }

  prettyPrint(completion_obj);
})();

const prettyPrint = (obj) => {
  for (let key in obj) {
    console.log(`${key}:`);
    console.log(`${obj[key]}`);
  }
};
