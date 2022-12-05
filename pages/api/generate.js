import { Configuration, OpenAIApi } from "openai";
console.log(process.env.OPENAI_API_KEY)
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateAction = async (req, res) => {
    const basePromptPrefix = "tesT==============";
    // run first prompt
    console.log(`API: ${basePromptPrefix}${req.body.userInput}`);
    
    const baseCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${basePromptPrefix}${req.body.userInput}`,
        temperature: 0.75,
        max_tokens: 250,
    });
    
    const basePromptOutput = baseCompletion.data.choices.pop();
    res.status(200).json({ output: basePromptOutput });
};

export default generateAction;