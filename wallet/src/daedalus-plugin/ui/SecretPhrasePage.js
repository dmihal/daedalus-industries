import React, { useState, useEffect } from 'react';
import hdkey from 'ethereumjs-wallet/hdkey';
const bip39 = require('bip39');

const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

const SecretPhrasePage = ({ plugin, burnerComponents, actions }) => {
  const { Button, Page } = burnerComponents;
  const [status, setStatus] = useState(null);
  const [listening, setListening] = useState(false);
  const [recognizer, setRecognizer] = useState(null);
  const [phrase, setPhrase] = useState('');

  const tryClue = async () => {
    const hdwallet = hdkey.fromMasterSeed(await bip39.mnemonicToSeed(phrase.trim()));
    const path = "m/44'/60'/0'/0/0";
    const wallet = hdwallet.derivePath(path).getWallet();
    const success = await plugin.discoverClue(wallet.getPrivateKeyString());
    setStatus(success ? 'success' : 'invalid');
    success && setPhrase('');
  }

  useEffect(() => {
    if (SpeechRecognition) {
      const _recognizer = new SpeechRecognition();
      _recognizer.interimResults = true;
      _recognizer.continuous = true;

      _recognizer.startListening = () => {
        _recognizer.start();
        setListening(true);
      };

      _recognizer.stopListening = () => {
        _recognizer.stop();
        setListening(false);
      };

      _recognizer.onresult = (event) => {
        const phrase = Array.from(event.results)
          .filter(r => r.isFinal)
          .map(r => r[0].transcript)
          .join(' ');
        setPhrase(phrase);
      };

      _recognizer.onend = () => setListening(false);

      setRecognizer(_recognizer);
    }
  }, []);

  if (status === 'success') {
    return (
      <Page title="Secret Phrase">
        <div>Clue discovered!</div>
        <Button onClick={() => actions.navigateTo('/')}>Continue</Button>
      </Page>
    );
  }

  return (
    <Page title="Secret Phrase">
      <div style={{ display: 'flex' }}>
        <textarea value={phrase} onChange={e => setPhrase(e.target.value.toLowerCase())} style={{width:'100%'}} />
        {recognizer && (
          <div onClick={() => listening ? recognizer.stopListening() : recognizer.startListening()}>
            {listening ? 'Stop' : 'Microphone'}
          </div>
        )}
      </div>
      <Button onClick={tryClue}>Discover</Button>
      {status === 'invalid' && (
        <div>Invalid seed phrase</div>
      )}
    </Page>
  )
};

export default SecretPhrasePage;
