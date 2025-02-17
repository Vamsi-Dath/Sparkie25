# Project Setup and Instructions

This project consists of a frontend and a backend. Please follow the steps below to get both parts up and running.

## Structure

```
project-root/
│── .venv/                       # Virtual environment (backend dependencies)
│
├── backend/                      # Django Backend
│   ├── backend/                  # Django Core App
│   │   ├── __pycache__/          # Compiled Python files
│   │   ├── migrations/           # Database migrations
│   │   ├── __init__.py           # Python package identifier
│   │   ├── asgi.py               # ASGI application entry point
│   │   ├── consumers.py          # WebSocket consumers
│   │   ├── models.py             # Database models
│   │   ├── routing.py            # WebSocket routing
│   │   ├── settings.py           # Django settings
│   │   ├── urls.py               # API endpoints
│   │   ├── views.py              # Django views
│   │   ├── wsgi.py               # WSGI entry point
│   │   ├── .env                  # Environment variables (e.g., API keys)
│   │   ├── .gitignore            # Files ignored by Git
│   │
│   ├── myenv/                    # Local Python virtual environment
│   ├── db.sqlite3                # SQLite database file
│   ├── manage.py                 # Django management script
│   ├── requirements.txt          # Python dependencies
│
├── frontend/                     # React (Vite) Frontend
│   ├── dist/                     # Production build files
│   ├── node_modules/             # Node.js dependencies
│   ├── public/                   # Static assets
│   │   ├── vite.svg              # Vite logo
│   │
│   ├── src/                      # Source Code
│   │   ├── api/                  # API service handlers
│   │   │   ├── apiService.ts     # API calls
│   │   │   ├── apiTypes.ts       # TypeScript API types
│   │   │
│   │   ├── assets/               # Static assets
│   │   │   ├── react.svg         # React logo
│   │   │
│   │   ├── components/           # UI Components
│   │   │   ├── header/           # Header component
│   │   │   │   ├── Header.jsx    # Header UI
│   │   │   ├── sessionProvider/  # Session management
│   │   │       ├── SessionProvider.tsx  # Session context provider
│   │   │
│   │   ├── pages/                # Application Pages
│   │   │   ├── chatbot/          # AI Chatbot page
│   │   │   │   ├── Chatbot.jsx   # Chatbot UI
│   │   │   ├── home/             # Home page
│   │   │   │   ├── Home.jsx      # Home UI
│   │   │   ├── signin/           # Sign-in page
│   │   │   │   ├── Signin.jsx    # Sign-in UI
│   │   │   ├── weather/          # Weather page
│   │   │   │   ├── Weather.jsx   # Weather UI
│   │   │   ├── webrtc/           # WebRTC-related UI
│   │   │       ├── WebRTC.jsx    # WebRTC UI
│   │   │
│   │   ├── main.jsx              # Main React app entry
│   │
│   ├── templates/                # Frontend templates
│   ├── .gitignore                # Git ignored files
│   ├── Chatbot.jsx               
│   ├── index.css                 # Index styles
│   ├── index.html                 # Main HTML template
│   ├── package.json               # Node.js dependencies
│   ├── package-lock.json          # Locked package dependencies
│   ├── vite.config.js             # Vite configuration
│
├── README.md                  # Project documentation
└── .gitignore                     # Global ignored files
```



## Requirements

Before you begin, ensure you have the following installed:

- **Node.js** (for the frontend)
- **npm** (for the frontend)
- **Python 3** (for the backend)
- **Django** (for the backend)
- **GROQ API Key** (for the frontend)

## 1. Frontend Setup

Install frontend dependencies:

```bash
cd frontend
npm install
```

### Step 2:

Build the frontend:

```bash
npm run build
```

## 2. Backend Setup

### Step 1: Clone the Repository

```bash
git clone <repository_url>
cd <repository_directory>
```

### Step 2: Install Backend Dependencies

pip install -r backend/requirements.txt

### Step 3: Set up Django Database

cd backend
python manage.py migrate

### Step 4: Set up GROQ API Key

Ensure that you have a valid GROQ API key. You should set it in your environment variables or in a .env file:

```bash
GROQ_API_KEY=your_api_key_here
```

### Step 5: Run the Backend Server

```bash
python manage.py runserver
```

The backend should now be running at http://127.0.0.1:8000.
