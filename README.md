# ArogyaMitra AI

ArogyaMitra AI is a multilingual, voice-enabled healthcare assistant web application designed for tribal and rural communities.

## Architecture
- **Frontend**: React (Vite), Vanilla CSS (Tribal Theme), Context API
- **Backend**: FastAPI (Python), SQLite
- **AI Processing**: Simulated STT & RAG/LLM pipeline in `backend/ai_service.py`

## Folder Structure
```
ArogyaMitraAI/
│
├── backend/
│   ├── __pycache__/              → Compiled Python files (auto-generated)
│   ├── main.py                   → FastAPI app & API endpoints
│   ├── database.py               → Database connection (SQLAlchemy)
│   ├── models.py                 → Database tables (User, Schemes, Centers)
│   ├── schemas.py                → Pydantic schemas (data validation)
│   ├── ai_service.py             → AI logic (STT + RAG simulation)
│   ├── medical_kb.py             → Health knowledge base
│   ├── arogyamitra.db            → SQLite database file
│   ├── requirements.txt          → Backend dependencies
│
├── frontend/
│   ├── node_modules/             → Installed packages (auto-generated)
│   ├── public/                   → Static files
│   ├── src/
│   │   ├── assets/               → Images, icons
│   │   ├── components/           → Reusable UI components (Navbar, etc.)
│   │   ├── context/              → Global state (Theme, Language)
│   │   ├── pages/                → Application pages
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── HealthGuidance.jsx
│   │   │   ├── Schemes.jsx
│   │   │   ├── NearbyCenters.jsx
│   │   ├── App.jsx               → Routing configuration
│   │   ├── main.jsx              → Entry point
│   │   ├── App.css              → Component styles
│   │   ├── index.css            → Global styles (Tribal Theme)
│   │
│   ├── index.html               → Main HTML file
│   ├── package.json             → Project dependencies
│   ├── package-lock.json        → Dependency lock file
│   ├── vite.config.js           → Vite configuration
│   ├── eslint.config.js         → Linting configuration
│
├── README.md                    → Project documentation3. Frontend Implementation


## Setup Instructions

### 1. Backend Setup
1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```
   The backend will run at `http://localhost:8000`.

### 2. Frontend Setup
1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install Node modules:
   ```bash
   npm install
   ```
   *(Ensure you have installed react-router-dom, lucide-react, and axios)*
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open the provided local URL (usually `http://localhost:5173`) in your browser.

## Features Included
- **Voice Simulation**: Click the mic icon on the Health Guidance page to simulate voice input.
- **Multilingual UI**: Switch between English, Hindi, and Telugu using the dropdown in the navbar.
- **Tribal Theme**: The UI defaults to a light earthy theme, with a smooth Dark Mode toggle.
- **Authentication**: Sign up and log in using the mock JWT authentication.
- **Database**: SQLite automatically creates tables for Users, Schemes, and Health Centers on startup.
