import React, { useState } from 'react';
import { useApp } from '../context/ThemeLangContext';

const Schemes = () => {
  const { t, lang } = useApp();
  const [formData, setFormData] = useState({ age: '', income: '', occupation: '' });
  const [filteredSchemes, setFilteredSchemes] = useState(null);

  // Hardcoded rich dataset of schemes with translations
  const allSchemes = [
    {
      id: 1,
      translations: {
        en: { name: "Ayushman Bharat (PM-JAY)", eligibility: "Low income families, SC/ST, Landless workers", benefits: "Health cover of Rs. 5 lakhs per family per year." },
        hi: { name: "आयुष्मान भारत (PM-JAY)", eligibility: "कम आय वाले परिवार, अनुसूचित जाति/जनजाति, भूमिहीन श्रमिक", benefits: "प्रति परिवार प्रति वर्ष 5 लाख रुपये का स्वास्थ्य कवर।" },
        te: { name: "ఆయుష్మాన్ భారత్ (PM-JAY)", eligibility: "తక్కువ ఆదాయ కుటుంబాలు, SC/ST, భూమిలేని కార్మికులు", benefits: "కుటుంబానికి సంవత్సరానికి రూ. 5 లక్షల ఆరోగ్య బీమా." }
      },
      maxIncome: 100000
    },
    {
      id: 2,
      translations: {
        en: { name: "Janani Suraksha Yojana", eligibility: "Pregnant women in BPL households", benefits: "Cash assistance for institutional delivery." },
        hi: { name: "जननी सुरक्षा योजना", eligibility: "बीपीएल परिवारों में गर्भवती महिलाएं", benefits: "संस्थागत प्रसव के लिए नकद सहायता।" },
        te: { name: "జననీ సురక్ష యోజన", eligibility: "బిపిఎల్ కుటుంబాలలో గర్భిణీ స్త్రీలు", benefits: "సంస్థాగత ప్రసవం కోసం నగదు సహాయం." }
      },
      occupation: "any"
    },
    {
      id: 3,
      translations: {
        en: { name: "Rashtriya Bal Swasthya Karyakram (RBSK)", eligibility: "Children from 0-18 years of age", benefits: "Early detection and free management of 30 health conditions." },
        hi: { name: "राष्ट्रीय बाल स्वास्थ्य कार्यक्रम (RBSK)", eligibility: "0-18 वर्ष की आयु के बच्चे", benefits: "30 स्वास्थ्य स्थितियों का शीघ्र पता लगाना और मुफ्त प्रबंधन।" },
        te: { name: "రాష్ట్రీయ బాల స్వాస్థ్య కార్యక్రమం (RBSK)", eligibility: "0-18 సంవత్సరాల వయస్సు గల పిల్లలు", benefits: "30 ఆరోగ్య పరిస్థితుల ముందస్తు గుర్తింపు మరియు ఉచిత నిర్వహణ." }
      },
      maxAge: 18
    },
    {
      id: 4,
      translations: {
        en: { name: "PM Kisan Samman Nidhi", eligibility: "Small and marginal farmers", benefits: "Rs 6,000 per year." },
        hi: { name: "पीएम किसान सम्मान निधि", eligibility: "छोटे और सीमांत किसान", benefits: "6,000 रुपये प्रति वर्ष।" },
        te: { name: "పీఎం కిసాన్ సమ్మాన్ నిధి", eligibility: "చిన్న మరియు సన్నకారు రైతులు", benefits: "సంవత్సరానికి రూ. 6,000." }
      },
      occupation: "farmer"
    },
    {
      id: 5,
      translations: {
        en: { name: "Senior Citizen Health Insurance", eligibility: "Senior citizens above 60 years", benefits: "Additional top-up cover for seniors." },
        hi: { name: "वरिष्ठ नागरिक स्वास्थ्य बीमा", eligibility: "60 वर्ष से अधिक के वरिष्ठ नागरिक", benefits: "वरिष्ठ नागरिकों के लिए अतिरिक्त टॉप-अप कवर।" },
        te: { name: "సీనియర్ సిటిజన్ హెల్త్ ఇన్సూరెన్స్", eligibility: "60 సంవత్సరాలకు పైబడిన సీనియర్ సిటిజన్లు", benefits: "సీనియర్లకు అదనపు టాప్-అప్ కవర్." }
      },
      minAge: 60
    },
    {
      id: 6,
      translations: {
        en: { name: "Arogya Lakshmi", eligibility: "Pregnant and lactating women, low income", benefits: "Nutritious meals provided at Anganwadi centers" },
        hi: { name: "आरोग्य लक्ष्मी", eligibility: "गर्भवती और स्तनपान कराने वाली महिलाएं, कम आय", benefits: "आंगनवाड़ी केंद्रों पर पौष्टिक भोजन प्रदान किया जाता है" },
        te: { name: "ఆరోగ్య లక్ష్మి", eligibility: "గర్భిణీ మరియు పాలిచ్చే తల్లులు, తక్కువ ఆదాయం", benefits: "అంగన్‌వాడీ కేంద్రాలలో పోషకమైన భోజనం అందించబడుతుంది" }
      },
      maxIncome: 150000
    },
    {
      id: 7,
      translations: {
        en: { name: "YSR Arogyasri (Andhra Pradesh)", eligibility: "Low income families (BPL card holders)", benefits: "Free healthcare access for major surgeries and treatments." },
        hi: { name: "वाईएसआर आरोग्यश्री (आंध्र प्रदेश)", eligibility: "कम आय वाले परिवार (बीपीएल कार्ड धारक)", benefits: "प्रमुख सर्जरी और उपचार के लिए मुफ्त स्वास्थ्य सेवा तक पहुंच।" },
        te: { name: "వైఎస్సార్ ఆరోగ్యశ్రీ (ఆంధ్ర ప్రదేశ్)", eligibility: "తక్కువ ఆదాయ కుటుంబాలు (BPL కార్డు దారులు)", benefits: "పెద్ద శస్త్రచికిత్సలు మరియు చికిత్సలకు ఉచిత ఆరోగ్య సేవలు." }
      },
      maxIncome: 500000
    }
  ];

  const handleFilter = (e) => {
    e.preventDefault();
    const age = parseInt(formData.age);
    const income = parseInt(formData.income);
    const occ = formData.occupation.toLowerCase();

    const matches = allSchemes.filter(scheme => {
      let isMatch = true;
      if (scheme.maxAge && age > scheme.maxAge) isMatch = false;
      if (scheme.minAge && age < scheme.minAge) isMatch = false;
      if (scheme.maxIncome && income > scheme.maxIncome) isMatch = false;
      if (scheme.occupation && scheme.occupation !== 'any' && scheme.occupation !== occ) isMatch = false;
      return isMatch;
    });

    setFilteredSchemes(matches);
  };

  const uiText = {
    en: { find: "Find Eligible Schemes", age: "Age", income: "Annual Income (₹)", occ: "Occupation", btn: "Check Eligibility", results: "Matching Schemes", noResults: "No specific schemes found matching these criteria.", select: "Select...", farmer: "Farmer", laborer: "Daily Wage Laborer", student: "Student", other: "Other / Unemployed", hint: "Enter your details above to see the government schemes you are eligible for." },
    hi: { find: "योग्य योजनाएं खोजें", age: "आयु", income: "वार्षिक आय (₹)", occ: "व्यवसाय", btn: "पात्रता जांचें", results: "मिलान योजनाएं", noResults: "इन मानदंडों से मेल खाने वाली कोई विशिष्ट योजना नहीं मिली।", select: "चुनें...", farmer: "किसान", laborer: "दैनिक वेतन भोगी मजदूर", student: "छात्र", other: "अन्य / बेरोजगार", hint: "पात्र सरकारी योजनाएं देखने के लिए अपना विवरण दर्ज करें।" },
    te: { find: "అర్హత ఉన్న పథకాలను కనుగొనండి", age: "వయస్సు", income: "వార్షిక ఆదాయం (₹)", occ: "వృత్తి", btn: "అర్హతను తనిఖీ చేయండి", results: "సరిపోలే పథకాలు", noResults: "ఈ ప్రమాణాలకు సరిపోలే నిర్దిష్ట పథకాలు కనుగొనబడలేదు.", select: "ఎంచుకోండి...", farmer: "రైతు", laborer: "రోజువారీ కూలీ", student: "విద్యార్థి", other: "ఇతర / నిరుద్యోగులు", hint: "మీరు అర్హత ఉన్న ప్రభుత్వ పథకాలను చూడటానికి మీ వివరాలను పైన నమోదు చేయండి." }
  };

  const currentUI = uiText[lang] || uiText.en;

  return (
    <div>
      <h2 style={{ color: 'var(--primary-color)', marginBottom: '1.5rem' }}>{t('schemes')}</h2>

      <div className="auth-container" style={{ margin: '0 0 2rem 0', maxWidth: '100%', padding: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--secondary-color)' }}>{currentUI.find}</h3>
        <form onSubmit={handleFilter} style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>{currentUI.age}</label>
            <input
              type="number"
              required
              value={formData.age}
              onChange={e => setFormData({ ...formData, age: e.target.value })}
              style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }}
              placeholder="e.g. 25"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>{currentUI.income}</label>
            <input
              type="number"
              required
              value={formData.income}
              onChange={e => setFormData({ ...formData, income: e.target.value })}
              style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }}
              placeholder="e.g. 50000"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>{currentUI.occ}</label>
            <select
              required
              value={formData.occupation}
              onChange={e => setFormData({ ...formData, occupation: e.target.value })}
              style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }}
            >
              <option value="">{currentUI.select}</option>
              <option value="farmer">{currentUI.farmer}</option>
              <option value="laborer">{currentUI.laborer}</option>
              <option value="student">{currentUI.student}</option>
              <option value="other">{currentUI.other}</option>
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button type="submit" className="btn-primary" style={{ height: '46px', width: '100%' }}>{currentUI.btn}</button>
          </div>
        </form>
      </div>

      {filteredSchemes && (
        <>
          <h3 style={{ marginBottom: '1rem', color: 'var(--primary-color)' }}>{currentUI.results} ({filteredSchemes.length})</h3>
          {filteredSchemes.length === 0 ? (
            <p style={{ padding: '1rem', backgroundColor: 'var(--card-bg)', borderRadius: '8px' }}>
              {currentUI.noResults}
            </p>
          ) : (
            filteredSchemes.map(scheme => {
              const trans = scheme.translations[lang] || scheme.translations.en;
              return (
                <div key={scheme.id} className="list-item">
                  <h3 style={{ color: 'var(--primary-color)' }}>{trans.name}</h3>
                  <p style={{ margin: '0.5rem 0' }}><strong>Eligibility:</strong> {trans.eligibility}</p>
                  <p><strong>Benefits:</strong> {trans.benefits}</p>
                </div>
              );
            })
          )}
        </>
      )}

      {!filteredSchemes && (
        <p style={{ opacity: 0.8 }}>{currentUI.hint}</p>
      )}
    </div>
  );
};

export default Schemes;
