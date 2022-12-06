import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };
  
  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const callGenerateEndpoint = async() => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...");
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });
    const data = await response.json();
    console.log("data:", data);
    const { output } = data;
    console.log("output:", output)
    console.log("output.text:", output.text)
    console.log("OpenAI replied...", output);
  
    setApiOutput(output.text);
    setIsGenerating(false);
  };
  return (
    <div className="root">
      <Head>
        <title>Alan Watts Bot</title>
      </Head>

      <div className="container">

        <div className="header">
          <div className="header-title funked">
            <h1>Ask Alan Watts anything!</h1>
          </div>
          <div className="header-subtitle">
            <h2>Alan Watts bot knows a lot about Buddhism and Eastern philosophy. Do you have any questions for him?</h2>
          </div>
        </div>
        
        <div className='prompt-container'>
          <textarea rows={1}
            className='prompt-box' 
            placeholder='Ask Alan Watts bot for advice!' 
            value={userInput}
            onChange={onUserChangedText}
          />;

          <div className='prompt-buttons'>
            <a
              className={isGenerating ? 'generate-button loading' : 'generate-button'} 
              onClick={callGenerateEndpoint}
            >
              <div className='generate'>
                {isGenerating ? <span className='loader'></span> : <p>Generate</p>}
              </div>
            </a>
          </div>
          
          { apiOutput && (
            <div className='output'>
              <div className='output-header-container'>
                <div className='output-header funked'>
                  <h3>Alan says:</h3>
                </div>
              </div>
              <div className='output-content'>
                <p>{apiOutput}</p>
              </div>
            </div>
          )}

        </div>
      
      </div>

      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>

    </div>
  );
};

export default Home;
