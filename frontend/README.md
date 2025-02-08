# Project Setup and Instructions

This project consists of a frontend and a backend. The backend Please follow the steps below to get both parts up and running.

## Structure
```
project-root/
│── backend/ # Django Backend
│ ├── backend/ # Django Core App
│ ├── migrations/ # Database Migrations
│ ├── myenv/ # Virtual Environment
│ ├── db.sqlite3 # Database (Local)
│ ├── manage.py # Django Management Script
│ ├── requirements.txt # Backend Dependencies
│
│── frontend/ # React Frontend
│ ├── src/ # Source Files
│ │ ├── api/ # API Calls
│ │ ├── components/ # UI Components
│ │ ├── pages/ # Page Views (Chatbot, Home, Signin, Weather)
│ ├── public/ # Public Assets
│ ├── node_modules/ # Node Dependencies
│ ├── package.json # Frontend Dependencies
│ ├── vite.config.js # Vite Configuration
│
│── .gitignore # Ignored Files
│── README.md # Project Documentation
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
