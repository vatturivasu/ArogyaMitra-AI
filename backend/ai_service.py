import time
from medical_kb import MEDICAL_KNOWLEDGE_BASE

def process_health_query(query: str, language: str) -> str:
    """
    RAG Pipeline Implementation:
    1. Retrieval: Matches user query against the medical knowledge base keywords.
    2. Generation: Formats and returns the most relevant translated health document.
    """
    query_lower = query.lower()
    
    # Simple Keyword Overlap Scoring (Simulated Embeddings/Vector Search)
    best_match = None
    max_score = 0
    
    for doc in MEDICAL_KNOWLEDGE_BASE:
        score = sum(1 for kw in doc["keywords"] if kw.lower() in query_lower)
        if score > max_score:
            max_score = score
            best_match = doc

    if best_match and max_score > 0:
        # Return the retrieved and formatted knowledge in the requested language
        if language == "te":
            return best_match["te"]
        elif language == "hi":
            return best_match["hi"]
        return best_match["en"]

    # Fallback if no specific medical document matches
    fallback_en = "Please describe your symptoms more clearly. For instance, you can ask about fever, cough, stomach ache, or dengue."
    fallback_te = "దయచేసి మీ లక్షణాలను మరింత స్పష్టంగా వివరించండి. ఉదాహరణకు, మీరు జ్వరం, దగ్గు, కడుపు నొప్పి లేదా డెంగ్యూ గురించి అడగవచ్చు."
    fallback_hi = "कृपया अपने लक्षणों का अधिक स्पष्ट रूप से वर्णन करें। उदाहरण के लिए, आप बुखार, खांसी, पेट दर्द या डेंगू के बारे में पूछ सकते हैं।"
    
    if language == "te":
        return fallback_te
    elif language == "hi":
        return fallback_hi
    return fallback_en
