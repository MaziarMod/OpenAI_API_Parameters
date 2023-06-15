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

  for (let presence_penalty of [-2, -1, 0, 1, 2]) {
    completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: 'The first 15 elements are Hydrogen, Helium, ',
      max_tokens: 200,
      presence_penalty: presence_penalty,
    });

    completion_obj[`Presence Penalty ${presence_penalty}`] =
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
