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

  for (let top_p of [0, 0.5, 1]) {
    completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: 'My favorite food is',
      max_tokens: 75,
      top_p: top_p,
    });

    completion_obj[`Top P ${top_p}`] = completion.data.choices[0].text;
  }

  prettyPrint(completion_obj);
})();

const prettyPrint = (obj) => {
  for (let key in obj) {
    console.log(`${key}:`);
    console.log(`${obj[key]}`);
  }
};
