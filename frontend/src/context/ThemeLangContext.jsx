import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeLangContext = createContext();

const translations = {
  en: {
    appTitle: "ArogyaMitra AI",
    login: "Login",
    signup: "Sign Up",
    username: "Username",
    password: "Password",
    home: "Home",
    healthGuidance: "Health Guidance",
    schemes: "Gov Schemes",
    centers: "Nearby Centers",
    voicePrompt: "Tap mic to speak",
    listening: "Listening...",
    logout: "Logout",
    healthGuidanceDesc: "Ask AI about your symptoms and get guidance.",
    schemesDesc: "Explore government health schemes for your family.",
    centersDesc: "Find nearby healthcare centers and hospitals.",
  },
  hi: {
    appTitle: "आरोग्यमित्र एआई",
    login: "लॉग इन",
    signup: "साइन अप",
    username: "उपयोगकर्ता नाम",
    password: "पासवर्ड",
    home: "होम",
    healthGuidance: "स्वास्थ्य मार्गदर्शन",
    schemes: "सरकारी योजनाएं",
    centers: "निकटतम केंद्र",
    voicePrompt: "बोलने के लिए माइक दबाएं",
    listening: "सुन रहा हूँ...",
    logout: "लॉग आउट",
    healthGuidanceDesc: "अपने लक्षणों के बारे में AI से पूछें और मार्गदर्शन प्राप्त करें।",
    schemesDesc: "अपने परिवार के लिए सरकारी स्वास्थ्य योजनाओं का अन्वेषण करें।",
    centersDesc: "आस-पास के स्वास्थ्य सेवा केंद्र और अस्पताल खोजें।",
  },
  te: {
    appTitle: "ఆరోగ్యమిత్ర ఏఐ",
    login: "లాగిన్",
    signup: "సైన్ అప్",
    username: "యూజర్ పేరు",
    password: "పాస్వర్డ్",
    home: "హోమ్",
    healthGuidance: "ఆరోగ్య మార్గదర్శకత్వం",
    schemes: "ప్రభుత్వ పథకాలు",
    centers: "సమీప కేంద్రాలు",
    voicePrompt: "మాట్లాడటానికి మైక్ నొక్కండి",
    listening: "వింటున్నాను...",
    logout: "లాగ్ అవుట్",
    healthGuidanceDesc: "మీ లక్షణాల గురించి AI ని అడగండి మరియు మార్గదర్శకత్వం పొందండి.",
    schemesDesc: "మీ కుటుంబం కోసం ప్రభుత్వ ఆరోగ్య పథకాలను అన్వేషించండి.",
    centersDesc: "సమీప ఆరోగ్య కేంద్రాలు మరియు ఆసుపత్రులను కనుగొనండి.",
  }
};

export const ThemeLangProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const t = (key) => {
    return translations[lang][key] || key;
  };

  return (
    <ThemeLangContext.Provider value={{ theme, toggleTheme, lang, setLang, t }}>
      {children}
    </ThemeLangContext.Provider>
  );
};

export const useApp = () => useContext(ThemeLangContext);
