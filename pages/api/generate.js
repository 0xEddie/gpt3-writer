import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const prompt1Prefix = 
`
Answer this prompt as Alan Watts, relating it to Buddhist or Taoist philosophy.
Prompt:
`;
const prompt2Prefix = 
`
Answer as Alan Watts. Give an example of a mistake to the below advice. Explain why people make this mistake. Explain how to not make this mistake.

Advice:
`;

const generateAction = async (req, res) => {
    // run first prompt
    const prompt1 = 
    `
    ${prompt1Prefix}
    ${req.body.userInput}
    `
    
    const completion1 = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${prompt1}`,
        temperature: 0.85,
        max_tokens: 250,
    });
    const prompt1Output = completion1.data.choices.pop();

    const prompt2 = `
${prompt2Prefix}
${prompt1Output.text}

Answer:
`;
    
    const completion2 = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: prompt2,
        temperature: 0.85,
        max_tokens: 400,
    });
    const prompt2Output = completion2.data.choices.pop();
    
    const finalOutput = { text:
`${prompt1Output.text}

${prompt2Output.text}
`.trim()
     };
    res.status(200).json({ output: finalOutput });
};

export default generateAction;