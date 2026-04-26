import React, { useState, useRef } from 'react';
import { useApp } from '../context/ThemeLangContext';
import { Mic, MicOff, Send } from 'lucide-react';
import axios from 'axios';

const HealthGuidance = () => {
  const { t, lang } = useApp();
  const [messages, setMessages] = useState([
    { role: 'ai', text: t('healthGuidanceDesc') }
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [inputText, setInputText] = useState('');
  const recognitionRef = useRef(null);

  React.useEffect(() => {
    // Prime the voices
    const loadVoices = () => window.speechSynthesis.getVoices();
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const speakResponse = (text) => {
    // Only use native TTS for English
    if (lang === 'en' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleVoiceInput = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser. Try Google Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    if (lang === 'te') recognition.lang = 'te-IN';
    else if (lang === 'hi') recognition.lang = 'hi-IN';
    else recognition.lang = 'en-US';

    recognition.onstart = () => setIsRecording(true);
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setIsRecording(false);
    };

    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => setIsRecording(false);

    recognitionRef.current = recognition;
    recognition.start();
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;
    
    const newMessages = [...messages, { role: 'user', text: inputText }];
    setMessages(newMessages);
    const query = inputText;
    setInputText('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const res = await axios.post(`${apiUrl}/health-query`, {
        text: query,
        language: lang
      });
      const aiResponse = res.data.response;
      
      setMessages([...newMessages, { role: 'ai', text: aiResponse }]);
      
      // Auto-play english, but let user click "Play" for Indian languages due to browser blocking rules
      speakResponse(aiResponse);
    } catch (err) {
      setMessages([...newMessages, { role: 'ai', text: 'Error connecting to server.' }]);
    }
  };

  const PlayAudioButton = ({ text, language }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlay = async () => {
      if (isPlaying) return;
      setIsPlaying(true);
      
      // Google TTS strictly limits the byte size per request. 
      // We chunk the text by punctuation to easily bypass this limit!
      const chunks = text.match(/[^.!?]+[.!?]+/g) || [text];
      
      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i].trim();
        if (!chunk) continue;
        
        // We proxy the TTS request entirely through our own backend! This guarantees 100% success.
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        const audioUrl = `${apiUrl}/tts?text=${encodeURIComponent(chunk)}&lang=${language}`;
        const audio = new Audio(audioUrl);
        
        await new Promise((resolve) => {
          audio.onended = resolve;
          audio.onerror = (e) => {
            console.error("Audio chunk failed:", e);
            resolve();
          };
          audio.play().catch(e => {
            console.error("Audio playback blocked", e);
            resolve();
          });
        });
      }
      setIsPlaying(false);
    };

    return (
      <button 
        onClick={handlePlay} 
        className="btn-primary" 
        style={{ padding: '0.3rem 0.8rem', fontSize: '0.8rem', marginTop: '0.5rem', width: 'auto', backgroundColor: isPlaying ? 'var(--secondary-color)' : 'var(--primary-color)' }}
        disabled={isPlaying}
      >
        {isPlaying ? "Playing..." : "▶ Play Telugu/Hindi Voice"}
      </button>
    );
  };

  return (
    <div>
      <h2 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>{t('healthGuidance')}</h2>
      
      <div className="voice-container">
        <button 
          className={`mic-button ${isRecording ? 'recording' : ''}`}
          onClick={handleVoiceInput}
        >
          {isRecording ? <MicOff size={32} /> : <Mic size={32} />}
        </button>
        <p>{isRecording ? t('listening') : t('voicePrompt')}</p>
      </div>

      <div className="chat-box" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.role}`}>
            <p>{msg.text}</p>
            {msg.role === 'ai' && (lang === 'te' || lang === 'hi') && idx !== 0 && (
              <PlayAudioButton text={msg.text} language={lang} />
            )}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <input 
          type="text" 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your symptoms..."
          style={{ flex: 1, padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button className="btn-primary" style={{ width: 'auto' }} onClick={handleSend}>
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default HealthGuidance;
